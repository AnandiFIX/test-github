const config = require('./dbConnection');
const con = config.createMysqlConn();
// const logger = require('inspire').logger;
const util=require('../util');
const async = require('async');
var AssetManagementColumnEntity=require('../Entity/AssetManagementColumnEntity');

function preventSqlInjection(data) {
    let arr={};
    for(key in data){
        arr[key]=data[key];
    }
    return arr;
}

function allAssetManagementColumn(data,cb) {
    var page_size = data.page_size;
    var paginationType = data.paginationType;
    data = util.preventSqlInjection(data);
    util.logData('dataaaaaaaaaaa=======' + data);
    var offset = data.nextOffset;
    var funcArr = {};
    var str = "";
    util.logData('typeof offset=======' + typeof offset + offset);
    if (offset == "0") {
        util.logData('iffffffffffffffff offset');
        funcArr = {dataObj , totalData};
    } else {
        util.logData('elseeeeeeeeeee offset');
        funcArr = {dataObj};
    }
    async.parallel(funcArr,
        function(err, results) {
        if (err) {
            cb(null, false, err);
        } else {
                if(offset == "0") {
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
                    var nextOffset  = results.dataObj[results.dataObj.length-1].id;
                    var previousOffset = results.dataObj[0].id;
                    results['nextOffset'] = nextOffset;
                    results['previousOffset'] = previousOffset;
                }
                cb(null, true, results);
            }
        });

    function dataObj(cb) {
        if (paginationType == 'next' || paginationType == '') {
            str = "SELECT amc.id,amc.masterId, amc.columnName, am.masterName" +
                " FROM  asset_management_column amc, asset_management_master am " +
                " where amc.masterId = am.id "+
                " and am.DeleteFlag='0' and amc.DeleteFlag='0' and amc.CLIENTID="+data.client_id +
                " and amc.id > " + offset + " ORDER BY amc.id ASC LIMIT " + page_size;
            util.logData('sql=' + str);
        } else if (paginationType == 'prev') {
            str = " select * from (SELECT amc.id,amc.masterId, amc.columnName, am.masterName" +
            " FROM  asset_management_column amc, asset_management_master am " +
            " where amc.masterId = am.id "+
            " and am.DeleteFlag='0' and amc.DeleteFlag='0' and amc.CLIENTID="+data.client_id + " and amc.id < " +
                offset  + " ORDER BY amc.id DESC LIMIT " + page_size + ")z ORDER BY z.id  ASC;";
            util.logData('sql1=' + str);
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
        var str1 = "SELECT count(*) count " +
            " FROM  asset_management_column amc, asset_management_master am " +
            "where amc.masterId = am.id "+
            "and am.DeleteFlag='0' and amc.DeleteFlag='0' and amc.CLIENTID="+data.client_id;
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

function insertAssetManagementColumn(data, cb) {
    util.logData(data);
    const val = preventSqlInjection(data);

    data = new AssetManagementColumnEntity(val);
    data.columnName = con.escape(data.columnName);

    var str1 = 'select count(*) cnt from asset_management_column where DeleteFlag = 0 and columnName ="' + data.columnName +
        '" and masterId='+data.masterId +' and CLIENTID=' + data.client_id;
    con.query(str1, function (err1, result1) {
        if (err1) {
            util.logData('---Error from insertAssetManagementColumn inside AssetManagementColumnEntity----');
            util.logData(err1);
            cb(err1, null);
        } else {
            if (result1[0].cnt === 0) {
                var sql = 'INSERT INTO asset_management_column (masterId,columnName,CLIENTID,createbyid) VALUES (' + data.masterId +
                    ',"' + data.columnName + '",' + data.client_id + ',' + data.createdBy + ')';
                util.logData(sql)
                con.query(sql, function (err, result) {
                    if (err) {
                        util.logData('---Error from insertAssetManagementColumn inside AssetManagementColumnDB.js----');
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

function deleteAssetManagementColumn(data, cb) {
    data=new AssetManagementColumnEntity(data);
    var str1 = "select count(*) cnt from asset_management_value where asset_management_value.columnId = "+ data.id +" and asset_management_value.assetValue <> ''";
    con.query(str1, function (err1, result1) {
        if (err1) {
            util.logData('---Error from deleteAssetManagementColumn inside AssetManagementColumnDB.js----');
            util.logData(err1);
            cb(err1, null);
        } else {
            if (result1[0].cnt === 0) {
                var sql = 'Update asset_management_column set  DeleteFlag = 1,delete_by_id = ' + data.user_id + ', DeleteDate = NOW() where id = ' + data.id + ';';
                con.query(sql,function (err, result) {
                    if (err) {
                        util.logData('---Error from deleteAssetManagementColumn inside AssetManagementColumnDB.js----');
                        util.logData(JSON.stringify(err));
                        cb(err, null);
                    }
                    else {
                        cb(null, true, result);
                    }
                });
            } else {
                cb(null, false, "Value exists for this attribute");
            }
        }
    });
}
function editAssetManagementColumn(data, cb) {
    const val=preventSqlInjection(data);
    data=new AssetManagementColumnEntity(val);
    // ----------------------------------------------------------
    var str1 = 'select count(*) cnt from asset_management_column where DeleteFlag = 0 and (columnName ="' + data.columnName + '" and CLIENTID=' + data.client_id +')';
    con.query(str1, function (err1, result1) {
        if (err1) {
            util.logData('---Error from insertAssetManagementColumn inside AssetManagementColumnEntity----');
            util.logData(err1);
            cb(err1, null);
        } else {
            if (result1[0].cnt === 0) {
                var sql = 'Update asset_management_column set columnName = "' + data.columnName + '",modifiybyid ='+ data.createdBy + ', modifiydate=NOW()  where id =' + data.id;
                // util.logData(sql);
                con.query(sql, function (err, result) {
                    if (err) {
                        util.logData('---Error from editAssetManagementColumn inside AssetManagementColumnDB.js----');
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
    // ----------------------------------------------------------
}



module.exports.allAssetManagementColumn = allAssetManagementColumn;
module.exports.insertAssetManagementColumn = insertAssetManagementColumn;
module.exports.deleteAssetManagementColumn = deleteAssetManagementColumn;
module.exports.editAssetManagementColumn = editAssetManagementColumn;
