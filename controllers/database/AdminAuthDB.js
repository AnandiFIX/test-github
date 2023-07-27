const config = require('./dbConnection');
const con = config.createMysqlConn();
var async = require('async');
// const logger = require('inspire').logger;
const util = require('../util');
var AdminAuthEntity = require('../Entity/AdminAuthEntity');

function preventSqlInjection(data) {
    let arr = {};
    for (key in data) {
        // if (data[key] !== 'string') {
        //     arr[key] = data[key];
        // } else {
        //     arr[key] = con.escape(data[key]);
        // }
        arr[key] = data[key];
    }
    return arr;
}

function getAdminUserAuthorization(data, cb) {
    const val = preventSqlInjection(data);
    data = new AdminAuthEntity(val);
    function getAuth(callback) {
        let sql = 'select moduleId,addFlag,deleteFlag,editFlag,viewFlag from adminAuth where deletedFlag=0 and userId=' + data.refer_user_id + ';';
        con.query(sql, function (err, result) {
            if (err) {
                util.logData(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    function getAdminModules(callback) {
        let sql = 'select id,label from adminModule order by sequence asc;';
        con.query(sql, function (err, result) {
            if (err) {
                util.logData(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    async.parallel([getAuth, getAdminModules], function (err, results) {
        if (err) {
            cb(err, null)
        } else {
            //if(results[0].length>0){

            let modules = [];
            for (let i = 0; i < results[1].length; i++) {
                let matched = false;
                for (let j = 0; j < results[0].length; j++) {
                    if (results[0][j].moduleId === results[1][i].id) {
                        modules.push({
                            checked: true,
                            name: results[1][i].label,
                            id: results[1][i].id,
                            addChecked: stringToBool(results[0][j].addFlag),
                            deleteChecked: stringToBool(results[0][j].deleteFlag),
                            editChecked: stringToBool(results[0][j].editFlag),
                            viewChecked: stringToBool(results[0][j].viewFlag)
                        })
                        matched = true;
                        break;
                    }
                }
                if (!matched) {
                    modules.push({
                        checked: false,
                        name: results[1][i].label,
                        id: results[1][i].id,
                        addChecked: false,
                        deleteChecked: false,
                        editChecked: false,
                        viewChecked: false
                    })

                }
            }
            cb(null, true, modules);
        }
    })
}


function getAdminUserAuth(data, cb) {
    var page_size = data.page_size;
    var paginationType = data.paginationType;
    // var data = preventSqlInjection(data);
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
                    for (var i = 0; i < results.dataObj.length; i++) {
                        results.dataObj[i].addFlag = stringToBool(results.dataObj[i].addFlag);
                        results.dataObj[i].editFlag = stringToBool(results.dataObj[i].editFlag);
                        results.dataObj[i].deleteFlag = stringToBool(results.dataObj[i].deleteFlag);
                        results.dataObj[i].viewFlag = stringToBool(results.dataObj[i].viewFlag);
                    }
                    results['nextOffset'] = nextOffset;
                    results['previousOffset'] = previousOffset;
                }
                cb(null, true, results);
            }
        });

    function dataObj(cb) {
        if (paginationType == 'next' || paginationType == '') {
            str = "SELECT adminAuth.id,adminModule.label as module,USER.NAME as name,addFlag,editFlag,adminAuth.deleteFlag," +
                " viewFlag from USER,adminAuth,adminModule where adminAuth.id > " + offset + " and adminModule.id=adminAuth.moduleId and" +
                " USER.id=adminAuth.userId and adminAuth.deletedFlag=0 ORDER BY adminAuth.id ASC LIMIT " + page_size;
        } else if (paginationType == 'prev') {
            str = "SELECT * from (SELECT adminAuth.id,adminModule.label as module,USER.NAME as name,addFlag,editFlag,adminAuth.deleteFlag," +
                " viewFlag from USER,adminAuth,adminModule where adminAuth.id < " + offset + " and adminModule.id=adminAuth.moduleId and" +
                " USER.id=adminAuth.userId and adminAuth.deletedFlag=0 ORDER BY adminAuth.id DESC LIMIT " + page_size + ") a ORDER BY a.id  ASC";
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
        var str1 = "SELECT count(adminAuth.id) count from USER,adminAuth,adminModule where adminModule.id=adminAuth.moduleId and" +
            " USER.id=adminAuth.userId and adminAuth.deletedFlag=0;";
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

function setAdminUserAuth(data, cb) {
    let count = 0;
    for (let i = 0; i < data.length; i++) {
        const val = preventSqlInjection(data[i]);
        data[i] = new AdminAuthEntity(val);
        let dltStr = 'delete from adminAuth where userId=' + data[i].refer_user_id + ';';
        let str = "insert into adminAuth (userId,moduleId,addFlag,editFlag,deleteFlag,viewFlag,createdById) " +
            " values (" + data[i].refer_user_id + ", " + data[i].id + ",'" + data[i].addChecked + "','" + data[i].editChecked + "','" + data[i].deleteChecked + "','" + data[i].viewChecked + "'," + data[i].createdBy + ");";
        // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', str);
        con.query(dltStr, function (err, result1) {
            if (err) {
                util.logData(err);
                cb(err, null);
            } else {
                con.query(str, function (err, result) {
                    if (err) {
                        util.logData(err);
                        cb(err, null);
                    } else {
                        count++;
                        if (count === data.length) {
                            cb(null, true, "OK");
                        }
                    }
                });
            }
        })
    }
}


function deleteAdminUserAuth(data, cb) {
    const val = preventSqlInjection(data);
    data = new AdminAuthEntity(val);
    let sql = "Update adminAuth set deletedFlag = 1,delete_by_id = " + data.user_id + ",deletedDate=NOW() where id = " + data.id + ";";

    con.query(sql, function (err, result) {
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

function stringToBool(value) {
    if (value === 'true' || value === 'True' || value === 'TRUE')
        return true;
    else
        return false;
}

module.exports.getAdminUserAuthorization = getAdminUserAuthorization;
module.exports.getAdminUserAuth = getAdminUserAuth;
module.exports.setAdminUserAuth = setAdminUserAuth;
module.exports.deleteAdminUserAuth = deleteAdminUserAuth;
