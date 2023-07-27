var config = require('./config');
var dbConn = require('./dbConnection');
var con = dbConn.createMysqlConn();
var async = require('async');
var logger = require('inspire').logger;


const util = require('../util');

function insertAutoTicket(data,cb){
    let sql='insert into autoTicket (client_id,ticket_type,category,created_by_id,ticket_title,ticket_description,activity_value,activity_type_id,activity_type,field_value_dtls,create_ticket_data) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
    // console.log(sql);
    con.query(sql,[data.client_id,data.ticketType,data.category,data.createdBy,data.ticketTitle,data.ticketDescription,data.activityValue,data.activityTypeId,data.activityType,data.fieldValueDtls,data.create_ticket_data],
        function (err, result) {
            if (err) {
                util.logData(err);
                cb(err, null);
            } else {
                cb(null, true, result.insertId);
            }
        });
}


function getAutoTicket(data, cb) {
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
            str = "select a.id, (select ATTRVAL from TICKETATTRIBUTES where id=a.ticket_type) ticketType, " +
                " (select replace(GROUP_CONCAT(ATTRVAL),',',' / ') category from TICKETATTRIBUTES where FIND_IN_SET(id,(a.category))) category," +
                " a.ticket_description, a.ticket_title, a.activity_value, a.activity_type " +
                " from autoTicket a where a.id > ? and a.client_id = ? and a.DeleteFlag = 0 ORDER BY a.id ASC LIMIT ?";
        } else if (paginationType == 'prev') {
            str = "select * from (select a.id, (select ATTRVAL from TICKETATTRIBUTES where id=a.ticket_type) ticketType, " +
                " (select replace(GROUP_CONCAT(ATTRVAL),',',' / ') category from TICKETATTRIBUTES where FIND_IN_SET(id,(a.category))) category, " +
                " a.ticket_description, a.ticket_title, a.activity_value, a.activity_type " +
                " from autoTicket a where a.id < ? and a.client_id = ? and a.DeleteFlag = 0 ORDER BY a.id ASC DESC ?) Z ORDER BY Z.id  ASC";
        }

        con.query(str, [offset, data.clientId, Number(page_size)], function (err, done) {
            if (err) {
                util.logData(err);
                cb(err, null);
            } else {
                cb(null, done);

            }
        });
    }

    function totalData(cb) {
        var str1 = "select count(a.id) count from autoTicket a where a.client_id = ? and a.DeleteFlag = 0";
        con.query(str1, [data.clientId], function (err, done) {
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

function deleteAutoTicket(data,cb){
    let sql="UPDATE `autoTicket` SET `DeleteFlag`=1 , `DeleteDate`=now(), `delete_by_id`=? WHERE `id`=?;";
    con.query(sql,[data.user_id, data.id], function (err, result) {
        if (err) {
            util.logData(err);
            cb(err, null);
        } else {
            cb(null, true, 'delete successfully');
        }
    });
}

function editAutoTicket(data,cb){
    let sql="UPDATE autoTicket SET `ticket_title`=?, `ticket_description`=?, `activity_value`=?, modify_by_Id = ?, modify_date=NOW() WHERE `id`=?";
    con.query(sql,[data.ticket_title, data.ticket_description, data.activity_value, data.user_id, data.id], function (err, result) {
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
function getScheduleTicket(data, cb) {
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
            str = "select a.id, (select ATTRVAL from TICKETATTRIBUTES where id=a.ticket_type) ticketType, " +
                " (select replace(GROUP_CONCAT(ATTRVAL),',',' / ') category from TICKETATTRIBUTES where FIND_IN_SET(id,(a.category))) category," +
                " a.ticket_description, a.ticket_title, a.activity_value, a.activity_type " +
                " from autoTicket a where a.id > ? and a.client_id = ? and a.created_by_id = ? and a.DeleteFlag = 0 ORDER BY a.id ASC LIMIT ?";
        } else if (paginationType == 'prev') {
            str = "select * from (select a.id, (select ATTRVAL from TICKETATTRIBUTES where id=a.ticket_type) ticketType, " +
                " (select replace(GROUP_CONCAT(ATTRVAL),',',' / ') category from TICKETATTRIBUTES where FIND_IN_SET(id,(a.category))) category, " +
                " a.ticket_description, a.ticket_title, a.activity_value, a.activity_type " +
                " from autoTicket a where a.id < ? and a.client_id = ? and a.created_by_id = ? and a.DeleteFlag = 0 ORDER BY a.id DESC LIMIT ?) Z ORDER BY Z.id  ASC";
        }

        con.query(str, [offset, data.clientId, data.user_id, Number(page_size)], function (err, done) {
            if (err) {
                util.logData(err);
                cb(err, null);
            } else {
                cb(null, done);

            }
        });
    }

    function totalData(cb) {
        var str1 = "select count(a.id) count from autoTicket a where a.client_id = ? and a.created_by_id = ? and a.DeleteFlag = 0";
        con.query(str1, [data.clientId, data.user_id], function (err, done) {
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


module.exports.getScheduleTicket = getScheduleTicket;
module.exports.insertAutoTicket = insertAutoTicket;
module.exports.deleteAutoTicket = deleteAutoTicket;
module.exports.getAutoTicket = getAutoTicket;
module.exports.editAutoTicket = editAutoTicket;
