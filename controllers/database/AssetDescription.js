const config = require('./dbConnection');
const con = config.createMysqlConn();
// const logger = require('inspire').logger;
const async = require('async');
const util = require('../util');
var AssetDescriptionEntity = require('../Entity/AssetDescriptionEntity');

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


function allAssetDescription(data, cb) {
    var page_size = data.page_size;
    var paginationType = data.paginationType;
    var data = preventSqlInjection(data);
    var offset = data.nextOffset;
    var funcArr = {};
    var str = "";

    if (offset == 0) {
        funcArr = {dataObj, totalData};
    } else {
        funcArr = {dataObj};
    }
    async.parallel(funcArr,
        function (err, results) {
            if (err) {
                cb(null, true, results);
            } else {
                if (offset == 0) {
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
            str = "SELECT ad.id,ad.masterId, ad.description, am.masterName" +
                " FROM  asset_description ad, asset_management_master am " +
                "where ad.masterId = am.id " +
                "and am.DeleteFlag='0' and ad.DeleteFlag='0' and ad.CLIENTID=" + data.clientId + " and ad.id > " + offset +
                " LIMIT " + page_size;
        } else if (paginationType == 'prev') {
            str = "SELECT * from (SELECT ad.id," +
                "ad.masterId, ad.description, am.masterName" +
                " FROM  asset_description ad, asset_management_master am " +
                "where ad.masterId = am.id " +
                "and am.DeleteFlag='0' and ad.DeleteFlag='0' and ad.CLIENTID=" + data.clientId + " and ad.id < " + offset +
                "  ORDER BY ad.id DESC LIMIT " + page_size + ")a ORDER BY a.id  ASC";
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
        var str1 = "select count(*) count FROM  asset_description ad, asset_management_master am " +
            "where ad.masterId = am.id " +
            " and am.DeleteFlag='0' and ad.DeleteFlag='0' and ad.CLIENTID=" + data.clientId;
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

function insertAssetDescription(data, cb) {
    data = new AssetDescriptionEntity(data);
    if(data.description.includes("'")){
        cb(null, false, "(') not allowed.");
    }
    else{
        data.description = con.escape(data.description);
        var str1 = 'select count(*) cnt from asset_description where DeleteFlag = 0 and description ="' + data.description + '" and CLIENTID = ' + data.client_id;
        con.query(str1, function (err1, result1) {
            if (err1) {
                util.logData('---Error from insertAssetDescription inside AssetDescriptionEntity----');
                util.logData(err1);
                cb(err1, null);
            } else {
                if (result1[0].cnt === 0) {
                    var sql = 'INSERT INTO asset_description (masterId,description,CLIENTID,createbyid) VALUES (' + data.masterId + ',"' + data.description + '",' + data.client_id + ',' + data.createdBy + ')';
                    util.logData(sql)
                    con.query(sql, function (err, result) {
                        if (err) {
                            util.logData('---Error from insertAssetDescription inside AssetDescription.js----');
                            util.logData(err);
                            cb(err, null);
                        } else {

                             // optimizedreport table starts
                             var sql2="select a.ticketId id,b.description from ticket_asset a,asset_description b "
                             +" where b.CLIENTID = "+ data.client_id +" and b.DeleteFlag = 0 and a.assetId=b.id order by b.createdate desc limit 1;"
                         logData("@@@@@@@###############@@#"+sql2)
                             con.query(sql2,function(err,result2){
                                 if(err){
                                     console.log("sxcdfd",err);
                                     cb(err,null);
                                 }else{
                                     var sql45 ="update optimizedreport set config_item_ref ='"+result2[0].description+"' where id ='"+result2[0].id+"';"
                                           con.query(sql45,function(err,result45){
                                                  if(err){
                                                     console.log("#23",err);
                                                          cb(err,null)
                                                    }else{
                                                    logData("&&&&&&&&&&&&&&------------>"+sql45);
                                                       console.log("^^^^^^^^^",result45);
                                                     }
                                                })
                                 }
                             });
 
                             // optimizedreport table ends
                             
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


function deleteAssetDescription(data, cb) {
    data = new AssetDescriptionEntity(data);
    var sql = 'Update asset_description set  DeleteFlag = 1,delete_by_id = ' + data.user_id + ', DeleteDate = NOW() where id = ' + data.id + ';';
    con.query(sql, function (err, result) {
        if (err) {
            util.logData('---Error from deleteAssetDescription inside AssetDescription.js----');
            util.logData(JSON.stringify(err));
            cb(err, null);
        } else {
            // util.logData(JSON.stringify(result));
            cb(null, true, result);
        }
    });
}

function editAssetDescription(data, cb) {
    data = new AssetDescriptionEntity(data);
    var str1 = 'select count(*) cnt from asset_description where DeleteFlag = 0 and (description ="' + data.description + '" and CLIENTID = ' + data.client_id + ')';
    con.query(str1, function (err1, result1) {
        if (err1) {
            util.logData('---Error from insertAssetDescription inside AssetDescriptionEntity----');
            util.logData(err1);
            cb(err1, null);
        } else {
            if (result1[0].cnt === 0) {
                var sql = 'Update asset_description set description = "' + data.description + '" ,modifiybyid =' + data.createdBy + ', modifiydate=NOW()  where id =' + data.id;
                // util.logData(sql);
                con.query(sql, function (err, result) {
                    if (err) {
                        util.logData('---Error from editAssetDescription inside AssetDescription.js----');
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


module.exports.allAssetDescription = allAssetDescription;
module.exports.insertAssetDescription = insertAssetDescription;
module.exports.deleteAssetDescription = deleteAssetDescription;
module.exports.editAssetDescription = editAssetDescription;
