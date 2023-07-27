const config = require('./dbConnection');
const con = config.createMysqlConn();
// const logger = require('inspire').logger;
const util=require('../util');
var async = require('async');
var AssetManagementMasterEntity=require('../Entity/AssetManagementMasterEntity');

function preventSqlInjection(data) {
    let arr={};
    for(key in data){
        arr[key]=data[key];
    }
    return arr;
}

function allAssetManagementMaster(data,cb) {
    const val = preventSqlInjection(data);
    data = new AssetManagementMasterEntity(val);
    var str = "SELECT id,masterName FROM  asset_management_master where DeleteFlag='0' and CLIENTID = "+data.client_id;
    con.query(str, function (err, done, fields) {
        if (err) {
            util.logData('---Error from allAssetManagementMaster inside AssetManagementMaster.js----');
            util.logData(err);
            cb(null, false, err);
        } else {
            cb(null, true, done);
        }
    })
}

function insertAssetManagementMaster(data, cb) {
    //util.logData(data);
    const val = preventSqlInjection(data);
    data = new AssetManagementMasterEntity(val);
    if(data.masterName.startsWith("'") || data.masterName.endsWith("'")){
        cb(null, false, "Asset Type must not begin or end with (').");
    }else{
        data.masterName = con.escape(data.masterName);
        var str1 = 'select count(*) cnt from asset_management_master where DeleteFlag = 0 and (masterName = "' + data.masterName + '" and CLIENTID = '+data.client_id +')';
        con.query(str1, function (err1, result1) {
            if (err1) {
                util.logData('---Error from insertModuleDB inside module.js----');
                util.logData(err1);
                cb(err1, null);
            } else {
                if (result1[0].cnt === 0) {
                    var sql = 'INSERT INTO asset_management_master (masterName,CLIENTID,createbyid) VALUES ("' + data.masterName + '",' + data.client_id + ',' + data.createdBy + ')';
                    util.logData(sql)
                    con.query(sql, function (err, result) {
                        if (err) {
                            util.logData('---Error from insertAssetManagementMaster inside AssetManagementMaster.js----');
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
}


function deleteAssetManagementMaster(data, cb) {
    const val=preventSqlInjection(data);
    data=new AssetManagementMasterEntity(val);
    var sql = 'Update asset_management_master set  DeleteFlag = 1,delete_by_id = ' + data.user_id + ', DeleteDate = NOW() where id = ' + data.id + ';';
    con.query(sql,function (err, result) {
        if (err) {
            util.logData('---Error from deleteAssetManagementMaster inside AssetManagementMaster.js----');
            util.logData(JSON.stringify(err));
            cb(err, null);
        }
        else {
            // util.logData(JSON.stringify(result));
            cb(null, true, result);
        }
    });
}

function editAssetManagementMaster(data, cb) {
    const val=preventSqlInjection(data);
    data=new AssetManagementMasterEntity(val);
    // util.logData(sql);
    var str1 = 'select count(*) cnt from asset_management_master where DeleteFlag = 0 and (masterName ="' + data.masterName + '"and CLIENTID = '+data.client_id +')';
    con.query(str1, function (err1, result1) {
        if (err1) {
            util.logData('---Error from insertModuleDB inside module.js----');
            util.logData(err1);
            cb(err1, null);
        } else {
            if (result1[0].cnt === 0) {
                var sql = 'Update asset_management_master set masterName = "' + data.masterName + '",modifiybyid ='+ data.createdBy + ', modifiydate=NOW()  where id =' + data.id;
                con.query(sql, function (err, result) {
                    if (err) {
                        util.logData('---Error from editAssetManagementMaster inside AssetManagementMaster.js----');
                        util.logData(err);
                        cb(err, null);
                    }
                    else {
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
function getSomeAssetManagementMaster(data, cb) {
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
            str = "SELECT id,masterName FROM  asset_management_master where id > " + offset + " and DeleteFlag='0' " +
                " and CLIENTID = "+data.client_id + " ORDER BY id ASC LIMIT " + page_size;
        } else if (paginationType == 'prev') {
            str = "select * from (SELECT id,masterName FROM  asset_management_master where id < " + offset + " and DeleteFlag='0' " +
                " and CLIENTID = "+data.client_id + " ORDER BY id DESC LIMIT " + page_size + ")z ORDER BY z.id  ASC;";
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
        var str1 = "SELECT count(*) count FROM  asset_management_master where DeleteFlag='0' and CLIENTID = " + data.client_id;
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

module.exports.getSomeAssetManagementMaster = getSomeAssetManagementMaster;
module.exports.allAssetManagementMaster = allAssetManagementMaster;
module.exports.insertAssetManagementMaster = insertAssetManagementMaster;
module.exports.deleteAssetManagementMaster = deleteAssetManagementMaster;
module.exports.editAssetManagementMaster = editAssetManagementMaster;
