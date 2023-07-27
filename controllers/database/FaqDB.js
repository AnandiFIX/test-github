const dbConn = require('./dbConnection');
const con = dbConn.createMysqlConn();
const util = require('../util');
var FaqEntity=require('../Entity/FaqEntity');
const superagent = require('superagent');
var async = require('async');
var config = require('./config');
const DOCU_URL = global.gConfig.DOCU_URL


function preventSqlInjection(data) {
    let arr={};
    for(key in data){
        arr[key]=data[key];
    }
    return arr;
}

function getFaqCategory(data, cb) {
    const val = preventSqlInjection(data);
    data = new FaqEntity(val);
    var sql = 'SELECT id, mastercategory FROM `tbl_faq_master` where deleteflag = 0 and clientid = ? order by mastercategory';
    con.query(sql, [data.clientId], function (err, result) {
        if (err) {
            util.logData(err);
            cb(err, null);
        } else {
            cb(null, true, result);
        }
    });
}

function getFaqDetails(data, cb) {
    const val = preventSqlInjection(data);
    data = new FaqEntity(val);
    var sql = 'SELECT id,questions,answers FROM `tbl_faq_dtls` WHERE clientid = ? and masterid = ? and deleteflag = ? order by questions';
    con.query(sql, [data.clientId, data.masterCategoryId, 0], function (err, result) {
        if (err) {
            util.logData(err);
            cb(err, null);
        } else {
            cb(null, true, result);
        }
    });
}

function getFaqSearchData(data, cb) {
   util.logData("\n\ngetFaqSearchData--------------->"+JSON.stringify(data))
    const val = preventSqlInjection(data);
    data = new FaqEntity(val);
    superagent.get(DOCU_URL+'/faqSearchKeyword')
        .query({ clientId: data.clientId, searchKeyword: data.searchKeyword })
        .end((err, res) => {
            if (err) {
                cb(err, null);
            } else {
		util.logData(JSON.stringify(res))
                cb(null, true, res.body.searchDetails);
            }
        });
}

function getAllFaqCategory(data, cb) {
    var page_size = data.page_size;
    var paginationType = data.paginationType;
    var data = preventSqlInjection(data);
    var offset = data.nextOffset;
    var funcArr = {};
    var str = "";

    if (offset == "0") {
        funcArr = {dataObj, totalData};
    } else {
        funcArr = {dataObj};
    }
    async.parallel(funcArr,
        function (err, results) {
            if (err) {
                cb(null, true, results);
            } else {
                if (offset == "0") {
                    var totalCount = results.totalData[0].count;
                    var divRes = totalCount / page_size;
                    var remainder = totalCount % page_size;
                    var totalPage = 0;
                    if (remainder == 0) {
                        totalPage = parseInt(divRes);
                    } else {
                        totalPage = parseInt(divRes) + 1;
                    }
                    results['totalPage'] = totalPage;
                }
                if (results.dataObj.length > 0) {
                    var nextOffset = results.dataObj[results.dataObj.length - 1].id;
                    var previousOffset = results.dataObj[0].id;
                    results['nextOffset'] = nextOffset;
                    results['previousOffset'] = previousOffset;
                }
                cb(null, true, results);
            }
        });

    function dataObj(cb) {
        if (paginationType == 'next' || paginationType == '') {
            str = "SELECT id, mastercategory as categoryName, mst_cat_seq_no as sequenceNo FROM `tbl_faq_master` a " +
                " where a.id > ? and  a.deleteflag = 0 and a.clientid = ? ORDER BY a.id ASC LIMIT ?";
        } else if (paginationType == 'prev') {
            str = "SELECT * from (SELECT id, mastercategory as categoryName, mst_cat_seq_no as sequenceNo FROM `tbl_faq_master` a " +
                " where a.id < ? and  a.deleteflag = 0 and a.clientid = ? ORDER BY a.id DESC LIMIT ?) Z ORDER BY Z.id  ASC";
        }

        con.query(str, [offset,data.clientId,Number(page_size)], function (err, done) {
            if (err) {
                util.logData(err);
                cb(err, null);
            } else {
                cb(null, done);

            }
        });
    }

    function totalData(cb) {
        var str1 = "SELECT count(a.id) count FROM `tbl_faq_master` a where a.deleteflag = 0 and a.clientid = ?";
        con.query(str1, [data.clientId],function (err, done) {
            if (err) {
                // util.logData(err);
                cb(err, null);
            } else {
                cb(null, done);
            }
        });
    }
}

function insertFaqCategory(data, cb) {
    const val = preventSqlInjection(data);
    data = new FaqEntity(val);
    let sql = "SELECT mastercategory FROM tbl_faq_master where (mastercategory=? and deleteflag=? and clientid = ?) " +
        " and mst_cat_seq_no = ?";
    con.query(sql, [data.categoryName, 0, data.clientId, data.sequenceNo], function (err, result) {
        if (err) {
            cb(err, null);
        } else {
            if (result.length > 0) {
                cb(null, false, "Duplicate data");
            } else {
                let sql = "INSERT INTO tbl_faq_master " +
                    " (clientid, mastercategory, mst_cat_seq_no, deleteflag, createbyid) VALUES (?,?,?,?,?) ";
                let param = [data.clientId, data.categoryName, data.sequenceNo, 0, data.createdBy];
                con.query(sql, param, function (err, result) {
                    if (err) {
                        cb(err, null);
                    } else {
                        if (result.insertId > 0) {
                            cb(null, true, result.insertId);
                        } else {
                            cb(null, false, "No data found....");
                        }
                    }
                });
            }
        }
    });
}


function deleteFaqCategory(data, cb) {
    const val = preventSqlInjection(data);
    data = new FaqEntity(val);
    var sql = "Update tbl_faq_master set deleteflag = 1,deletebyid = ?,deletedate=NOW() where id = ?";
    con.query(sql, [data.user_id, data.id], function (err, result) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, true, result);
        }
    });
}

function updateFaqCategory(data, cb) {
    const val = preventSqlInjection(data);
    data = new FaqEntity(val);
    var sql = 'Update tbl_faq_master set mastercategory = ?, mst_cat_seq_no = ?,modifybyid = ?, modifydate=NOW()  where id = ?';
    con.query(sql, [data.categoryName, data.sequenceNo, data.user_id, data.id], function (err, result) {
        if (err) {
            util.logData(err);
            cb(err, null);
        } else {
            if (result.affectedRows > 0) {
                cb(null, true, result.affectedRows);
            } else {
                cb(null, false, result.affectedRows);
            }

        }
    });
}

function getAllFaq(data, cb) {
    var page_size = data.page_size;
    var paginationType = data.paginationType;
    var data = preventSqlInjection(data);
    var offset = data.nextOffset;
    var funcArr = {};
    var str = "";

    if (offset == "0") {
        funcArr = {dataObj, totalData};
    } else {
        funcArr = {dataObj};
    }
    async.parallel(funcArr,
        function (err, results) {
            if (err) {
                cb(null, true, results);
            } else {
                if (offset == "0") {
                    var totalCount = results.totalData[0].count;
                    var divRes = totalCount / page_size;
                    var remainder = totalCount % page_size;
                    var totalPage = 0;
                    if (remainder == 0) {
                        totalPage = parseInt(divRes);
                    } else {
                        totalPage = parseInt(divRes) + 1;
                    }
                    results['totalPage'] = totalPage;
                }
                if (results.dataObj.length > 0) {
                    var nextOffset = results.dataObj[results.dataObj.length - 1].id;
                    var previousOffset = results.dataObj[0].id;
                    results['nextOffset'] = nextOffset;
                    results['previousOffset'] = previousOffset;
                }
                cb(null, true, results);
            }
        });

    function dataObj(cb) {
        if (paginationType == 'next' || paginationType == '') {
            str = "SELECT a.id, a.masterid, (select mastercategory from tbl_faq_master where id = a.masterid) categoryName, a.questions,a.answers FROM `tbl_faq_dtls` a " +
                " where a.id > ? and  a.deleteflag = 0 and a.clientid = ? ORDER BY a.id ASC LIMIT ?";
        } else if (paginationType == 'prev') {
            str = "SELECT * from (SELECT a.id, a.masterid, (select mastercategory from tbl_faq_master where id = a.masterid) categoryName, a.questions,a.answers FROM `tbl_faq_dtls` a " +
                " where a.id < ? and  a.deleteflag = 0 and a.clientid = ? ORDER BY a.id DESC LIMIT ?) Z ORDER BY Z.id  ASC";
        }

        con.query(str, [offset,data.clientId,Number(page_size)], function (err, done) {
            if (err) {
                util.logData(err);
                cb(err, null);
            } else {
                cb(null, done);

            }
        });
    }

    function totalData(cb) {
        var str1 = "SELECT count(a.id) count FROM `tbl_faq_dtls` a where a.deleteflag = 0 and a.clientid = ?";
        con.query(str1, [data.clientId],function (err, done) {
            if (err) {
                // util.logData(err);
                cb(err, null);
            } else {
                cb(null, done);
            }
        });
    }
}

function insertFaq(data, cb) {
    const val = preventSqlInjection(data);
    data = new FaqEntity(val);
    for (let i = 0 ; i <= data.faqDetails.length - 1 ;i++){
        let sql = "SELECT id FROM tbl_faq_dtls where masterid=? and questions=? and deleteflag=? and clientid = ?";
        con.query(sql, [data.categoryId, data.faqDetails[i].question, 0, data.clientId], function (err, result) {
            if (err) {
                cb(err, null);
            } else {
                if (result.length > 0) {
                    cb(null, false, "Duplicate data");
                } else {
                    let sql = "INSERT INTO tbl_faq_dtls " +
                        " (clientid, masterid, questions, answers, deleteflag, createbyid) VALUES (?,?,?,?,?,?) ";
                    let param = [data.clientId, data.categoryId, data.faqDetails[i].question, data.faqDetails[i].answer, 0, data.createdBy];
                    con.query(sql, param, function (err, result) {
                        if (err) {
                            cb(err, null);
                        } else {
                            if (result.insertId > 0) {
                                if (i ===  data.faqDetails.length - 1) {
                                    cb(null,true,'Data Inserted Successfully');
                                }
                            } else {
                                cb(null, false, "No data found....");
                            }
                        }
                    });
                }
            }
        });
    }
}



function deleteFaq(data, cb) {
    const val = preventSqlInjection(data);
    data = new FaqEntity(val);
    var sql = "Update tbl_faq_dtls set deleteflag = 1,deletebyid = ?,deletedate=NOW() where id = ?";
    con.query(sql, [data.user_id, data.id], function (err, result) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, true, result);
        }
    });
}

function updateFaq(data, cb) {
    const val = preventSqlInjection(data);
    data = new FaqEntity(val);
    var sql = 'Update tbl_faq_dtls set questions = ?, answers = ?, masterid = ?, modifybyid = ?, modifydate=NOW()  where id = ?';
    con.query(sql, [data.questions, data.answers, data.categoryId, data.user_id, data.id], function (err, result) {
        if (err) {
            util.logData(err);
            cb(err, null);
        } else {
            if (result.affectedRows > 0) {
                cb(null, true, result.affectedRows);
            } else {
                cb(null, false, result.affectedRows);
            }

        }
    });
}

function insertFaqDocumentLog(data, cb) {
    let sql = 'INSERT INTO `faq_document_dtls` ' +
        '( `client_id`, `original_document_nm`, `document_nm`, `document_path`, `createbyid`) ' +
        'VALUES (?,?,?,?,?);';
    const insertData = [data.clientId, data.originalDocumentName, data.documentName, data.documentPath, data.createdBy];
    con.query(sql, insertData, function (err, result) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, true, result.insertId);
        }
    })
}

function deleteFaqDocumentLog(data, cb) {
    var sql = "Update faq_document_dtls set delete_flag = 1,delete_by_id = ?,DeleteDate=NOW() where id = ?";
    con.query(sql, [data.user_id, data.id], function (err, result) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, true, result);
        }
    });
}

function getFaqDocumentLog(data, cb) {
    var page_size = data.page_size;
    var paginationType = data.paginationType;
    var data = preventSqlInjection(data);
    var offset = data.nextOffset;
    var funcArr = {};
    var str = "";

    if (offset == "0") {
        funcArr = {dataObj, totalData};
    } else {
        funcArr = {dataObj};
    }
    async.parallel(funcArr,
        function (err, results) {
            if (err) {
                cb(null, true, results);
            } else {
                if (offset == "0") {
                    var totalCount = results.totalData[0].count;
                    var divRes = totalCount / page_size;
                    var remainder = totalCount % page_size;
                    var totalPage = 0;
                    if (remainder == 0) {
                        totalPage = parseInt(divRes);
                    } else {
                        totalPage = parseInt(divRes) + 1;
                    }
                    results['totalPage'] = totalPage;
                }
                if (results.dataObj.length > 0) {
                    var nextOffset = results.dataObj[results.dataObj.length - 1].id;
                    var previousOffset = results.dataObj[0].id;
                    results['nextOffset'] = nextOffset;
                    results['previousOffset'] = previousOffset;
                }
                cb(null, true, results);
            }
        });

    function dataObj(cb) {
        if (paginationType == 'next' || paginationType == '') {
            str = "select a.id, a.document_nm, a.original_document_nm, a.document_path FROM `faq_document_dtls` a " +
                " where a.id > ? and  a.delete_flag = 0 and a.client_id = ? ORDER BY a.id ASC LIMIT ?";
        } else if (paginationType == 'prev') {
            str = "SELECT * from (select a.id, a.document_nm, a.original_document_nm, a.document_path FROM `faq_document_dtls` a " +
                " where a.id < ? and  a.delete_flag = 0 and a.client_id = ? ORDER BY a.id DESC LIMIT ?) Z ORDER BY Z.id  ASC";
        }

        con.query(str, [offset,data.clientId,Number(page_size)], function (err, done) {
            if (err) {
                util.logData(err);
                cb(err, null);
            } else {
                cb(null, done);

            }
        });
    }

    function totalData(cb) {
        var str1 = "SELECT count(a.id) count FROM `faq_document_dtls` a where a.delete_flag = 0 and a.client_id = ?";
        con.query(str1, [data.clientId],function (err, done) {
            if (err) {
                // util.logData(err);
                cb(err, null);
            } else {
                cb(null, done);
            }
        });
    }
}


module.exports.insertFaqDocumentLog = insertFaqDocumentLog;
module.exports.deleteFaqDocumentLog = deleteFaqDocumentLog;
module.exports.getFaqDocumentLog = getFaqDocumentLog;
module.exports.updateFaq = updateFaq;
module.exports.deleteFaq = deleteFaq;
module.exports.insertFaq = insertFaq;
module.exports.getAllFaq = getAllFaq;
module.exports.updateFaqCategory = updateFaqCategory;
module.exports.deleteFaqCategory = deleteFaqCategory;
module.exports.insertFaqCategory = insertFaqCategory;
module.exports.getAllFaqCategory = getAllFaqCategory;
module.exports.getFaqDetails = getFaqDetails;
module.exports.getFaqCategory = getFaqCategory;
module.exports.getFaqSearchData = getFaqSearchData;
