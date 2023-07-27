const config = require('./dbConnection');
const con = config.createMysqlConn();
// const logger = require('inspire').logger;
const util=require('../util');
const async = require('async');
var CsatEntity=require('../Entity/CsatEntity');

function preventSqlInjection(data) {
    let arr={};
    for(key in data){
        arr[key]=data[key];
    }
    return arr;
}

function insertCsatRating(data,cb){
    let sql = "SELECT * FROM `csat-rating` where `clientId` =? and `csatRating`=? and `DeleteFlag` = 0";
    con.query(sql, [data.clientId, data.rating], function (err, result) {
        if (err) {
            util.logData(err);
            cb(err, null);
        } else {
            if (result.length > 0) {
                cb(null, false, "Duplicate data");
            } else {
                let sql1='INSERT INTO `csat-rating` (`clientId`,`csatRating`, `ratingValue`,' +
                    ' `createbyid`) VALUES (?,?,?,?);';
                con.query(sql1,[data.clientId,data.rating,data.ratingValue,data.user_id], function (err, result) {
                    if (err) {
                        util.logData(err);
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


function deleteCsatRating(data,cb){
    const val = preventSqlInjection(data);
    data = new CsatEntity(val);
    let sql="UPDATE `csat-rating` SET `DeleteFlag` = '1', `DeleteDate` = NOW(), delete_by_id = ? WHERE `csat-rating`.`id` = ?;";

    con.query(sql,[data.user_id, data.id], function (err, result) {
        if (err) {
            util.logData(err);
            cb(err, null);
        } else {
            cb(null, true, result);
        }
    });
}

function getCsatRating(data, cb) {
    const val = preventSqlInjection(data);
    data = new CsatEntity(val);
    var page_size = data.page_size;
    var paginationType = data.paginationType;
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
            str = "SELECT a.id, a.csatRating as rating, a.ratingValue FROM `csat-rating` a where a.id > ? and a.clientId = ? " +
                " and a.DeleteFlag = 0 ORDER BY a.id ASC LIMIT ?";
        } else if (paginationType == 'prev') {
            str = "select * from (SELECT a.id, a.csatRating as rating, a.ratingValue FROM `csat-rating` a where a.id < ? and a.clientId = ? " +
                " and a.DeleteFlag = 0 ORDER BY a.id DESC LIMIT ?) Z ORDER BY Z.id  ASC";
        }

        con.query(str, [offset, data.client_id, Number(page_size)], function (err, done) {
            if (err) {
                util.logData(err);
                cb(err, null);
            } else {
                cb(null, done);

            }
        });
    }

    function totalData(cb) {
        var str1 = "SELECT count(id) count FROM `csat-rating` WHERE `clientId` = ? AND `DeleteFlag` = 0";
        con.query(str1, [data.client_id], function (err, done) {
            if (err) {
                util.logData(err);
                cb(err, null);
            } else {
                // util.logData('result1=' + done);
                cb(null, done);
            }
        });
    }
}

function getCsatRatingList(data, cb) {
    const val = preventSqlInjection(data);
    data = new CsatEntity(val);
    var str1 = "SELECT id, csatRating, image, ratingValue FROM `csat-rating` WHERE `clientId` = ? AND `DeleteFlag` = 0";
    con.query(str1, [data.client_id], function (err, done) {
        if (err) {
            util.logData(err);
            cb(err, null);
        } else {
            util.logData('result1=' + JSON.stringify(done));
            cb(null, true, done);
        }
    });
}

function getCsatQuestion(data, cb) {
    const val = preventSqlInjection(data);
    data = new CsatEntity(val);
    var str1 = "SELECT * FROM `csat-question` WHERE `clientId` = ? AND `DeleteFlag` = 0";
    con.query(str1, [data.client_id], function (err, done) {
        if (err) {
            util.logData(err);
            cb(err, null);
        } else {
            // util.logData('result1=' + done);
            cb(null, true, done);
        }
    });
}

function editCsatRating(data,cb){
    const val = preventSqlInjection(data);
    data = new CsatEntity(val);
    let sql = "UPDATE `csat-rating` SET `csatRating` = ?, `ratingValue` = ?, " +
        "`modifiydate` = NOW(), modifiybyid = ? WHERE `csat-rating`.`id` = ?;"
    con.query(sql,[data.rating,data.ratingValue, data.user_id, data.id], function (err, result) {
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

// ======================================================
function getCsatQuestionList(data, cb) {
    const val = preventSqlInjection(data);
    data = new CsatEntity(val);
    var page_size = data.page_size;
    var paginationType = data.paginationType;
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
            str = "SELECT a.id, a.question FROM `csat-question` a where a.id > ? and a.clientId = ? " +
                " and a.DeleteFlag = 0 ORDER BY a.id ASC LIMIT ?";
        } else if (paginationType == 'prev') {
            str = "select * from (SELECT a.id, a.question FROM `csat-question` a where a.id < ? and a.clientId = ? " +
                " and a.DeleteFlag = 0 ORDER BY a.id DESC LIMIT ?) Z ORDER BY Z.id  ASC";
        }

        con.query(str, [offset, data.client_id, Number(page_size)], function (err, done) {
            if (err) {
                util.logData(err);
                cb(err, null);
            } else {
                cb(null, done);

            }
        });
    }

    function totalData(cb) {
        var str1 = "SELECT count(id) count FROM `csat-question` WHERE `clientId` = ? AND `DeleteFlag` = 0";
        con.query(str1, [data.client_id], function (err, done) {
            if (err) {
                util.logData(err);
                cb(err, null);
            } else {
                // util.logData('result1=' + done);
                cb(null, done);
            }
        });
    }
}



function modifyCsatQuestion(data,cb){
    const val = preventSqlInjection(data);
    data = new CsatEntity(val);
    let sql="UPDATE `csat-question` SET `question`=?, `modifiybyid`=?, `modifiydate`=NOW() WHERE `id`=?;";
    con.query(sql,[data.question,data.user_id,data.id], function (err, result) {
        if (err) {
            util.logData(err);
            cb(err, null);
        } else {
            cb(null, true, result);
        }
    });
}


function deleteCsatQuestion(data,cb){
    const val = preventSqlInjection(data);
    data = new CsatEntity(val);
    let sql="UPDATE `csat-question` SET `DeleteFlag`=1,`delete_by_id`= ?,`DeleteDate`=NOW() WHERE `id`=? ";
    con.query(sql,[data.user_id, data.id], function (err, result) {
        if (err) {
            util.logData(err);
            cb(err, null);
        } else {
            cb(null, true, result);
        }
    });
}


function insertCsatQuestion(data,cb){
    const val = preventSqlInjection(data);
    data = new CsatEntity(val);
    let sql = "SELECT * FROM `csat-question` where `clientId` =? and `DeleteFlag` = 0";
    con.query(sql, [data.client_id], function (err, result) {
        if (err) {
            util.logData(err);
            cb(err, null);
        } else {
            util.logData('SSSSSSSSSSSSSSSSs' + JSON.stringify(result));
            if (result.length > 0) {
                cb(null, false, "Cannot add more than one question");
            } else {
                let sql='INSERT INTO `csat-question` (`clientId`, `question`, `createbyid`) VALUES (?,?,?);';
                con.query(sql,[data.client_id,data.question,data.createdBy], function (err, result) {
                    if (err) {
                        util.logData(err);
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

module.exports.insertCsatRating = insertCsatRating;
module.exports.deleteCsatRating = deleteCsatRating;
module.exports.getCsatRating = getCsatRating;
module.exports.editCsatRating = editCsatRating;
module.exports.getCsatQuestionList = getCsatQuestionList;
module.exports.modifyCsatQuestion = modifyCsatQuestion;
module.exports.deleteCsatQuestion = deleteCsatQuestion;
module.exports.insertCsatQuestion = insertCsatQuestion;
// ----------------
module.exports.getCsatRatingList = getCsatRatingList;
module.exports.getCsatQuestion = getCsatQuestion;

