const config = require('./dbConnection');
const con = config.createMysqlConn();
// const logger = require('inspire').logger;
const util=require('../util');
var async = require('async');
var TicketPropertyEntity=require('../Entity/TicketPropertyEntity');

function preventSqlInjection(data) {
    let arr={};
    for(key in data){
        // if (data[key] !== 'string') {
        //     arr[key] = data[key];
        // } else {
        //     arr[key] = con.escape(data[key]);
        // }
        arr[key] = data[key];
    }
    return arr;
}

function insertTicketProperty(data, cb) {
    const val = preventSqlInjection(data);
    data = new TicketPropertyEntity(val);
    let sql = 'select id from Attribute where attrDesc="' + data.name + '";';
    con.query(sql, function (err, result) {
        if (err) {
            util.logData(err);
            cb(err, null);
        } else {
            if (result.length > 0) {
                cb(null, false, 'Already Exist')
            } else {
                let sql1 = 'insert into Attribute (attrDesc,createbyid) values("' + data.name + '",' + data.createdBy + ');';
                con.query(sql1, function (err1, result1) {
                    if (err1) {
                        util.logData(err1);
                        cb(err1, null);
                    } else {
                        if (result1.affectedRows > 0) {
                            cb(null, true, result1.affectedRows);
                        } else {
                            cb(null, false, result1.affectedRows);
                        }

                    }
                });
            }
        }
    });
}

function getTicketProperty(data, cb) {
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
            str = "select id,attrDesc as name from Attribute where id > " + offset + " ORDER BY id ASC LIMIT " + page_size;
        } else if (paginationType == 'prev') {
            str = "SELECT * from (select id,attrDesc as name from Attribute where id < " + offset + " ORDER BY id DESC LIMIT " + page_size + ") a ORDER BY a.id  ASC";
        }


        con.query(str, function (err, done) {
            if (err) {
                util.logData(err);
                cb(err, null);
            } else {
                cb(null, done);

            }
        });
    }

    function totalData(cb) {
        var str1 = "select count(id) count from Attribute";
        con.query(str1, function (err, done) {
            if (err) {
                util.logData(err);
                cb(err, null);
            } else {
                util.logData('result1=' + done);
                cb(null, done);
            }
        });
    }
}

module.exports.insertTicketProperty = insertTicketProperty;
module.exports.getTicketProperty = getTicketProperty;
