const config = require('./dbConnection');
const con = config.createMysqlConn();
const async = require('async');
const util=require('../util');
var AssetManagementValueEntity=require('../Entity/AssetManagementValueEntity');

// function preventSqlInjection(data) {
//     let arr={};
//     for(key in data){
//         arr[key]=con.escape(data[key]);
//     }
//     return arr;
// }

function allAssetManagementValue(data,cb) {
    var str = "SELECT amv.id,amv.masterId,amv.columnId,amv.descriptionId,amv.assetValue,am.masterName,amc.columnName,ad.description "+
              "FROM  asset_management_value amv,asset_management_master am,asset_management_column amc, asset_description ad "+
              "where amv.columnId = amc.id and amv.masterId = am.id and amv.descriptionId = ad.id and amv.DeleteFlag='0' and amc.DeleteFlag='0' and am.DeleteFlag='0' and ad.DeleteFlag='0' and amv.CLIENTID="+data.clientId;
    con.query(str, function (err, done, fields) {
        if (err) {
            util.logData('---Error from allAssetManagementValue inside AssetManagementValue.js----');
            util.logData(err);
            cb(err, null);
        } else {
            cb(null, true, done);
        }
    })
}
function insertAssetManagementValue(data, cb) {
    util.logData(data);
    const val = util.preventSqlInjection(data);
    
    data = new AssetManagementValueEntity(val);
    // var str1 = 'select count(*) cnt from asset_management_value where DeleteFlag = 0 and (assetValue =' + data.assetValue + ')';
    var str1 = 'select count(*) cnt from asset_management_value where DeleteFlag = 0 and (columnId=' + data.columnId + ' and descriptionId="' + data.descriptionId + '" and CLIENTID = '+data.client_id +')';

    con.query(str1, function (err1, result1) {
        if (err1) {
            util.logData('---Error from insertModuleDB inside module.js----');
            util.logData(err1);
            cb(err1, null);
        } else {
            if (result1[0].cnt === 0) {
                var sql = "INSERT INTO asset_management_value (masterId,columnId,descriptionId,assetValue,CLIENTID,createbyid) VALUES (" + data.masterId + "," + data.columnId + "," + data.descriptionId + ",'" + data.assetValue + "'," + data.client_id + "," + data.createdBy + ")";
                util.logData(sql)
                con.query(sql, function (err, result) {
                    if (err) {
                        util.logData('---Error from insertAssetManagementValue inside AssetManagementValue.js----');
                        util.logData(err);
                        cb(err, null);
                    } else {
                        cb(null, true, result.insertId);
                    }
                });
            } else {
                cb(null, false, "an attribute has one value for one description");
            }
        }
    });

}

function insertAssetManagementAllValue(data, cb) {
    util.logData(data);
    const val = util.preventSqlInjection(data);
    console.log(data)
    console.log(data.assetValues);
    var assetIdArray = Object.keys(data.assetValues);
    var assetValueArray = Object.values(data.assetValues);
    console.log(assetIdArray);
    console.log(assetValueArray);
    assetIds = assetIdArray.toString()
    console.log(assetIds);

    data = new AssetManagementValueEntity(val);
    // var str1 = 'select count(*) cnt from asset_management_value where DeleteFlag = 0 and (assetValue =' + data.assetValue + ')';
    var str1 = 'select count(*) cnt from asset_management_value where columnId in ('+assetIds+') and DeleteFlag = 0 and descriptionId=' + data.descriptionId + ' and CLIENTID = '+data.client_id;

    con.query(str1, function (err1, result1) {
        if (err1) {
            util.logData('---Error from insertModuleDB inside module.js----');
            util.logData(err1);
            cb(err1, null);
        } else {
            if (result1[0].cnt === 0) {
                var sqlValues = ''; 
                for (var i in assetIdArray) {
                    if(sqlValues == ''){
                        sqlValues = sqlValues +  '('+ data.masterId +','+ assetIdArray[i] +','+ data.descriptionId +',"'+ assetValueArray[i] +'",'+ data.client_id + "," + data.createdBy +')';
                    }else{
                        sqlValues = sqlValues +  ',('+ data.masterId +','+ assetIdArray[i] +','+ data.descriptionId +',"'+ assetValueArray[i] +'",'+ data.client_id + "," + data.createdBy +')';
                    }
                }
                console.log(sqlValues);

                //var sql = "INSERT INTO asset_management_value (masterId,columnId,descriptionId,assetValue,CLIENTID,createbyid) VALUES (" + data.masterId + "," + data.columnId + "," + data.descriptionId + ",'" + data.assetValue + "'," + data.client_id + "," + data.createdBy + ")";
                var sql = "INSERT INTO asset_management_value (masterId,columnId,descriptionId,assetValue,CLIENTID,createbyid) VALUES "+ sqlValues;
                util.logData(sql)
                con.query(sql, function (err, result) {
                    if (err) {
                        util.logData('---Error from insertAssetManagementValue inside AssetManagementValue.js----');
                        util.logData(err);
                        cb(err, null);
                    } else {
                        var sql3 = 'Update asset_description set new_asset = 0 where id =' + data.descriptionId;
                        console.log(sql3);
                        con.query(sql3, function (err, result3) {
                            if (err) {
                                util.logData('---Error from insertAssetManagementValue inside AssetManagementValue.js----');
                                util.logData(err);
                                cb(err, null);
                            }else{
                                cb(null, true, result.insertId);
                            }
                        });
                    }
                });
            } else {
                cb(null, false, "an attribute has one value for one description");
            }
        }
    });

}

function deleteAssetManagementValue(data, cb) {
    const val=util.preventSqlInjection(data);
    data=new AssetManagementValueEntity(val);
    var sql = 'Update asset_management_value set  DeleteFlag = 1,delete_by_id = ' + data.user_id + ', DeleteDate = NOW() where id = ' + data.id + ';';
    con.query(sql,function (err, result) {
        if (err) {
            util.logData('---Error from deleteAssetManagementValue inside AssetManagementValue.js----');
            util.logData(JSON.stringify(err));
            cb(err, null);
        }
        else {
            // util.logData(JSON.stringify(result));
            cb(null, true, result);
        }
    });
}

function editAssetManagementValue(data, cb) {
    const val=util.preventSqlInjection(data);
    data=new AssetManagementValueEntity(val);
    var str1 = 'select count(*) cnt from asset_management_value where DeleteFlag = 0 and (assetValue ="' + data.assetValue + '")';
    con.query(str1, function (err1, result1) {
        if (err1) {
            util.logData('---Error from insertModuleDB inside module.js----');
            util.logData(err1);
            cb(err1, null);
        } else {
            if (result1[0].cnt === 0) {
                var sql = 'Update asset_management_value set assetValue = "' + data.assetValue + '",modifiybyid ='+ data.createdBy + ', modifiydate=NOW()  where id =' + data.id;
                // util.logData(sql);
                con.query(sql, function (err, result) {
                    if (err) {
                        util.logData('---Error from editAssetManagementValue inside AssetManagementValue.js----');
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

function getAssetColumnByMaster(data, cb) {
    data=new AssetManagementValueEntity(data);
    var str = "SELECT amc.id columnId,amc.masterId, amc.columnName, am.masterName "+
        " FROM  asset_management_column amc, asset_management_master am " +
        "where amc.masterId = am.id and amc.masterId = "+data.masterId +
        " and am.DeleteFlag='0' and amc.DeleteFlag='0'";
    console.log(str);
    con.query(str, function (err, done, fields) {
        if (err) {
            util.logData('---Error from getAssetColumnByMaster inside AssetManagementColumnDB.js----');
            util.logData(err);
            cb(err, null);
        } else {
            cb(null, true, done);
        }
    });
}


function getAssetDetailsByMaster(data, cb) {
    const val=util.preventSqlInjection(data);
    data=new AssetManagementValueEntity(val);
    var str = "SELECT ad.id descId,ad.masterId, ad.description, am.masterName" +
        " FROM  asset_description ad, asset_management_master am " +
        "where ad.masterId = am.id and ad.masterId = "+data.masterId +
        " and am.DeleteFlag='0' and ad.DeleteFlag='0'";

    con.query(str, function (err, done, fields) {
        if (err) {
            util.logData('---Error from getAssetDetailsByMaster inside AssetManagementColumnDB.js----');
            util.logData(err);
            cb(err, null);
        } else {
            cb(null, true, done);
        }
    });
}


function getNewAssetDetailsByMaster(data, cb) {
    const val=util.preventSqlInjection(data);
    data=new AssetManagementValueEntity(val);
    var str = "SELECT ad.id descId,ad.masterId, ad.description, am.masterName" +
        " FROM  asset_description ad, asset_management_master am " +
        "where ad.masterId = am.id and ad.masterId = "+data.masterId +
        " and am.DeleteFlag='0' and ad.DeleteFlag='0' and ad.new_asset = 1";
    console.log(str);
    con.query(str, function (err, done, fields) {
        if (err) {
            util.logData('---Error from getNewAssetDetailsByMaster inside AssetManagementColumnDB.js----');
            util.logData(err);
            cb(err, null);
        } else {
            cb(null, true, done);
        }
    });
}

function getAssetManagementDataTable(data, cb) {
    console.log(data);
    console.log(data.masterId);
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
        funcArr = {dataObj , totalData, columnObj};
    } else {
        util.logData('elseeeeeeeeeee offset');
        funcArr = {dataObj, columnObj};
    }
    async.parallel(funcArr,
        function(err, results) {
            if (err) {
                cb(null, false, err);
            } else {
                if(offset == "0") {
                    if(Array.isArray(results.totalData) && results.totalData.length){
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
                    }else{
                        results['totalPage'] = 0;
                    }
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
            var str = "SELECT asset_description.id,asset_description.masterId,asset_description.description, " +
                "GROUP_CONCAT(CONCAT(asset_management_value.columnId,\":\",asset_management_value.assetValue) order by asset_management_value.columnId ASC) columVal " +
                "from `asset_description` " +
                "join `asset_management_value` ON asset_description.id=asset_management_value.descriptionId " +
                "WHERE asset_description.id > " +offset+" and asset_description.masterId=" +data.masterId + " and asset_management_value.DeleteFlag=0 and asset_description.DeleteFlag=0"+
                " group by asset_description.id"+ " ORDER BY asset_description.id ASC LIMIT " + page_size;


            util.logData('sql=' + str);
        } else if (paginationType == 'prev') {
            var str = "SELECT asset_description.id,asset_description.masterId,asset_description.description, " +
                "GROUP_CONCAT(CONCAT(asset_management_value.columnId,\":\",asset_management_value.assetValue) order by asset_management_value.columnId ASC) columVal " +
                "from `asset_description` " +
                "join `asset_management_value` ON asset_description.id=asset_management_value.descriptionId " +
                "WHERE asset_description.id < " +offset+" and asset_description.masterId=" +data.masterId + " and asset_management_value.DeleteFlag=0 and asset_description.DeleteFlag=0"+
                " group by asset_description.id"+ " ORDER BY asset_description.id ASC LIMIT " + page_size;

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
        var str1 = "SELECT COUNT(*) count " +
            "FROM asset_management_value, asset_description " +
            "WHERE asset_management_value.descriptionId=asset_description.id and asset_management_value.masterId="+data.masterId+" and asset_management_value.CLIENTID = "+data.client_id+" and asset_management_value.DeleteFlag=0 and asset_description.DeleteFlag=0 group by asset_management_value.columnId limit 1";
        console.log(str1);
        con.query(str1, function (err, done) {
            if (err) {
                util.logData('---Error from getAssetColumnByMaster inside TicketTypeDB.js----');
                util.logData(err);
                cb(err, null);
            } else {
                // util.logData('result1=' + done);
                cb(null, done);
            }
        });
    }

    function columnObj(cb) {
        var str2 = "SELECT amc.id, amc.columnName" +
            " FROM asset_management_column amc, asset_management_master am " +
            "where amc.masterId = am.id and amc.masterId = "+data.masterId +
            " and am.DeleteFlag='0' and amc.DeleteFlag='0'";
        con.query(str2, function (err, done, fields) {
            if (err) {
                util.logData('---Error from getAssetColumnByMaster inside TicketTypeDB.js----');
                util.logData(err);
                cb(err, null);
            } else {
                // util.logData('result2: ', done);
                cb(null, done);
            }
        });
    }
}


function getAssetManagementData(data, cb) {
    const val=util.preventSqlInjection(data);
    data=new AssetManagementValueEntity(val);
    async.parallel({
        columnObj: function(cb) {
            var str = "SELECT amc.id, amc.columnName" +
                " FROM asset_management_column amc, asset_management_master am " +
                "where amc.masterId = am.id and amc.masterId = "+data.masterId +
                " and am.DeleteFlag='0' and amc.DeleteFlag='0'";
            con.query(str, function (err, done, fields) {
                if (err) {
                    util.logData('---Error from getAssetColumnByMaster inside TicketTypeDB.js----');
                    util.logData(err);
                    cb(err, null);
                } else {
                    util.logData('result: ', done);
                    cb(null, done);
                }
            });
        },
        valueObj: function(cb) {
            var str1 = "SELECT asset_description.id,asset_description.masterId,asset_description.description, " +
                "GROUP_CONCAT(CONCAT(asset_management_value.columnId,':',asset_management_value.assetValue) order by asset_management_value.columnId ASC) columVal " +
                "from `asset_description` " +
                "join `asset_management_value` ON asset_description.id=asset_management_value.descriptionId " +
                "WHERE asset_description.masterId=" +data.masterId + " and asset_management_value.DeleteFlag=0 and asset_description.DeleteFlag=0"+
                " group by asset_description.id";
            console.log("-----------------------------------------"); 
            console.log(str1);    
            con.query(str1, function (err, done, fields) {
                if (err) {
                    util.logData('---Error from getAssetColumnByMaster inside TicketTypeDB.js----');
                    util.logData(err);
                    cb(err, null);
                } else {
                    cb(null, done);
                }
            });
        }
    }, function(err, results) {
        cb(null, true, results);
    });
}

function searchAssetManagementData(data, cb) {
    var page_no =parseInt(data.page_no);
    var page_size =parseInt(data.page_size);
    var page = (page_no-1)*page_size;
    const val=util.preventSqlInjection(data);
    data=new AssetManagementValueEntity(val);
    var str1 = '';
    async.parallel({
        columnObj: function(cb) {
            var str = "SELECT amc.id, amc.columnName" +
                " FROM asset_management_column amc, asset_management_master am " +
                "where amc.masterId = am.id and amc.masterId = "+data.masterId +
                " and am.DeleteFlag='0' and amc.DeleteFlag='0'";
            con.query(str, function (err, done, fields) {
                if (err) {
                    util.logData('---Error from getAssetColumnByMaster inside TicketTypeDB.js----');
                    util.logData(err);
                    cb(err, null);
                } else {
                   // util.logData('result: ', done);
                    cb(null, done);
                }
            });
        },
        valueObj: function(cb) {
            if(data.columnId != '0' && data.assetValue != "''") {
                str1 = "SELECT (Select COUNT(DISTINCT asset_description.id) from `asset_description`" +
                    " join `asset_management_value` ON asset_description.id=asset_management_value.descriptionId " +
                    " WHERE asset_description.masterId=" +data.masterId + " and asset_management_value.columnId=" + data.columnId +" and asset_management_value.assetValue='" + data.assetValue + "' and asset_management_value.DeleteFlag=0 and asset_description.DeleteFlag=0) totalData, asset_description.id,asset_description.masterId,asset_description.description, " +
                    "GROUP_CONCAT(CONCAT(asset_management_value.columnId,':',asset_management_value.assetValue) order by asset_management_value.columnId ASC) columVal " +
                    "from `asset_description` " +
                    "join `asset_management_value` ON asset_description.id=asset_management_value.descriptionId " +
                    "WHERE asset_description.masterId=" +data.masterId + " and asset_management_value.DeleteFlag=0 and asset_description.DeleteFlag=0 and asset_management_value.descriptionId IN " +
                    "(select asset_management_value.descriptionId from asset_management_value where asset_management_value.columnId=" +data.columnId +" and asset_management_value.assetValue='" +data.assetValue +
                    "') group by asset_description.id LIMIT " + page_size + " OFFSET " + page;

            } else {
                str1 = "SELECT (Select COUNT(DISTINCT asset_description.id) from `asset_description`" +
                    " join `asset_management_value` ON asset_description.id=asset_management_value.descriptionId " +
                    " WHERE asset_description.masterId=" +data.masterId + " and asset_management_value.DeleteFlag=0 and asset_description.DeleteFlag=0) totalData, asset_description.id,asset_description.masterId,asset_description.description, " +
                "GROUP_CONCAT(CONCAT(asset_management_value.columnId,':',asset_management_value.assetValue) order by asset_management_value.columnId ASC) columVal " +
                "from `asset_description` " +
                "join `asset_management_value` ON asset_description.id=asset_management_value.descriptionId " +
                "WHERE asset_description.masterId=" +data.masterId + " and asset_management_value.DeleteFlag=0 and asset_description.DeleteFlag=0"+
                " group by asset_description.id LIMIT " + page_size + " OFFSET " + page;
            }
            util.logData(str1);
            con.query(str1, function (err, done, fields) {
                if (err) {
                    util.logData('---Error from getAssetColumnByMaster inside TicketTypeDB.js----');
                    util.logData(err);
                    cb(err, null);
                } else {
                    cb(null, done);
                }
            });
        }
    }, function(err, results) {
        cb(null, true, results);
    });
}

function maintainAssetManagementData(data,cb){
    data=new AssetManagementValueEntity(data);
    data.assetValue = con.escape(data.assetValue);
    var str_set_concat_length = "SET SESSION group_concat_max_len = 1000000;";
    var str = str_set_concat_length + "SELECT av.id, av.masterId, av.columnId, ac.columnName, av.assetValue, av.descriptionId "+
        ", (select CONCAT('[',GROUP_CONCAT('\"',avv.validationValue,'\"'),']') validationValue from asset_validation_value avv "+
        "where avv.columnId = ac.id and avv.DeleteFlag = 0) validationValue "+
        "FROM asset_management_value av, asset_management_column ac, asset_description ad "+
        "WHERE av.columnId = ac.id and av.descriptionId = ad.id and ad.description = ? and av.DeleteFlag = 0 "+
        "and ad.DeleteFlag = 0 and ac.DeleteFlag = 0  and av.CLIENTID = ? order by av.columnId;";

    console.log(str);
    con.query(str,[data.assetValue, data.client_id], function (err,result) {
        if (err) {
            util.logData(err);
            cb(err, null);
        } else {
            //console.log(result);
            cb(null, true, result[1]);
        }
    })
}
function getAssetMasterByTicket(data,cb){
    let sql='select distinct b.id,b.masterName from ticket_asset a,asset_management_master b,' +
        'asset_description c where c.DeleteFlag=0 and b.DeleteFlag=0 and a.DeleteFlag=0 and ' +
        'b.id=c.masterId and a.assetId=c.id and a.ticketId='+data.ticketId;
    // util.logData("Asset management value ----------------------->"+sql);
    con.query(sql,function (err,result) {
        if (err) {
            util.logData(err);
            cb(err, null);
        } else {
            cb(null, true, result);
        }
    })
}

function getTicketWiseAssetData(data,cb){
    data=util.preventSqlInjection(data);
    async.parallel({
        columnObj: function(cb) {
            var str = "SELECT amc.id, amc.columnName" +
                " FROM asset_management_column amc, asset_management_master am " +
                "where amc.masterId = am.id and amc.masterId = "+data.masterId +
                " and am.DeleteFlag='0' and amc.DeleteFlag='0'";
            con.query(str, function (err, done, fields) {
                if (err) {
                    util.logData('---Error from getAssetColumnByMaster inside TicketTypeDB.js----');
                    util.logData(err);
                    cb(err, null);
                } else {
                    cb(null, done);
                }
            });
        },
        valueObj: function(cb) {
            var str1 = 'SELECT asset_description.id,asset_description.masterId,asset_description.description,GROUP_CONCAT(CONCAT(asset_management_value.columnId,\':\',asset_management_value.assetValue) order by asset_management_value.columnId ASC) columVal from ticket_asset a,`asset_description` join `asset_management_value` ON asset_description.id=asset_management_value.descriptionId WHERE asset_description.masterId='+data.masterId+' and a.DeleteFlag=0 and a.assetId=asset_management_value.descriptionId and a.ticketId='+data.ticketId+' group by asset_description.id';
            con.query(str1, function (err, done, fields) {
                if (err) {
                    util.logData('---Error from getAssetColumnByMaster inside TicketTypeDB.js----');
                    util.logData(err);
                    cb(err, null);
                } else {
                    cb(null, done);
                }
            });
        }
    }, function(err, results) {
        util.logData(JSON.stringify(results))
        cb(null, true, results);
    });
}
function deleteTicketAssetData(data,cb){
    util.logData(data)
    data=util.preventSqlInjection(data);
    const sql = "update ticket_asset set DeleteFlag = '1',delete_by_id = " + data.user_id + ", DeleteDate = Now() where assetId = " + data.id + " and ticketId="+data.ticketId;
    con.query(sql, function (err, details) {
        if (err) {
            util.logData(err);
            cb(err, null);
        } else {
            if (details.affectedRows > 0) {
               const sql5 = "INSERT INTO TicketActivityLogs (ticketId,activity_id,WFCCResult_id,active_userId,logValue )  " +
                    " VALUES (" + data.ticketId + ",14," + data.WFCCResult_id + "," + data.user_id + ",'') ";
               con.query(sql5);
                cb(null, true, details);
            } else {
                cb(null, false, "Some error");
            }
        }
    })
}

function editAssetValue(data, cb) {
    var recordId = data.descriptionId;
    var createdBy = data.createdBy;
    var countVal = 0;
    if(Object.keys(data.columnValueObj).length == 0){
        console.log("No value to update");
        cb(null, true, 0);
    }

    async.forEach(Object.keys(data.columnValueObj), function (key, loopcallback){
        var assetValue = data.columnValueObj[key];
        assetValue = con.escape(assetValue);
        async.waterfall([
                function deletePrevValue(callback) {
                    var updateSql = "update asset_management_value set DeleteFlag = 1, delete_by_id = "+createdBy+","+
                        " DeleteDate=NOW() where DeleteFlag = 0 and columnId = "+key+" and descriptionId = "+recordId;
                    con.query(updateSql, function (err, result) {
                        if (err) {
                            util.logData('---Error from deletePrevValue inside AssetManagementValueDB.js----');
                            util.logData(err);
                            cb(err, null);
                        } else {
                            callback(null,true);
                        }
                    });

                },
                function getAssetValue(deleteResult, callback) {
                    var sql = "select id, masterId, CLIENTID from asset_management_value"+
                        " where columnId = "+key+" and descriptionId = "+recordId+
                        " order by id desc limit 1";
                    con.query(sql, function (err, result) {
                        if (err) {
                            util.logData('---Error from getAssetValue inside AssetManagementValueDB.js----');
                            util.logData(err);
                            cb(err, null);
                        } else {
                            callback(null,result[0]);
                        }
                    });

                },
                function insertValue(selectResult, callback) {
                    var insertSql = "INSERT INTO asset_management_value (masterId,columnId,descriptionId,assetValue,CLIENTID,createbyid)"+
                        " VALUES ("+selectResult.masterId+","+key+","+recordId+","+assetValue+","+selectResult.CLIENTID+","+createdBy+")";
                    con.query(insertSql, function (err, result) {
                        if (err) {
                            util.logData('---Error from insertValue inside AssetManagementValueDB.js----');
                            util.logData(err);
                            cb(err, null);
                        } else {
                            loopcallback();
                        }
                    });
                }
            ],
            function (err) {
                if (err) {
                    throw new Error(err);
                } else {
                    logData(err);
                }
            });



    }, function(err) {
        console.log('iterating done');
        cb(null, true, "Update Complete");
    });
}

function getAssetColumnByMasterForValue(data, cb) {
    data=new AssetManagementValueEntity(data);
    var str = "SELECT amc.id columnId,amc.masterId, amc.columnName, am.masterName ,"+
        " (select CONCAT('[',GROUP_CONCAT('\"', avv.validationValue, '\"'),']') validationValue from "+
        "asset_validation_value avv where avv.columnId = amc.id and avv.DeleteFlag=0) validationValue " +
        " FROM  asset_management_column amc, asset_management_master am " +
        "where amc.masterId = am.id and amc.masterId = "+data.masterId +
        " and am.DeleteFlag=0 and amc.DeleteFlag=0";
    console.log(str);
    con.query(str, function (err, done, fields) {
        if (err) {
            util.logData('---Error from getAssetColumnByMaster inside AssetManagementColumnDB.js----');
            util.logData(err);
            cb(err, null);
        } else {
            cb(null, true, done);
        }
    });
}

function getAssetByTicket(data,cb) {
    var str = "SELECT b.description assetId FROM ticket_asset_mapped a, asset_description b, ticket c where" +
        " b.id = a.asset_id and c.id = a.ticket_id and a.ticket_id = ? and c.DeleteFlag=0 and c.DeleteFlag = 0";
    con.query(str, [data.ticketId], function (err, done, fields) {
        if (err) {
            util.logData('---Error from allAssetManagementValue inside AssetManagementValue.js----');
            util.logData(err);
            cb(err, null);
        } else {
            cb(null, true, done);
        }
    })
}


module.exports.getAssetByTicket = getAssetByTicket;
module.exports.getAssetColumnByMasterForValue = getAssetColumnByMasterForValue;
module.exports.deleteTicketAssetData=deleteTicketAssetData;
module.exports.getTicketWiseAssetData=getTicketWiseAssetData;
module.exports.getAssetMasterByTicket=getAssetMasterByTicket;
module.exports.getAssetManagementData = getAssetManagementData;
module.exports.allAssetManagementValue = allAssetManagementValue;
module.exports.insertAssetManagementValue = insertAssetManagementValue;

module.exports.deleteAssetManagementValue = deleteAssetManagementValue;
module.exports.editAssetManagementValue = editAssetManagementValue;
module.exports.getAssetColumnByMaster = getAssetColumnByMaster;
module.exports.getAssetDetailsByMaster = getAssetDetailsByMaster;
module.exports.searchAssetManagementData = searchAssetManagementData;
module.exports.maintainAssetManagementData = maintainAssetManagementData;
module.exports.editAssetValue = editAssetValue;
//Added By Subhasis
module.exports.insertAssetManagementAllValue = insertAssetManagementAllValue;
module.exports.getAssetManagementDataTable = getAssetManagementDataTable;
module.exports.getNewAssetDetailsByMaster = getNewAssetDetailsByMaster;
