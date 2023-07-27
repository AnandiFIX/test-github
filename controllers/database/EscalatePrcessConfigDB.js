const config = require('./dbConnection');
const con = config.createMysqlConn();
// const logger = require('inspire').logger;
const util=require('../util');
const async = require('async');
var EscalatePrcessConfigEntity=require('../Entity/EscalatePrcessConfigEntity');

function preventSqlInjection(data) {
    let arr={};
    for(key in data){
        arr[key]=data[key];
    }
    return arr;
}

function insertEscalatePrcessConfig(data,cb){
    function deleteData(callback) {
        if (data.category_id.length > 1) {
            let sql = 'delete from ticket_status_wise_groupOrUser_selection where clientId=? and ticketTypeId=? and status_sequence=?';
            con.query(sql,[data.clientId, data.ticketTypeId, data.status_sequence], function (err, result) {
                if (err) {
                    logData(err);
                    callback(err, null);
                } else {
                    callback(null, true);
                }
            });
        } else {
            callback(null, true);
        }
    }

    function insertData(cb){
        let count = 0;
        for (let i = 0; i < data.category_id.length; i++){
            let sql = "SELECT id FROM ticket_status_wise_groupOrUser_selection where CLIENTID = ? and ticketTypeId = ?" +
                " and categoryId = ? and status_sequence= ? and DeleteFlag = 0";
            con.query(sql, [data.clientId, data.ticketTypeId, data.category_id[i], data.status_sequence], function (err, result) {
                if (err) {
                    util.logData(err);
                    cb(err, null);
                } else {
                    if (result.length > 0) {
                        cb(null, false, "Duplicate data");
                    } else {
                        let sql1='INSERT INTO `ticket_status_wise_groupOrUser_selection` (`CLIENTID`, `ticketTypeId`, `categoryId`, `resolverGroup`, `resolverUser`,' +
                            ' `createbyid`, `status_sequence`) ' +
                            'VALUES (?,?,?,?,?,?,?);';
                        con.query(sql1,[data.clientId,data.ticketTypeId,data.category_id[i],data.resolverGroup,data.resolverUser,data.user_id,data.status_sequence], function (err, result) {
                            if (err) {
                                util.logData(err);
                                cb(err, null);
                            } else {
                                count++;
                                if (data.category_id.length === count) {
                                    cb(null, true, 'Record insert successfully');
                                }
                            }
                        });
                    }
                }
            });
        }
    }
    async.series([deleteData, insertData], function (err, results) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, true)
        }
    })
}


function deleteEscalatePrcessConfig(data,cb){
    const val = preventSqlInjection(data);
    data = new EscalatePrcessConfigEntity(val);
    let sql="UPDATE ticket_status_wise_groupOrUser_selection SET `DeleteFlag`=1,delete_by_id = ?,DeleteDate=NOW() WHERE `id`=?";
    con.query(sql,[data.user_id, data.id], function (err, result) {
        if (err) {
            util.logData(err);
            cb(err, null);
        } else {
            cb(null, true, result);
        }
    });
}

function getEscalatePrcessConfig(data, cb) {
    data = new EscalatePrcessConfigEntity(data);
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
            str = "select a.id, (select ATTRVAL from TICKETATTRIBUTES where id=a.ticketTypeId) ticketType," +
                " (select ATTRVAL from TICKETATTRIBUTES where id = a.categoryId) category," +
                " (SELECT ATTRVAL FROM `TICKETATTRIBUTES` where sequence_no=a.status_sequence and CLIENTID=? and ATTRID = 2) status," +
                " resolverGroup, resolverUser from ticket_status_wise_groupOrUser_selection a where a.id > ? and a.CLIENTID = ?" +
                " and a.DeleteFlag = 0 ORDER BY a.id ASC LIMIT ?";
        } else if (paginationType == 'prev') {
            str = "select * from (select a.id, (select ATTRVAL from TICKETATTRIBUTES where id=a.ticketTypeId) ticketType," +
                " (select ATTRVAL from TICKETATTRIBUTES where id = a.categoryId) category," +
                " (SELECT ATTRVAL FROM `TICKETATTRIBUTES` where sequence_no=a.status_sequence and CLIENTID=? and ATTRID = 2) status," +
                " resolverGroup, resolverUser from ticket_status_wise_groupOrUser_selection a where a.id < ? and a.CLIENTID = ?" +
                " and a.DeleteFlag = 0 ORDER BY a.id DESC LIMIT ?) Z ORDER BY Z.id  ASC";
        }
        console.log('str==================' + str);
        con.query(str, [data.client_id, offset, data.client_id, Number(page_size)], function (err, done) {
            if (err) {
                util.logData(err);
                cb(err, null);
            } else {
                cb(null, done);

            }
        });
    }

    function totalData(cb) {
        var str1 = "select count(a.id) count from ticket_status_wise_groupOrUser_selection a where a.CLIENTID = ? and a.DeleteFlag = 0";
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

module.exports.insertEscalatePrcessConfig = insertEscalatePrcessConfig;
module.exports.deleteEscalatePrcessConfig = deleteEscalatePrcessConfig;
module.exports.getEscalatePrcessConfig = getEscalatePrcessConfig;


