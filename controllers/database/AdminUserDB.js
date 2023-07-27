const config = require('./dbConnection');
const con = config.createMysqlConn();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const util=require('../util');
var AdminUserEntity=require('../Entity/AdminUserEntity');
var async = require('async');

function preventSqlInjection(data) {
    let arr={};
    for(key in data) {
        // if (data[key] !== 'string') {
        //     arr[key] = data[key];
        // } else {
        //     arr[key] = con.escape(data[key]);
        // }
        arr[key] = data[key];
    }
    return arr;
}

function getUserClientWise(data, cb) {
    const val = preventSqlInjection(data);
    data = new AdminUserEntity(val);
    var str = 'select a.id,a.name,a.address,a.USERMAIL as email ,a.PASSWORD as password,a.USERMOBILENO as mobile from USER a where  a.CLIENTID = ' + data.clientId + ' AND DeleteFlag=0';
    con.query(str, function (err, details) {
        if (err) {
            util.logData(err);
            cb(err, null);
        } else {
            if (details.length === 0) {
                cb(null, {"value": "error"});
            } else
                cb(null, true, details);
        }
    })
}

function insertUserDB(data, cb) {
    const val = preventSqlInjection(data);
    data = new AdminUserEntity(val);
    var sql1 = "select *  from USER where DeleteFlag = 0 and ( USERMAIL = " + data.email + " or USERMOBILENO = " + data.mobile + " )";
    con.query(sql1, function (err1, result1) {
        if (err1) {
            util.logData(err1);
            cb(err1, null);
        } else {
            if (result1.length === 0) {
                bcrypt.hash(data.password, saltRounds, function (err, hash) {
                    if (err) {
                        util.logData(err);
                    } else {
                        // console.log('hash:', hash);
                        var sql = "INSERT INTO USER (NAME,CLIENTID,USERMAIL,USERMOBILENO,PASSWORD,createbyid,address) VALUES (" +
                             data.name + "," + data.clientId + "," + data.email + "," + data.mobile + ",'" + hash + "'," + data.user_id + "," + data.address + ")";
                        con.query(sql, function (err, result) {
                            if (err) {
                                util.logData(err);
                                cb(err, null);
                            } else {
                                cb(null, true, result.insertId);
                            }
                        });
                    }
                })
            } else {
                cb(null, false, "Duplicate Email or Mobile number");
            }
        }
    });
}

function editUserMst(data, cb) {
    const val = preventSqlInjection(data);
    data = new AdminUserEntity(val);
    var sql = "Update USER set NAME = ? ,USERMAIL= ? ,USERMOBILENO = ? , address= ? , modifybyid = ? , modifydate= NOW() where id = ?";
    data = [data.name, data.email, data.mobile, data.address, data.createdBy, data.id];
    con.query(sql, data, function (err, result) {
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

function deleteUserFrmAdmin(data, cb) {
    // util.logData('dataaaaaaaaaaaa' + JSON.stringify(data));
    const val = preventSqlInjection(data);
    data = new AdminUserEntity(val);
    if (String(data.id) !== data.user_id) {
        var sql = "Update USER set deleteFlag = 1,delete_by_id = " + data.user_id + ",DeleteDate=NOW() where id = " + data.id + " and CLIENTID = " + data.clientId + ";";
        sql += "Update USERROLE set deleteFlag = 1,delete_by_id = " + data.user_id + ",DeleteDate=NOW() where id = " + data.id + ";";
        sql += "Update CLIENTUSERROLE set deleteFlag = 1,delete_by_id = " + data.user_id + ",DeleteDate=NOW() where ROLEID = " + data.id + " and CLIENTID = " + data.clientId + ";";
        sql += "Update MODULECLIENTUSERROLEMAP set deleteFlag = 1,delete_by_id = " + data.user_id + ",deleteDate=NOW() where roleId = " + data.id + " and clientId = " + data.clientId + ";";
        sql += "Update ROLEUSER set deleteFlag = 1,delete_by_id = " + data.user_id + ",DeleteDate=NOW() where ROLEID = " + data.id + " and CLIENTID = " + data.clientId + ";";
        sql += "Update RoleUserAction set deleteFlag = 1,delete_by_id = " + data.user_id + ",deleteDate=NOW() where roleId = " + data.id + " and clientId = " + data.clientId + ";";
        // util.logData('dataaaaaaaaaaaa' + sql);
        con.query(sql, function (err, result) {
            if (err) {
                util.logData(err);
                cb(err, null);
            } else {
                cb(null, true, result);
            }
        });
    } else {
        cb(null, false, 'Cannot delete your own user');
    }
}

function getUserByClient(data, cb) {
    var page_size = data.page_size;
    var paginationType = data.paginationType;
    var data = util.preventSqlInjection(data);
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
                cb(null, false, err);
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
            str = 'select a.id,a.name,a.address,a.USERMAIL as email ,a.login_name,a.USERMOBILENO as mobile, user_type from ' +
                ' USER a where a.id > ' + offset + ' and a.CLIENTID = ' + data.client_id + ' AND DeleteFlag=0 ORDER BY a.id ASC LIMIT ' + page_size;
        } else if (paginationType == 'prev') {
            str = 'select * from (select a.id,a.name,a.address,a.USERMAIL as email ,a.login_name,a.USERMOBILENO as mobile, user_type from ' +
                ' USER a where a.id < ' + offset + ' and a.CLIENTID = ' + data.client_id + ' AND DeleteFlag=0 ORDER BY a.id DESC LIMIT ' + page_size + ')z ORDER BY z.id  ASC;';
        }
        con.query(str, function (err, done) {
            if (err) {
                util.logData('---Error from allAssetDescription inside AssetDescription.js----');
                util.logData(err);
                cb(err, null);
            } else {
                cb(null, done);

            }
        });
    }

    function totalData(cb) {
        var str1 = 'select count(*) count from ' +
            ' USER a where  a.CLIENTID = ' + data.client_id + ' AND DeleteFlag=0';
        con.query(str1, function (err, done) {
            if (err) {
                util.logData('---Error from getAssetColumnByMaster inside TicketTypeDB.js----');
                util.logData(err);
                cb(err, null);
            } else {
                util.logData('result1=' + done);
                cb(null, done);
            }
        });
    }
}

module.exports.getUserByClient = getUserByClient;


module.exports.getUserClientWise = getUserClientWise;
module.exports.insertUserDB = insertUserDB;
module.exports.editUserMst = editUserMst;
module.exports.deleteUserFrmAdmin = deleteUserFrmAdmin;
