const config = require('./dbConnection');
const con = config.createMysqlConn();
// const logger = require('inspire').logger;
const util = require('../util');
var RoleEntity = require('../Entity/RoleEntity');

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
var async = require('async');

function getSomeRoleClientWise(data, cb) {
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
            str = 'SELECT USERROLE.id,USERROLE.ROLENAME as name,USERROLE.SUPERADMINFLAG as adminRole,USERROLE.ROLEDESC as roleDesc,USERROLE.SUPERADMINFLAG as superAdmin ' +
                ' from USERROLE,CLIENTUSERROLE where USERROLE.id > ' + offset + ' and CLIENTUSERROLE.ROLEID=USERROLE.id and ' +
                ' CLIENTUSERROLE.DeleteFlag=0 and USERROLE.DeleteFlag = 0 and CLIENTUSERROLE.CLIENTID=' + data.client_id + ' ORDER BY USERROLE.id ASC LIMIT ' + page_size;
        } else if (paginationType == 'prev') {
            str = 'select * from (SELECT USERROLE.id,USERROLE.ROLENAME as name,USERROLE.SUPERADMINFLAG as adminRole,USERROLE.ROLEDESC as roleDesc,USERROLE.SUPERADMINFLAG as superAdmin ' +
                ' from USERROLE,CLIENTUSERROLE where USERROLE.id < ' + offset + ' and CLIENTUSERROLE.ROLEID=USERROLE.id and ' +
                ' CLIENTUSERROLE.DeleteFlag=0 and USERROLE.DeleteFlag = 0 and CLIENTUSERROLE.CLIENTID=' + data.client_id +
                ' ORDER BY USERROLE.id DESC LIMIT ' + page_size + ')z ORDER BY z.id  ASC;';
        }
        con.query(str, function (err, done) {
            if (err) {
                util.logData('---Error from allAssetDescription inside AssetDescription.js----');
                util.logData(err);
                cb(err, null);
            } else {
                for (let i = 0; i < done.length; i++) {
                    done[i].adminRole = stringToBool(done[i].adminRole);
                }
                cb(null, done);

            }
        });
    }

    function totalData(cb) {
        var str1 = 'SELECT count(*) count ' +
            ' from USERROLE,CLIENTUSERROLE where CLIENTUSERROLE.ROLEID=USERROLE.id and USERROLE.DeleteFlag=0 and CLIENTUSERROLE.DeleteFlag=0 ' +
            'and CLIENTUSERROLE.CLIENTID=' + data.client_id;
        util.logData('total data=' + str1);
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

function stringToBool(value) {
    if (value === 'true' || value === 'True' || value === 'TRUE') {
        return true;
    } else {
        return false;
    }
}


function insertUserRoleDB(data, cb) {
    // const val = preventSqlInjection(data);
    data = new RoleEntity(data);
    var str = "select * from USERROLE where DeleteFlag = ? and (ROLENAME =? or ROLEDESC = ?) and createbyid =? ";

    con.query(str, [0,data.name,data.desc,data.createdBy],function (err1, result1) {
        //util.logData("------Insert Role-------->"+str);
        if (err1) {
            util.logData(err1);
            cb(err1, null);
        } else {
            if (result1.length === 0) {
                let sql;
                // if(data.type){
                //     sql = "INSERT INTO USERROLE (ROLENAME,ROLEDESC,type,createbyid) VALUES ('" +
                //         data.name + "','" + data.desc + "','" + data.type + "'," + data.createdBy + ")";
                // }else{
                sql = "INSERT INTO USERROLE (ROLENAME,ROLEDESC,SUPERADMINFLAG,createbyid) VALUES ( ?,?,?,?)";
                // }

                con.query(sql, [data.name,data.desc,data.superadmin,data.createdBy],function (err, result) {
                    if (err) {
                        util.logData(err);
                        cb(err, null);
                    } else {
                        var sql = "INSERT INTO CLIENTUSERROLE (ROLEID,CLIENTID,createbyid) VALUES (?,?,?)";
                        con.query(sql, [result.insertId,data.client_id,data.createdBy],function (err, result1) {
                            if (err) {
                                util.logData(err);
                                cb(err, null);
                            } else {
                                cb(null, true, result.insertId);
                            }
                        });
                    }
                });
            } else {
                // cb(null, false, "Duplicate data");
                const roleId = result1[0].id;
                const sql = 'select * from CLIENTUSERROLE where ROLEID=? and CLIENTID=? ;';
                con.query(sql,[roleId,data.client_id], function (err, result2) {
                    if (err) {
                        util.logData(err);
                        cb(err, null);
                    } else {
                        if (result2.length > 0) {
                            cb(null, false, "Duplicate data");
                        } else {
                            var sql = "INSERT INTO CLIENTUSERROLE (ROLEID,CLIENTID,createbyid) VALUES (?,?,?)";
                            con.query(sql, [roleId,data.client_id,data.createdBy],function (err, result1) {
                                if (err) {
                                    util.logData(err);
                                    cb(err, null);
                                } else {
                                    cb(null, true, roleId);
                                }
                            });
                        }
                    }
                })
            }
        }
    });
}


function deleteUserRoleDB(data, cb) {
    const val = preventSqlInjection(data);
    data = new RoleEntity(val);
    // var sql = "Update USERROLE set deleteFlag = 1,delete_by_id = " + data.user_id + ",DeleteDate=NOW() where id = " + data.id + ";";
    // sql += "Update CLIENTUSERROLE set deleteFlag = 1,delete_by_id = " + data.user_id + ",DeleteDate=NOW() where ROLEID = " + data.id + ";";
    // sql += "Update MODULECLIENTUSERROLEMAP set deleteFlag = 1,delete_by_id = " + data.user_id + ",deleteDate=NOW() where roleId = " + data.id + ";";
    // sql += "Update ROLEUSER set deleteFlag = 1,delete_by_id = " + data.user_id + ",DeleteDate=NOW() where ROLEID = " + data.id + ";";
    // sql += "Update RoleUserAction set deleteFlag = 1,delete_by_id = " + data.user_id + ",deleteDate=NOW() where roleId = " + data.id + ";";
    //

    // var sql = "Update USERROLE set deleteFlag = ?,delete_by_id = ?,DeleteDate=NOW() where id = ?;";
    var sql = "Update CLIENTUSERROLE set deleteFlag = ?,delete_by_id = ?,DeleteDate=NOW() where ROLEID = ? and CLIENTID = ?;";
    sql += "Update MODULECLIENTUSERROLEMAP set deleteFlag = ?,delete_by_id =?,deleteDate=NOW() where roleId =? and clientId = ?;";
    sql += "Update ROLEUSER set deleteFlag = ?,delete_by_id = ?,DeleteDate=NOW() where ROLEID =? and CLIENTID = ?;";
    sql += "Update RoleUserAction set deleteFlag = ?,delete_by_id =?,deleteDate=NOW() where roleId = ? and clientId = ?;";
    sql += "UPDATE USERROLE SET DeleteFlag = ? , delete_by_id =? , DeleteDate = NOW() WHERE id= ? ;"

    con.query(sql,[1,data.user_id,data.id, data.client_id,1,data.user_id,data.id,data.client_id,1,data.user_id,data.id,data.client_id,
        1,data.user_id,data.id, data.client_id,1,data.user_id,data.id], function (err, result) {
        if (err) {
            util.logData(err);
            cb(err, null);
        } else {
            cb(null, true, result);
        }
    });
}


function editRoleMst(data, cb) {
    const val = preventSqlInjection(data);
    data = new RoleEntity(val);
    var str = "select * from USERROLE where DeleteFlag = ? and ROLENAME =? and id != ?";
    con.query(str,[0,data.name ,data.id], function (err1, result1) {
        if (err1) {
            util.logData(err1);
            cb(err1, null);
        } else {
            if (result1.length === 0) {
                var sql = "Update USERROLE set ROLENAME = ?, ROLEDESC=? , SUPERADMINFLAG=? , modifybyid =? , modifydate=NOW() where id = ?";

                con.query(sql, [data.name,data.desc,data.superadmin,data.createdBy,data.id],function (err, result) {
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
            } else {
                cb(null, false, "Duplicate data");
            }
        }
    });
}

function getRoleClientWise(data, cb) {
    const val = preventSqlInjection(data);
    data = new RoleEntity(val);
    var str = 'SELECT USERROLE.id,USERROLE.ROLENAME as name,USERROLE.ROLEDESC as roleDesc,USERROLE.SUPERADMINFLAG as superAdmin from USERROLE,CLIENTUSERROLE where CLIENTUSERROLE.ROLEID=USERROLE.id and CLIENTUSERROLE.DeleteFlag=0 and CLIENTUSERROLE.CLIENTID=' + data.client_id;
    console.log(str);
    con.query(str, function (err, details) {
        if (err) {
            util.logData(err);
            cb(err, null);
        } else {

            cb(null, true, details);
        }
    })
}

function getAllRoles(data, cb) {
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
            str = 'select id , ROLENAME as name, ROLEDESC as roleDesc , SUPERADMINFLAG as adminRole from USERROLE ' +
                'where DeleteFlag = 0 and createbyid = ? and id > ' + offset + ' ORDER BY id ASC LIMIT ' + page_size;
        } else{
            str = 'select * from (select id , ROLENAME as name, ROLEDESC as roleDesc , SUPERADMINFLAG as adminRole from USERROLE ' +
                'where DeleteFlag = 0 and createbyid = ? and id < ' + offset + ' ORDER BY id DESC LIMIT  ' + page_size + ')z ORDER BY z.id  ASC;';
        }
        con.query(str,[data.user_id], function (err, done) {
            if (err) {
                util.logData('---Error from allAssetDescription inside AssetDescription.js----');
                util.logData(err);
                cb(err, null);
            } else {
                for (let i = 0; i < done.length; i++) {
                    done[i].adminRole = stringToBool(done[i].adminRole);
                }
                cb(null, done);

            }
        });
    }

    function totalData(cb) {
        var str1 = 'SELECT count(*) count from USERROLE where createbyid = ? and DeleteFlag = 0';
        // util.logData('total data=' + str1);
        con.query(str1,[data.user_id], function (err, done) {
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



module.exports.getSomeRoleClientWise = getSomeRoleClientWise;
module.exports.insertUserRoleDB = insertUserRoleDB;
module.exports.deleteUserRoleDB = deleteUserRoleDB;
module.exports.editRoleMst = editRoleMst;
module.exports.getRoleClientWise = getRoleClientWise;
module.exports.getAllRoles = getAllRoles;
