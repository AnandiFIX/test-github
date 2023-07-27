const config = require('./dbConnection');
const con = config.createMysqlConn();
// const logger = require('inspire').logger;
const util=require('../util');
var UrlCreationEntity=require('../Entity/UrlCreationEntity');

function preventSqlInjection(data) {
    let arr={};
    for(key in data){
        // if(data[key] !== 'string'){
        //     arr[key] = data[key];
        // }else{
        //     arr[key] = con.escape(data[key]);
        // }
        arr[key] = data[key];
    }
    return arr;
}

function insertUrlKeyDB(data, cb) {
    const val=preventSqlInjection(data);
    data=new UrlCreationEntity(val);
    var str = "select count(*) cnt_1 from URLKEY where DeleteFlag = ? and (URLKEY = ? and URL =? ) ";
    con.query(str,[0,data.urlKey, data.url ], function (errs, results) {
        if (errs) {
            util.logData(errs);
            callback(errs, null);
        } else {
            if (results[0].cnt_1 == 0) {
                var clientId = data.clientId;
                var sql1 = "INSERT INTO URLKEY (URLKEY,URL,URLDESCRIPTION) VALUES ('"
                    + data.urlKey + "','" + data.url + "','" + data.urlDesc + "')";
                con.query(sql1, function (err, result) {
                    if (err) {
                        util.logData(err);
                        cb(err, null);
                    } else {
                        var urlId = result.insertId;
                        var str2 = " select count(*) cnt from MODULEURLMAP where URLID=? and CLIENTID=? AND MODULEID=? and DeleteFlag = ? ";
                        con.query(str2,[urlId,clientId,data.moduleId,0], function (errs2, results2) {
                            if (errs2) {
                                util.logData(errs2);
                                cb(errs2, null);
                            } else {
                                if (results2[0].cnt == 0) {
                                    util.logData('data.type:'+data.type);
                                    let variables;
                                    if (data.type === "update") {
                                        var sql2 = 'update MODULEURLMAP set URLID=? , modifybyid =? , modifydate=NOW()  where CLIENTID=? AND MODULEID=? and  URLID=? and DeleteFlag = ? ';
                                        variables=[urlId,data.createbyid,clientId,data.moduleId,data.oldUrl,0];
                                    } else {
                                        var sql2 = "INSERT INTO MODULEURLMAP (CLIENTID,MODULEID,URLID,createbyid) VALUES (?,?,?,?)";
                                        variables = [clientId,data.moduleId,urlId,data.createbyid]

                                    }
                                    util.logData("sql---------->"+sql2);
                                    con.query(sql2,variables, function (err, result4) {
                                        if (err) {
                                            util.logData(err);
                                            cb(err, null);
                                        } else {
                                            cb(null, true, urlId);
                                        }
                                    });
                                } else {
                                    cb(null, false, "Duplicate data");
                                }
                            }
                        });

                    }
                });
            } else {
                /*******************************************************************************/
                var str = "select id from URLKEY where DeleteFlag = ? and (URLKEY = ? and URL =? ) ";
                con.query(str, [0,data.urlKey,data.url],function (errs, results) {
                    if (errs) {
                        util.logData(errs);
                        callback(errs, null);
                    } else {
                        if (results[0].id > 0) {
                            var clientId = data.clientId;
                            var urlId = results[0].id;
                            var str2 = " select count(*) cnt from MODULEURLMAP where URLID=? and CLIENTID=? AND MODULEID=? and DeleteFlag = ? ";
                            con.query(str2, [urlId,clientId,data.moduleId,0],function (errs2, results2) {
                                if (errs2) {
                                    util.logData(errs2);
                                    cb(errs2, null);
                                } else {
                                    if (results2[0].cnt == 0) {
                                        let variables1;
                                        if (data.type === "update") {
                                            var sql2 = 'update MODULEURLMAP set URLID=? where CLIENTID=? AND MODULEID=? and DeleteFlag = ? '; //check
                                            variables1 = [urlId,clientId,data.moduleId,0];
                                        } else {
                                            var sql2 = "INSERT INTO MODULEURLMAP (CLIENTID,MODULEID,URLID) VALUES (?,?,?)";
                                            variables1 = [clientId,data.moduleId,urlId];
                                        }
                                        con.query(sql2, variables1,function (err, result4) {
                                            if (err) {
                                                util.logData(err);
                                                cb(err, null);
                                            } else {
                                                cb(null, true, urlId);
                                            }
                                        });
                                    } else {
                                        cb(null, false, "Duplicate data");
                                    }
                                }
                            });


                        } else {
                            cb(null, false, "Some error occured");
                        }
                    }
                });
                /*******************************************************************************/
            }
        }
    });
}

function getUrlByClient(data, cb) {
    const val=preventSqlInjection(data);
    data=new UrlCreationEntity(val);
    var str = "select MODULEURLMAP.id,MODULE.MODULENAME as moduleName,URLKEY.URL as url,URLKEY.URLDESCRIPTION as urlDesc,URLKEY.URLKEY as urlKey from MODULEURLMAP INNER JOIN MODULE INNER JOIN URLKEY ON MODULEURLMAP.MODULEID=MODULE.id AND MODULEURLMAP.URLID=URLKEY.id AND MODULEURLMAP.DeleteFlag=0 AND MODULEURLMAP.CLIENTID=" + data.clientId;
    console.log('sql=', str);
    con.query(str, function (err, done) {
        if (err) {
            util.logData(err);
            cb(err, null);
        } else {
            console.log('get data:', done);
            cb(null, true, done);
        }
    })
}

function deleteUrl(data, cb) {
    const val=preventSqlInjection(data);
    data=new UrlCreationEntity(val);
    var sql1 = "select URLID from MODULEURLMAP where id = ?  ;";
    con.query(sql1,[data.id], function (err, result) {
        util.logData("Delete-------------->"+sql1)
        if (err) {
            util.logData(err);
            cb(err, null);
        } else {
            var urlId = result[0].URLID;
            var sql = "Update URLKEY set deleteFlag = ?,delete_by_id = ? ,DeleteDate=NOW() where id =?;";
            sql += "Update MODULEURLMAP set deleteFlag = ?,delete_by_id =?,DeleteDate=NOW() where URLID = ?;";

            console.log('deleteURLSql==============', sql);
            con.query(sql, [1,data.user_id,urlId,1,data.user_id,urlId],function (err, result) {
                console.log('delete URL----------->', sql);
                if (err) {
                    util.logData(err);
                    cb(err, null);
                } else {
                    cb(null, true, result);
                }
            });
        }
    });

}

function editUrlMst(data, cb) {
    const val=preventSqlInjection(data);
    data=new UrlCreationEntity(val);
    console.log('data', data);
    var sql1 = "select URLID from MODULEURLMAP where id = ? ;";
    con.query(sql1, [ data.id],function (err, result) {
        if (err) {
            util.logData(err);
            cb(err, null);
        } else {
            console.log('result=', result);
            var urlId = result[0].URLID;
            var str1 =  'select count(*) cnt from URLKEY where DeleteFlag = 0 and (URL =? and URLKEY =?) and id != ? ';
            console.log('str=', str1);
            con.query(str1,  [data.url,data.urlKey,urlId],function (err1, result1) {
                if (err1) {
                    util.logData('---Error from insertModuleDB inside module.js----');
                    util.logData(err1);
                    cb(err1, null);
                } else {
                    console.log('count=', result1[0]);
                    if (result1[0].cnt === 0) {
                        var sql = "Update URLKEY set URL = ? ," +
                            " URLDESCRIPTION=? , " +
                            " URLKEY=? , " +
                            " modifybyid =? ," +
                            " modifydate=NOW() " +
                            " where id = ?";
                        console.log('sql===========', sql);
                        con.query(sql, [data.url,data.urlDesc,data.urlKey,data.createdBy,urlId],function (err, result) {
                            if (err) {
                                util.logData(err);
                                console.log('ERR=', err);
                                cb(err, null);
                            } else {
                                console.log('result= ', result);
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
    });
}


module.exports.insertUrlKeyDB = insertUrlKeyDB;
module.exports.getUrlByClient = getUrlByClient;
module.exports.deleteUrl = deleteUrl;
module.exports.editUrlMst = editUrlMst;
