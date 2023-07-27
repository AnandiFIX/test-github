const config = require('./dbConnection');
const con = config.createMysqlConn();
// const logger = require('inspire').logger;
const util = require('../util');
var ModuleEntity = require('../Entity/ModuleEntity');
var async = require('async');

function preventSqlInjection(data) {
    let arr = {};
    for (key in data) {
        // if(data[key] !== 'string'){
        //     arr[key] = data[key];
        // }else{
        //     arr[key] = con.escape(data[key]);
        // }
        arr[key] = data[key];
    }
    return arr;
}

function insertModuleDB(data, cb) {
    const val = preventSqlInjection(data);
    data = new ModuleEntity(val);
    var str1 = 'select count(id) cnt from MODULE where DeleteFlag = 0 and (MODULENAME =?   or MODDESCRIPTION = ? )';
    con.query(str1, [data.name, data.desc],function (err1, result1) {
        if (err1) {
            util.logData('---AError from insertModuleDB inside module.js----');
            util.logData(err1);
            cb(err1, null);
        } else {
            if (result1[0].cnt === 0) {
                var sql = "INSERT INTO MODULE (MODULENAME,MODDESCRIPTION,createbyid) VALUES " +
                    "(?,?,?)";
                // var sql = "INSERT INTO MODULE (MODULENAME,MODDESCRIPTION,createbyid) VALUES (?,?,?)";
                util.logData(sql)
                con.query(sql,[data.name, data.desc,data.createdBy], function (err, result) {
                    if (err) {
                        util.logData('---Error from insertModuleDB inside module.js----');
                        util.logData(err);
                        cb(err, null);
                    } else {
                        cb(null, true, result.insertId);
                    }
                });
            } else {
                cb(null, false, "Duplicate data");
            }
        }
    });
}


function allModulesDB(cb) {
    var str = "SELECT id,MODULENAME,MODDESCRIPTION FROM  MODULE where DeleteFlag='0'";
    con.query(str, function (err, done, fields) {
        if (err) {
            util.logData('---Error from allModulesDB inside module.js----');
            util.logData(err);
            cb(err, null);
        } else {
            cb(null, true, done);
        }
    })
}

function deletePlatformModule(data, cb) {
    const val = preventSqlInjection(data);
    data = new ModuleEntity(val);
    // var sql = 'Update MODULE set  deleteFlag = 1,delete_by_id = ' + data.user_id + ', DeleteDate = NOW() where id = ' + data.id + ';';
    // sql += 'Update MODULECLIENT set  deleteFlag = 1,delete_by_id = ' + data.user_id + ', DeleteDate = NOW() where MODULEID = ' + data.id + ';';
    // sql += 'Update MODULECLIENTUSERROLEMAP set  deleteFlag = 1,delete_by_id = ' + data.user_id + ', DeleteDate = NOW() where moduleId = ' + data.id + ';';
    // sql += 'Update MODULEURLMAP set  deleteFlag = 1,delete_by_id = ' + data.user_id + ', DeleteDate = NOW() where MODULEID = ' + data.id + ';';

    var sql = 'Update MODULE set  deleteFlag = ?,delete_by_id = ?, DeleteDate = NOW() where id = ?;';
    sql += 'Update MODULECLIENT set  deleteFlag = ?,delete_by_id = ?, DeleteDate = NOW() where MODULEID = ?;';
    sql += 'Update MODULECLIENTUSERROLEMAP set  deleteFlag = ?,delete_by_id =?, DeleteDate = NOW() where moduleId = ?;';
    sql += 'Update MODULEURLMAP set  deleteFlag = ?,delete_by_id = ?, DeleteDate = NOW() where MODULEID = ?;';

    con.query(sql, [1,data.user_id,data.id,1,data.user_id,data.id, 1,data.user_id,data.id,1,data.user_id,data.id ],function (err, result) {
        util.logData('Delete Module'+sql);
        //con.query(sql,[1,data.user_id,data.id,data.user_id,data.id  ], function (err, result) {
        if (err) {
            util.logData('---Error from deletePlatformModule inside module.js----');
            util.logData(JSON.stringify(err));
            cb(err, null);
        } else {
            // util.logData(JSON.stringify(result));
            cb(null, true, result);
        }
    });
}


function editModuleMst(data, cb) {
    const val = preventSqlInjection(data);
    data = new ModuleEntity(val);
    var str1 = 'select count(id) cnt from MODULE where DeleteFlag = ? and MODULENAME =?  and id !=?';
    console.log('str=', str1);
    con.query(str1, [0,data.name, data.id],function (err1, result1) {
        if (err1) {
            util.logData('---Error from insertModuleDB inside module.js----');
            util.logData(err1);
            cb(err1, null);
        } else {
            console.log('count=', result1[0]);
            if (result1[0].cnt === 0) {
                var sql = 'Update MODULE set MODULENAME = ? ,MODDESCRIPTION= ?,modifybyid =?, modifydate=NOW()  where id = ?';
                // util.logData(sql);
                con.query(sql, [data.name,data.desc,data.createdBy,data.id], function (err, result) {
                    if (err) {
                        util.logData('---Error from editModuleMst inside module.js----');
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

function getSomeModules(data, cb) {
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
            str = "SELECT id,MODULENAME,MODDESCRIPTION FROM  MODULE  where MODULE.id > " + offset +
                " AND  MODULE.DeleteFlag='0' ORDER BY MODULE.id ASC LIMIT " + page_size;
        } else if (paginationType == 'prev') {
            str = "select * from (SELECT id,MODULENAME,MODDESCRIPTION FROM  MODULE  where MODULE.id < " + offset +
                " AND  MODULE.DeleteFlag='0' ORDER BY MODULE.id DESC LIMIT " + page_size + ")z ORDER BY z.id  ASC;";
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
        var str1 = "SELECT count(id) count FROM  MODULE where MODULE.DeleteFlag='0'";
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

module.exports.getSomeModules = getSomeModules;
module.exports.editModuleMst = editModuleMst;
module.exports.allModulesDB = allModulesDB;
module.exports.insertModuleDB = insertModuleDB;
module.exports.deletePlatformModule = deletePlatformModule;



