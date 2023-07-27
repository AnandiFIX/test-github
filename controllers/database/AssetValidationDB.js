const config = require('./dbConnection');
const con = config.createMysqlConn();
// const logger = require('inspire').logger;
const util=require('../util');
const async = require('async');
var AssetValidationValueEntity=require('../Entity/AssetValidationValueEntity');

function preventSqlInjection(data) {
    let arr={};
    for(key in data){
        arr[key]=data[key];
    }
    return arr;
}

function insertaddAssetValidation(data, cb){
    console.log(data);
    var countVal = 0;
    validationArray = data.validationValuesArray;
    var valueForInsert = [];
    async.waterfall([
        function firstStep(done) {
            var countVal = 1;
            validationArray.forEach(async (validationValue, idx) => {
                //var validationValue = validationArray[i];
                var strValidationCol = "select count(*) cnt from asset_validation_value av where av.DeleteFlag = 0 "+
                                        "and av.masterId = "+data.masterId+" and av.columnId = "+data.columnId+" and av.validationValue = '"+validationValue+"'";
                util.logData(strValidationCol);
                con.query(strValidationCol, function (err1, result1) {
                    if (err1) {
                        util.logData('---Error from insertaddAssetValidation inside AssetValidationDB.js----');
                        util.logData(err1);
                        cb(null, false, "");
                    } else {
                        //console.log("DB Result ....")
                        if(result1[0].cnt === 0){
                            valueForInsert.push(validationValue);
                            //console.log(valueForInsert);
                        }   
                        //console.log(validationArray.length);
                        //console.log(countVal);
                        if(validationArray.length == countVal){
                            done(null, valueForInsert);
                        }   
                        countVal = countVal +1;
                    }
                });
            });
        },
        function secondStep(step1Result, done) {
            console.log("Second Step Called");
            var countVal = 1;
            if(step1Result.length === 0){
                cb(null, true, "");
            }
            step1Result.forEach(async (validationValue, idx) => {
                var strValidationIns = "insert into asset_validation_value (masterId, columnId, validationValue, Description, HO_Flag, CLIENTID, createbyid)"+
                            " values ("+data.masterId+","+data.columnId+",'"+validationValue+"','','',"+data.client_id+","+data.user_id+")";
                util.logData(strValidationIns);
                con.query(strValidationIns, function (err, result) {
                    if (err) {
                        util.logData('---Error from insertaddAssetValidation inside AssetValidationDB.js----');
                        util.logData(err1);
                        cb(err, null);
                    }else{
                        if (result.affectedRows > 0) {
                            //console.log(step1Result.length);
                            //console.log(countVal);
                            if(step1Result.length == countVal){
                                cb(null, true, result.affectedRows);
                            }
                        } else {
                            cb(null, false, result.affectedRows);
                        }
                        countVal = countVal + 1;
                    }
                });
        
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
    
}

function allAssetValidation(data,cb) {
    console.log(data);
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
            str = "SELECT avv.id, avv.masterId, avv.columnId, (select asset_management_master.masterName from asset_management_master where asset_management_master.id=avv.masterId) masterName, "+
                  "(select asset_management_column.columnName from asset_management_column where asset_management_column.id=avv.columnId) columnName, "+
                  "avv.validationValue FROM  asset_validation_value avv where avv.DeleteFlag='0' and avv.CLIENTID= "+data.clientId +
                  " and avv.id > " + offset + " ORDER BY avv.id ASC LIMIT " + page_size;
            util.logData('sql=' + str);
        } else if (paginationType == 'prev') {
            str = "SELECT avv.id, avv.masterId, avv.columnId, (select asset_management_master.masterName from asset_management_master where asset_management_master.id=avv.masterId) masterName, "+
            "(select asset_management_column.columnName from asset_management_column where asset_management_column.id=avv.columnId) columnName, "+
            "avv.validationValue FROM  asset_validation_value avv where avv.DeleteFlag='0' and avv.CLIENTID= "+data.clientId +
            " and avv.id < " + offset  + " ORDER BY avv.id ASC LIMIT " + page_size;
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
        var str1 = "SELECT count(*) count  FROM  asset_validation_value avv where "+
        "avv.DeleteFlag='0' and avv.CLIENTID= "+data.clientId;
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

function deleteAssetValidation(data, cb) {
    const val = preventSqlInjection(data);
    data = new AssetValidationValueEntity(val);
    var sql = 'Update asset_validation_value set  DeleteFlag = 1, delete_by_id = ' + data.user_id + ', DeleteDate = NOW() where id = ' + data.id + ';';
    con.query(sql, function (err, result) {
        if (err) {
            util.logData('---Error from deleteAssetValidation inside AssetDescription.js----');
            util.logData(JSON.stringify(err));
            cb(err, null);
        } else {
            // util.logData(JSON.stringify(result));
            cb(null, true, result);
        }
    });
}


function editAssetValidation(data, cb) {
    const val = preventSqlInjection(data);
    data = new AssetValidationValueEntity(val);
    var str1 = "select count(*) cnt from asset_validation_value where DeleteFlag = 0 and CLIENTID = "+data.client_id+" and masterId = "+data.masterId+" and columnId = "+data.columnId+" and validationValue = '"+data.validationValue+"'";
    con.query(str1, function (err1, result1) {
        if (err1) {
            util.logData('---Error from insertAssetDescription inside AssetDescriptionEntity----');
            util.logData(err1);
            cb(err1, null);
        } else {
            if (result1[0].cnt === 0) {
                var sql = 'Update asset_validation_value set validationValue = "' + data.validationValue + '" ,modifiybyid =' + data.createdBy + ', modifiydate=NOW()  where id =' + data.id;
                // util.logData(sql);
                con.query(sql, function (err, result) {
                    if (err) {
                        util.logData('---Error from editAssetValidation inside AssetDescription.js----');
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



module.exports.insertaddAssetValidation = insertaddAssetValidation;
module.exports.allAssetValidation = allAssetValidation;
module.exports.editAssetValidation = editAssetValidation;
module.exports.deleteAssetValidation = deleteAssetValidation;