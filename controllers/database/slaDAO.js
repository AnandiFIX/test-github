const config = require('./dbConnection');
const con = config.createMysqlConn();
// const logger = require('inspire').logger;
const util = require('../util');
const request = require('superagent');
const SLA_URL = global.gConfig.SLA_URL;
var logger = require('inspire').logger;
var async = require('async');

function getSLAClientWiseDetails(data, cb) {
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
            str = " select a.id, a.ACTIVESLA, a.ENABLE_ESCALATION, a.NAME name, a.DESCRIPTIONS des, " +
                "  e.busi_priority_name priority, d.ATTRVAL ticket, a.RESPONSETIME responseTime, a.RESOLUTIONTIME resolutionTime" +
                " from SLA_client_specific a, CLIENT b, TICKETATTRIBUTES d, BUSINESSPRIORITY e " +
                " where a.CLIENTID = b.id " +
                " and a.TICKETTYPEID = d.id " +
                " and a.busi_priority_id = e.id " +
                " and a.CLIENTID =" + data.clientId + "  and a.supportGroupLevelId is null " +
                " and a.deleteflag = '0' " +
                " and b.DeleteFlag = '0' " +
                " and e.DeleteFlag = '0'" +
                " and a.id > " + offset + " ORDER BY a.id ASC LIMIT " + page_size;
            util.logData('sql=' + str);
        } else if (paginationType == 'prev') {
            str = " select * from (select a.id, a.ACTIVESLA, a.ENABLE_ESCALATION, a.NAME name, a.DESCRIPTIONS des, " +
                "  e.busi_priority_name priority, d.ATTRVAL ticket, a.RESPONSETIME responseTime, a.RESOLUTIONTIME resolutionTime" +
                " from SLA_client_specific a, CLIENT b, TICKETATTRIBUTES d, BUSINESSPRIORITY e " +
                " where a.CLIENTID = b.id " +
                " and a.TICKETTYPEID = d.id " +
                " and a.busi_priority_id = e.id " +
                " and a.CLIENTID =" + data.clientId + "  and a.supportGroupLevelId is null " +
                " and a.deleteflag = '0' " +
                " and b.DeleteFlag = '0' " +
                " and e.DeleteFlag = '0' and a.id < " +
                offset + " ORDER BY a.id DESC LIMIT " + page_size + ")z ORDER BY z.id  ASC;";
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
        var str1 = " select count(*) count " +
            " from SLA_client_specific a, CLIENT b, TICKETATTRIBUTES d, BUSINESSPRIORITY e " +
            " where a.CLIENTID = b.id " +
            " and a.TICKETTYPEID = d.id " +
            " and a.busi_priority_id = e.id " +
            " and a.CLIENTID =" + data.clientId + "  and a.supportGroupLevelId is null " +
            " and a.deleteflag = '0' " +
            " and b.DeleteFlag = '0' " +
            " and e.DeleteFlag = '0'";
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

function deleteSLAClientWiseDetails(data, cb) {
    var data = util.preventSqlInjection(data);
    let sql = "Update SLA_client_specific set deleteflag = '1',delete_by_id = " + data.user_id + ",DeleteDate=NOW() where id = " + data.id + ";";
    con.query(sql, function (err, result) {
        if (err) {
            util.logData('ERROR in deleteSLAClientWiseDetails method inside slaDao');
            util.logData(err);
            cb(err, null);
        } else {
            if (result.affectedRows > 0) {
                cb(null, true, "Deleted successfully");
            } else {
                cb(null, false, "Data is not deleted");
            }
        }
    });
}

function insertSLAClientWiseDetails(data, cb) {
    // if (data.isSameAsClient === 1 && data.group !== '') {
    //     var sql = "Select * from SLA_client_specific  where CLIENTID =" + data.clientId + " and busi_priority_id =" + data.busi_priority_id + " " +
    //         " and TICKETTYPEID =" + data.TICKETTYPEID + " and deleteflag = '0' and supportGroupLevelId is null";
    //     con.query(sql, function (err1, result) {
    //         if (err1) {
    //             util.logData(err1);
    //             cb(err1, null);
    //         } else {
    //             if (result.length > 0) {
    //                 var count = 0;
    //                 for(var i=0; i < result.length; i++) {
    //                     var sql = "INSERT into SLA_client_specific (ENABLE_ESCALATION, NAME, DESCRIPTIONS, CLIENTID, busi_priority_id, TICKETTYPEID, RESPONSETIME, " +
    //                         " RESOLUTIONTIME, createbyid, supportGroupLevelId) values (?,?,?,?,?,?,?,?,?,?) ";
    //                     var param = [result[i].ENABLE_ESCALATION, result[i].NAME, result[i].DESCRIPTIONS, result[i].CLIENTID, result[i].busi_priority_id, result[i].TICKETTYPEID,
    //                         result[i].RESPONSETIME, result[i].RESOLUTIONTIME, data.createdBy, data.supportGroupLevelId];
    //                     con.query(sql, param, function (err,result1) {
    //                         if (err){
    //                             util.logData(err);
    //                         }else {
    //                             count ++;
    //                             if (count === result.length) {
    //                                 cb(null,true,'Record insert successfully');
    //                             }
    //                         }
    //                     });
    //                 }
    //             } else {
    //                 cb(null,false,'This client not have any sla client configaration for ticke type and priority');
    //             }
    //         }
    //     });
    // } else {
    //     let sql1 = "";
    //     let sql = "";
    //     if(data.supportGroupLevelId == ''){
    //         // sql = "Select * from SLA_client_specific  where CLIENTID =" + data.clientId + " and busi_priority_id =" + data.busi_priority_id + " " +
    //         //     " and TICKETTYPEID =" + data.TICKETTYPEID + " and deleteflag = '0' and supportGroupLevelId is null and " +
    //         //     "(NAME = '" + data.name + "' or DESCRIPTIONS = '" + data.des + "') ";
    //         sql = "Select * from SLA_client_specific  where CLIENTID =" + data.clientId + " and busi_priority_id =" + data.busi_priority_id + " " +
    //             " and TICKETTYPEID =" + data.TICKETTYPEID + " and deleteflag = '0' and supportGroupLevelId is null";
    //     }else{
    //         // sql = "Select * from SLA_client_specific  where CLIENTID =" + data.clientId + " and busi_priority_id =" + data.busi_priority_id + " " +
    //         //     " and TICKETTYPEID =" + data.TICKETTYPEID + " and deleteflag = '0' and supportGroupLevelId is not null and" +
    //         //     " (NAME = '" + data.name + "' or DESCRIPTIONS = '" + data.des + "') ";
    //         sql = "Select * from SLA_client_specific  where CLIENTID =" + data.clientId + " and busi_priority_id =" + data.busi_priority_id + " " +
    //             " and TICKETTYPEID =" + data.TICKETTYPEID + " and deleteflag = '0' and supportGroupLevelId is not null";
    //     }
    //     con.query(sql, function (err, result) {
    //         if (err) {
    //             util.logData('ERROR in insertSLAClientWiseDetails method inside slaDao');
    //             util.logData(err);
    //             cb(err, null);
    //         }
    //         else {
    //             if (result.length == 0) {
    //                 if (data.supportGroupLevelId == ''){
    //                     sql1 = "INSERT into SLA_client_specific (ENABLE_ESCALATION, NAME, DESCRIPTIONS, CLIENTID, busi_priority_id, TICKETTYPEID, RESPONSETIME, " +
    //                         " RESOLUTIONTIME, createbyid) values (?,?,?,?,?,?,?,?,?) ";
    //                     var param = [data.enable_escalation, data.name, data.des, data.clientId, data.busi_priority_id, data.TICKETTYPEID,
    //                         data.responseTime, data.resolutionTime, data.createdBy];
    //                 } else {
    //                     sql1 = "INSERT into SLA_client_specific (ENABLE_ESCALATION, NAME, DESCRIPTIONS, CLIENTID, busi_priority_id, TICKETTYPEID, RESPONSETIME, " +
    //                         " RESOLUTIONTIME, createbyid, supportGroupLevelId) values (?,?,?,?,?,?,?,?,?,?) ";
    //                     var param = [data.enable_escalation, data.name, data.des, data.clientId, data.busi_priority_id, data.TICKETTYPEID,
    //                         data.responseTime, data.resolutionTime, data.createdBy, data.supportGroupLevelId];
    //                 }
    //                 con.query(sql1, param, function (err1, result1) {
    //                     if (err1) {
    //                         util.logData('ERROR in insertSLAClientWiseDetails method inside slaDao');
    //                         util.logData(err1);
    //                         cb(err1, null);
    //                     }
    //                     else {
    //                         cb(null,true,result1.insertId)
    //                     }
    //                 });
    //             } else {
    //                 cb(null, false, "Duplicate Records");
    //             }
    //         }
    //     });
    // }

    if (data.supportGroupLevelId === '') {
        let sql = "Select * from SLA_client_specific  where CLIENTID =? and busi_priority_id =? " +
            " and TICKETTYPEID =? and deleteflag = '0' and supportGroupLevelId is null";
        con.query(sql, [data.clientId, data.busi_priority_id, data.TICKETTYPEID], function (err, result) {
            if (err) {
                util.logData('ERROR in insertSLAClientWiseDetails method inside slaDao');
                util.logData(err);
                cb(err, null);
            } else {
                if (result.length === 0) {
                    let sql1 = "INSERT into SLA_client_specific (ENABLE_ESCALATION, NAME, DESCRIPTIONS, CLIENTID, busi_priority_id, TICKETTYPEID, RESPONSETIME, " +
                        " RESOLUTIONTIME, createbyid) values (?,?,?,?,?,?,?,?,?) ";
                    var param = [data.enable_escalation, data.name, data.des, data.clientId, data.busi_priority_id, data.TICKETTYPEID,
                        data.responseTime, data.resolutionTime, data.createdBy];
                    con.query(sql1, param, function (err1, result1) {
                        if (err1) {
                            util.logData('ERROR in insertSLAClientWiseDetails method inside slaDao');
                            util.logData(err1);
                            cb(err1, null);
                        } else {
                            cb(null, true, result1.insertId)
                        }
                    });
                } else {
                    cb(null, false, "Duplicate Records");
                }
            }
        });
    } else {
        const supportIds = data.supportGroupLevelId.split(',');
        let sql = "Select * from SLA_client_specific  where CLIENTID =? and busi_priority_id =? " +
            " and TICKETTYPEID =? and deleteflag = '0' and supportGroupLevelId is not null";
        con.query(sql, [data.clientId, data.busi_priority_id, data.TICKETTYPEID], function (err, result) {
            if (err) {
                util.logData('ERROR in insertSLAClientWiseDetails method inside slaDao');
                util.logData(err);
                cb(err, null);
            } else {
                if (result.length === 0) {
                    let sql1 = "INSERT into SLA_client_specific (ENABLE_ESCALATION, NAME, DESCRIPTIONS, CLIENTID, busi_priority_id, TICKETTYPEID, RESPONSETIME, " +
                        " RESOLUTIONTIME, createbyid, supportGroupLevelId) values (?,?,?,?,?,?,?,?,?,?) ";
                    var param = [data.enable_escalation, data.name, data.des, data.clientId, data.busi_priority_id, data.TICKETTYPEID,
                        data.responseTime, data.resolutionTime, data.createdBy, "," + data.supportGroupLevelId + ","];
                    con.query(sql1, param, function (err1, result1) {
                        if (err1) {
                            util.logData('ERROR in insertSLAClientWiseDetails method inside slaDao');
                            util.logData(err1);
                            cb(err1, null);
                        } else {
                            cb(null, true, result1.insertId)
                        }
                    });
                } else {
                    // cb(null, false, "Duplicate Records");
                    // console.log(result[0].supportGroupLevelId)
                    let ids=",";
                    let prevgroupId = result[0].supportGroupLevelId;
                    prevgroupId = prevgroupId.substring(1, prevgroupId.length - 1);
                    // console.log(prevgroupId)
                    let groupIds = prevgroupId.split(',');
                    for (let i = 0; i < supportIds.length; i++) {
                        let matched = false;
                        for (let j = 0; j < groupIds.length; j++) {
                            if (supportIds[i] === groupIds[j]) {
                                matched = true;
                                break;
                            }
                        }
                        if(!matched){
                            ids=ids+supportIds[i]+",";
                        }
                    }
                    let finalIds=ids+prevgroupId+',';
                    console.log(finalIds,result[0].id);
                    let sql1='update SLA_client_specific set supportGroupLevelId=? where id=?';

                    con.query(sql1, [finalIds,result[0].id], function (err1, result1) {
                        if (err1) {
                            util.logData('ERROR in insertSLAClientWiseDetails method inside slaDao');
                            util.logData(err1);
                            cb(err1, null);
                        } else {
                            console.log(result1);
                            cb(null, true, result[0].id)
                        }
                    });
                }
            }
        });

    }
}

function updateSLAClientWiseDetails(data, cb) {
    //var data = util.preventSqlInjection(data);
    util.logData('data=' + JSON.stringify(data));
    var sql = "Select * from SLA_client_specific  where deleteflag = '0' and ( NAME = '" + data.name + "'" +
        "  or DESCRIPTIONS = '" + data.des + "') and id = " + data.id;
    util.logData("----------------CAT------->" + sql)
    con.query(sql, function (err, result) {
        if (err) {
            util.logData('ERROR in updateSLAClientWiseDetails method inside slaDao');
            util.logData(err);
            cb(err, null);
        } else {
            if (result.length == 1) {
                var sql1 = "Update SLA_client_specific set " +
                    " NAME = '" + data.name + "', DESCRIPTIONS = '" + data.des + "', " +
                    " RESPONSETIME = " + data.responseTime + ", RESOLUTIONTIME =" + data.resolutionTime + "," +
                    " modifiybyid = " + data.user_id + ",modifiydate=NOW() where id = " + data.id + " ";
                con.query(sql1, function (err1, result1) {
                    if (err1) {
                        util.logData('ERROR in updateSLAClientWiseDetails method inside slaDao');
                        util.logData(err1);
                        cb(err1, null);
                    } else {
                        if (result1.affectedRows > 0) {
                            cb(null, true, result1.affectedRows);
                        } else {
                            cb(null, false, result1.affectedRows);
                        }

                    }
                });
            } else {
                cb(null, false, "Duplicate Records");
            }
        }
    });
}


function updateStopSlaDtlsTicketWise(data, cb) {
    logData('updateStopSlaDtlsTicketWise----------' + JSON.stringify(data))
    // var sql = "Update ticket_sla_response_dtls set resolution_stop_status = 'Y', resolution_stop_datetime = Now(), sla_resolution_period = "+data.slaResPrd+" " +
    //     " ,resolution_stop_by_id = "+data.user_id+", deleteflag = '1' where ticketId = "+data.id+" and resolution_stop_status = 'N' ";
    // //  "  where ticketId = "+data.id+" and resolution_stop_status = 'N' ";
    var sql1 = "SELECT MAX(id) maxid FROM ticket_sla_response_dtls where ticketId = " + data.id + " and deleteflag = '0'";
    con.query(sql1, function (err, result1) {
        if (err) {
            logData(err);
            cb(err, null);
        } else {
            if (result1.length > 0) {
                var sql = "Update ticket_sla_response_dtls set resolution_stop_status = 'Y', resolution_stop_datetime = Now(), sla_resolution_period = " + data.slaResPrd + " " +
                    " ,resolution_stop_by_id = " + data.user_id + " where id = " + result1[0].maxid + " and ticketId = " + data.id + " and deleteflag = '0' ";
                //  "  where ticketId = "+data.id+" and resolution_stop_status = 'N' ";
                logData('updateStopSlaDtlsTicketWise------------------------------------' + sql);
                con.query(sql, function (err, result) {
                    if (err) {
                        logData(err);
                        cb(err, null);
                    } else {

                        // optimizedreport table starts
                        console.log("@@@@@@@@@@@@$$$$$$$123456");
                        var sql1 = " select a.id,(select count(distinct response_stop_datetime) from ticket_sla_response_dtls where ticketId =? ) resolution_Count,(select id from optimizedreport where ticket_id =?) id, if(resolution_datetime> COALESCE (resolution_stop_datetime,Now()),'No','Yes') Resolution_sla_violated,"
                            // +"COALESCE(date_format(ADDTIME(COALESCE(a.response_stop_datetime, ''),'5:30:0.000000'),'%d-%M-%Y %T'),'')  response_stop_datetime,"
                            +"coalesce(replace(group_concat(concat(date_format (ADDTIME(resolution_stop_datetime, '5:30:0.000000'),'%d-%M-%Y %T'),'@')),',','\n'),'') multiple_response_stop_datetime "
                            +" FROM ticket_sla_response_dtls a left join USER b on a.resolution_stop_by_id = b.id left join USER c on a.response_stop_by_id = c.id where ticketId = ? and a.deleteflag = '0' group by a.id;"
                            logData("@#$R"+sql1)
                         con.query(sql1,[data.id,data.id,data.id], function(err,result1){
                            if(err){
                                logData("Q@Q#EW$RTDGF"+sql1);
                                console.log("QWESDFC",err);
                                cb(err,null);
                            }else{
                                console.log("@#$",result1);
                                var sql2 = "update optimizedreport set response_count=?,resolution_sla_voilated =?,"
                                +"all_resolution_sla_due_dt =?  where id =?"
                                con.query(sql2,[result1[0].resolution_Count,result1[0].Resolution_sla_violated,result1[0].multiple_response_stop_datetime,result1[0].id], function(err,result2){
                                 if(err){
                                    cb(err,null);
                                 }else{
                                    console.log("@@@@@@@@@@@@3245$$$$$$$",sql2);
                                    console.log("@#$%^&",result2);
                                 }
                                })

                          }
                         });

                        //  optimizedreport table ends


                        if (result.affectedRows > 0) {
                            updateSlaStopinAllTable(data, function (errC, successC, detailsC) {
                                if (errC) {
                                    logData(err);
                                    cb(err, null);
                                } else {
                                    if (successC) {
                                        cb(null, true, detailsC);
                                    } else {
                                        cb(null, false, detailsC);
                                    }
                                }
                            });
                        } else {
                            cb(null, false, "Somme error occured");
                        }
                    }
                });
            }
        }
    });
}

function updateforSlaResponseTicketWise(data, cb) {
    var sql1 = "SELECT MAX(id) maxid FROM `ticket_sla_response_dtls` where ticketId = " + data.id + " and deleteflag = '0'";
    con.query(sql1, function (err, result1) {
        if (err) {
            logData(err);
            cb(err, null);
        } else {
            if (result1.length > 0) {
                var sql = "Update ticket_sla_response_dtls set response_stop_status = 'Y', response_stop_datetime = Now(), " +
                    " sla_response_period = " + data.slaResPrd + " ,response_stop_by_id = " + data.user_id + " " +
                    //  " ,resolution_stop_by_id = "+data.user_id+" where ticketId = "+data.id+" and resolution_stop_status = 'N' ";
                    "  where id =" + result1[0].maxid + " and ticketId = " + data.id + " and deleteflag = '0'";

                logData('updateStopSlaDtlsTicketWise------------------------------------' + sql);
                con.query(sql, function (err, result) {
                    if (err) {
                        logData(err);
                        cb(err, null);
                    } else {

                         // optimizedreport table starts
                         console.log("@@@@@@@@@1ww23456@@@$$$$$$$",sql);
                         var sql1 = " select (select count(distinct response_stop_datetime) from ticket_sla_response_dtls where ticketId =? ) response_Count,(select id from optimizedreport where ticket_id =?) id,if((TIMESTAMPDIFF(MINUTE,response_datetime,COALESCE (create_date,response_stop_datetime)))<0,'No','Yes') resolution_sla_violated,"
                                   +"if((TIMESTAMPDIFF(MINUTE,response_datetime,COALESCE (create_date,resolution_stop_datetime)))<0,'No','Yes') response_sla_violated,a.response_stop_status,a.resolution_stop_status,"
                                   +"coalesce(replace(group_concat(concat(date_format (ADDTIME(response_datetime, '5:30:0.000000'),'%d-%M-%Y %T'),'@')),',','\n'),'') multiple_response_stop_datetime_dt,"
                                   +"coalesce(date_format (max(response_stop_datetime),'%d-%M-%Y %T'),'')  maxResponse_stop_datetime,"
                                   +"COALESCE(date_format(ADDTIME(COALESCE(a.response_stop_datetime, ''),'5:30:0.000000'),'%d-%M-%Y %T'),'')  response_stop_datetime,"
                                   +"coalesce(replace(group_concat(concat(date_format (ADDTIME(response_stop_datetime, '5:30:0.000000'),'%d-%M-%Y %T'),'@')),',','\n'),'') multiple_response_stop_datetime  "
                                   +"FROM ticket_sla_response_dtls a left join USER b on a.resolution_stop_by_id = b.id left join USER c on a.response_stop_by_id = c.id where ticketId = ? and a.deleteflag = '0' group by a.id;"
                             logData("FFFFFFFFFFFF"+sql1);
                                   con.query(sql1,[data.id,data.id,data.id],function(err,result1){
                                  if(err){
                                   console.log(err);
                                    cb(err,null);
                                  }else{
                                  console.log("@#$",result1);
                                 var sql2 = "update optimizedreport set first_response_dt = Now(),first_response_sla_due_dt=?,all_response_sla_due_dt=?,all_response_time=?,resolution_sla_voilated =?,response_sla_clock_status =?"
                                           +" ,resolution_sla_clock_status =?,response_count =?,first_response_time=?,response_sla_voilated=?,all_response_dt=?,"
                                           +"effort_spent='00:00:00',effort_spent_map='0',response_sla_slippage_time='00:00:00',resolution_sla_slippage_time='00:00:00',sla_clock_idle_time='00:00:00',sla_clock_idle_time_map='0' where id =? "
                                           logData("FFFFFFFFFFFF"+sql2);
                                           con.query(sql2,[result1[0].maxResponse_stop_datetime,result1[0].maxResponse_stop_datetime,result1[0].multiple_response_stop_datetime,result1[0].resolution_sla_violated,result1[0].response_stop_status,result1[0].resolution_stop_status,result1[0].response_Count,result1[0].response_stop_datetime,result1[0].response_sla_violated,result1[0].multiple_response_stop_datetime,result1[0].id], function(err,result2){
                                            if(err){
                                               console.log(err);
                                               cb(err,null);
                                             }else{
                                                 console.log("@#$%^&",result2);
                                             }
                                           })
                                  }
                               });
 
                             //   optimizedreport table ends
 

                        if (result.affectedRows > 0) {
                            cb(null, true, "ok");
                        } else {
                            cb(null, false, "Somme error occured");
                        }
                    }
                });
            }
        }
    });
}

// function updateforSlaResponseTicketWise(data, cb) {
//
//     var sql1 = "SELECT ticketId, MAX(id) maxid FROM ticket_sla_response_dtls where ticketId = " + data.id + " and deleteflag = '0' group by ticketId ";
//     con.query(sql1, function (err, result1) {
//         if (err) {
//             logData(err);
//             cb(err, null);
//         } else {
//             if (result1.length > 0) {
//                 var sql = "Update ticket_sla_response_dtls set response_stop_status = 'Y', response_stop_datetime = Now(), " +
//                     " sla_response_period = "+data.slaResPrd+" ,response_stop_by_id = "+data.user_id+" " +
//                     //  " ,resolution_stop_by_id = "+data.user_id+" where ticketId = "+data.id+" and resolution_stop_status = 'N' ";
//                     "  where id =" + result1[0].maxid + " and ticketId = " + data.id + " and deleteflag = '0' and response_stop_status = 'N' ";
//
//                 logData('updateStopSlaDtlsTicketWise------------------------------------'+sql);
//                 con.query(sql, function (err, result) {
//                     if (err) {
//                         logData(err);
//                         cb(err, null);
//                     }
//                     else {
//                         cb(null, true, "ok");
//                         /*if (result.affectedRows>0) {
//                             cb(null, true, "ok");
//                         } else {
//                             cb(null, false, "Somme error occured");
//                         }*/
//                     }
//                 });
//             }
//         }
//     });
// }

function updateSlaStopinAllTable_old(data, cb) {
    var sql = "Update ticket set is_sla_stop = 'Y', last_sla_stop_date = Now() where id = " + data.id + "";
    logData('updateSlaStopinAllTable-------------------sql----------------------' + sql)
    con.query(sql, function (err, result) {
        if (err) {
            logData(err);
            cb(err, null);
        } else {
            if (result.affectedRows > 0) {
                var sql1 = "select coalesce(max(id), 0) id from WFCCLIENTRESULT where PKFIELDVAL = " + data.id + " ";
                con.query(sql1, function (err1, result1) {
                    if (err1) {
                        logData(err1);
                        cb(err1, null);
                    } else {
                        if (result1[0].id > 0) {
                            // var sql2 = "Update WFCCLIENTRESULT set sla_end_date = Now(),sla_time_for_indivitual="+data.slaResPrd+" where id = "+result1[0].id+" and activeFlow = '1' and is_deactive_for_reopen = '0' ";
                            var sql2 = "Update WFCCLIENTRESULT set sla_end_date = Now() where id = " + result1[0].id + " and activeFlow = '1' and is_deactive_for_reopen = '0' ";
                            con.query(sql2, function (err2, result2) {
                                if (err2) {
                                    logData(err2);
                                    cb(err2, null);
                                } else {
                                    if (result2.affectedRows > 0) {
                                        var sql2 = "Update ticket_sla_startstop_logs set sla_stop_datetime = Now(), sla_stop_WFCClientResultId = " + result1[0].id + " " +
                                            " where ticket_id = " + data.id + " ";
                                        logData('bbbbbbbbbbbb---------------------sql2-----------' + sql2);
                                        con.query(sql2, function (err2, result2) {
                                            if (err2) {
                                                logData(err2);
                                                cb(err2, null);
                                            } else {
                                                logData('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb-----------------' + result2.affectedRows)
                                                logData('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb-----reqType------------' + data.reqType)
                                                if (result2.affectedRows > 0) {
                                                    if (data.reqType === 'category' || data.reqType === 'supportGrpWise') {
                                                        var sqlT = "Update ticket set is_sla_stop = 'N' , sla_calculation_start_time = Now() where id = " + data.id + "";
                                                        logData('updateSlaStopinAllTable-------------------sql----------------------' + sqlT)
                                                        con.query(sqlT, function (errT, resultT) {
                                                            if (errT) {
                                                                logData(errT);
                                                                cb(errT, null);
                                                            } else {
                                                                /*******************************************************/
                                                                let sqlNwSla = "insert into ticket_sla_calculation (clientid,ticketid,createbyid) values(?,?,?) ";
                                                                con.query(sqlNwSla, [data.clientId, data.id, data.user_id], function (errNwSla, resultNwSla) {
                                                                    if (errNwSla) {
                                                                        logData(errNwSla);
                                                                        cb(errNwSla, null);
                                                                    } else {
                                                                        logData('****************ticket_sla_calcultion*************************')
                                                                    }
                                                                });
                                                                /*******************************************************/
                                                                request
                                                                    .get(SLA_URL + '/slaCalculationWithDue')
                                                                    .query({
                                                                        ticketId: data.id,
                                                                        reqType: data.reqType,
                                                                        clientId: data.clientId
                                                                    }) // query string
                                                                    .end((err, resp) => {
                                                                        if (err) {
                                                                            logData(err);
                                                                        } else {
                                                                            logData(JSON.stringify(resp));
                                                                        }
                                                                        // Do something
                                                                    });

                                                                cb(null, true, result);
                                                            }
                                                        })

                                                    } else {
                                                        cb(null, true, result);
                                                    }


                                                } else {
                                                    cb(null, false, "error1");
                                                }
                                            }
                                        });
                                    } else {
                                        cb(null, false, "error1");
                                    }
                                }
                            });
                        } else {
                            cb(null, false, "error");
                        }
                    }
                });
            } else {
                cb(null, false, "Somme error occured");
            }
        }
    });
}

function updateSlaStopinAllTable(data, cb) {
    var sql = "Update ticket set is_sla_stop = 'Y', last_sla_stop_date = Now() where id = " + data.id + "";
    logData('updateSlaStopinAllTable-------------------sql----------------------' + sql)
    con.query(sql, function (err, result) {
        if (err) {
            logData(err);
            cb(err, null);
        } else {
            if (result.affectedRows > 0) {
                var sql1 = "select coalesce(max(id), 0) id from WFCCLIENTRESULT where PKFIELDVAL = " + data.id + " ";
                con.query(sql1, function (err1, result1) {
                    if (err1) {
                        logData(err1);
                        cb(err1, null);
                    } else {
                        if (result1[0].id > 0) {
                            // var sql2 = "Update WFCCLIENTRESULT set sla_end_date = Now(),sla_time_for_indivitual="+data.slaResPrd+" where id = "+result1[0].id+" and activeFlow = '1' and is_deactive_for_reopen = '0' ";
                            var sql2 = "Update WFCCLIENTRESULT set sla_end_date = Now() where id = " + result1[0].id + " and activeFlow = '1' and is_deactive_for_reopen = '0' ";
                            con.query(sql2, function (err2, result2) {
                                if (err2) {
                                    logData(err2);
                                    cb(err2, null);
                                } else {
                                    if (result2.affectedRows > 0) {
                                        var sql2 = "Update ticket_sla_startstop_logs set sla_stop_datetime = Now(), sla_stop_WFCClientResultId = " + result1[0].id + " " +
                                            " where ticket_id = " + data.id + " ";
                                        logData('bbbbbbbbbbbb---------------------sql2-----------' + sql2);
                                        con.query(sql2, function (err2, result2) {
                                            if (err2) {
                                                logData(err2);
                                                cb(err2, null);
                                            } else {
                                                logData('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb-----------------' + result2.affectedRows)
                                                logData('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb-----reqType------------' + data.reqType)
                                                if (result2.affectedRows > 0) {
                                                    if (data.reqType === 'category' || data.reqType === 'supportGrpWise') {
                                                        var sqlT = "Update ticket set is_sla_stop = 'N' , sla_calculation_start_time = Now() where id = " + data.id + "";
                                                        logData('updateSlaStopinAllTable-------------------sql----------------------' + sqlT)
                                                        con.query(sqlT, function (errT, resultT) {
                                                            if (errT) {
                                                                logData(errT);
                                                                cb(errT, null);
                                                            } else {
                                                                /*******************************************************/
                                                                let sqlNwSla = "insert into ticket_sla_calculation (clientid,ticketid,createbyid) values(?,?,?) ";
                                                                con.query(sqlNwSla, [data.clientId, data.id, data.user_id], function (errNwSla, resultNwSla) {
                                                                    if (errNwSla) {
                                                                        logData(errNwSla);
                                                                        cb(errNwSla, null);
                                                                    } else {
                                                                        logData('****************ticket_sla_calcultion*************************')
                                                                    }
                                                                });
                                                                /*******************************************************/
                                                                request
                                                                    .get(SLA_URL + '/slaCalculationWithDue')
                                                                    .query({
                                                                        ticketId: data.id,
                                                                        reqType: data.reqType,
                                                                        clientId: data.clientId
                                                                    }) // query string
                                                                    .end((err, resp) => {
                                                                        if (err) {
                                                                            logData(err);
                                                                            cb(null, true, result);
                                                                        } else {
                                                                            logData(JSON.stringify(resp));
                                                                            cb(null, true, result);
                                                                        }
                                                                        // Do something
                                                                    });


                                                            }
                                                        })

                                                    } else {
                                                        cb(null, true, result);
                                                    }


                                                } else {
                                                    cb(null, false, "error1");
                                                }
                                            }
                                        });
                                    } else {
                                        cb(null, false, "error1");
                                    }
                                }
                            });
                        } else {
                            cb(null, false, "error");
                        }
                    }
                });
            } else {
                cb(null, false, "Somme error occured");
            }
        }
    });
}

function updateSlaStartinAllTable(data, cb) {
    var sql = "Update ticket_sla_response_dtls set response_stop_status = 'Y', response_stop_datetime = Now(), sla_response_period = " + data.slaResPrd + ", " +
        " stop_by_id = " + data.user_id + " where ticketId = " + data.ticketId + " and resolution_stop_status = 'N'  and deleteflag = '0' ss";
    con.query(sql, function (err, result) {
        if (err) {
            logData(err);
            cb(err, null);
        } else {
               // optimizedreport table starts
               console.log("@@@@@@@23456@@@@@jkl;$$$$$$$",sql1);
               var sql1 = " select (select count(distinct response_stop_datetime) from ticket_sla_response_dtls where ticketId =?) resolution_Count,(select id from optimizedreport where ticket_id =?) id,if((TIMESTAMPDIFF(MINUTE,response_datetime,COALESCE (create_date,response_stop_datetime)))<0,'No','Yes') resolution_sla_violated,"
               +"if((TIMESTAMPDIFF(MINUTE,response_datetime,COALESCE (create_date,resolution_stop_datetime)))<0,'No','Yes') response_sla_violated,a.response_stop_status,a.resolution_stop_status,"
               +"coalesce(replace(group_concat(concat(date_format (response_datetime,'%d-%M-%Y %T'),'@')),',','\n'),'') multiple_response_stop_datetime_dt,"
               +"coalesce(date_format (max(response_stop_datetime),'%d-%M-%Y %T'),'')  maxResponse_stop_datetime,"
               +"COALESCE(date_format(ADDTIME(COALESCE(a.response_stop_datetime, ''),'5:30:0.000000'),'%d-%M-%Y %T'),'')  response_stop_datetime,"
               +"coalesce(replace(group_concat(concat(date_format (ADDTIME(response_stop_datetime, '5:30:0.000000'),'%d-%M-%Y %T'),'@')),',','\n'),'') multiple_response_stop_datetime "
               +"FROM ticket_sla_response_dtls a left join USER b on a.resolution_stop_by_id = b.id left join USER c on a.response_stop_by_id = c.id where ticketId =? and a.deleteflag = '0';"
               con.query(sql1,[data.ticketId,data.ticketId,data.ticketId], function(err,result1){
                  if(err){
                      cb(err,null);
                  }else{
                      console.log("@#$",result1);
                      var sql2 = "update optimizedreport set first_response_dt = Now(),all_response_dt=?,all_response_time=?,first_response_time =?,first_response_dt =?,resolution_sla_voilated =?,response_sla_clock_status=?,resolution_sla_clock_status=?,"
                      +"first_response_sla_due_dt=?,all_response_sla_due_dt=?,response_count =?,response_sla_voilated=?,"
                      +"effort_spent='00:00:00',effort_spent_map='0',response_sla_slippage_time='00:00:00',resolution_sla_slippage_time='00:00:00',sla_clock_idle_time='00:00:00',sla_clock_idle_time_map='0'  where id =?"
                      con.query(sql2,[result1[0].multiple_response_stop_datetime,result1[0].multiple_response_stop_datetime,result1[0].response_stop_datetime,result[0].response_stop_datetime,result1[0].resolution_sla_violated,result1[0].response_stop_status,result1[0].resolution_stop_status,result1[0].maxResponse_stop_datetime,result1[0].multiple_response_stop_datetime_dt,result1[0].resolution_Count,result1[0].response_sla_violated,result1[0].id], function(err,result2){
                       if(err){
                          cb(err,null);
                       }else{
                          console.log("@#$%^&",result2);
                       }
                      })
                  }
               });
   
               // optimizedreport table ends
               
            if (result.length > 0) {
                cb(null, true, result);
            } else {
                cb(null, true, []);
            }
        }
    });
}

/*function callStopSlaDtlsTicketWise(data, cb) {
    request
        .get(SLA_URL + '/getSalResolutionPeriod')
        .query({ticketId: data.id}) // query string
        .end((err, resp) => {
            if (err) {
                logData(err);
            } else {
                logData('aaaaaaaaa---------------------------' + JSON.stringify(resp));
                logData('aaaaaaaaa---------------------------' + JSON.stringify(resp.text));
                logData('aaaaaaaaa---------------------------' + JSON.stringify(JSON.parse(resp.text)));
                logData('aaaaaaaaa---------------------------' + JSON.stringify(JSON.parse(resp.text).resVal));
                logData('aaaaaaaaa---------------------------' + JSON.stringify(JSON.parse(resp.text).resVal));
                logData('aaaaaaaaa---------------------------' + JSON.parse(resp.text).resVal.slaResponsePeriod);
                let x = JSON.parse(resp.text).resVal.slaResponsePeriod;
                updateStopSlaDtlsTicketWise({"slaResPrd":x,"id":data.id,"user_id":data.user_id}, function (errC, successC, detailsC) {
                    if(errC){
                        logData(err);
                        cb(err, null);
                    }else{
                        if(successC){
                            cb(null, true, detailsC);
                        }else{
                            cb(null, false, detailsC);
                        }
                    }
                });
            }
    });
}*/
function callStartSlaDtlsTicketWise(data, cb) {
    request
        .get(SLA_URL + '/getSalResolutionPeriod')
        .query({ticketId: data.id}) // query string
        .end((err, resp) => {
            if (err) {
                logData(err);
            } else {
                logData('aaaaaaaaa---------------------------' + JSON.stringify(resp));
                logData('aaaaaaaaa---------------------------' + JSON.stringify(resp.text));
                logData('aaaaaaaaa---------------------------' + JSON.stringify(JSON.parse(resp.text)));
                logData('aaaaaaaaa---------------------------' + JSON.stringify(JSON.parse(resp.text).resVal));
                logData('aaaaaaaaa---------------------------' + JSON.stringify(JSON.parse(resp.text).resVal));
                logData('aaaaaaaaa---------------------------' + JSON.parse(resp.text).resVal.slaResponsePeriod);
                let x = JSON.parse(resp.text).resVal.slaResponsePeriod;
                updateSlaStartinAllTable({
                    "slaResPrd": x,
                    "id": data.id,
                    "user_id": data.user_id
                }, function (errC, successC, detailsC) {
                    if (errC) {
                        logData(err);
                        cb(err, null);
                    } else {
                        if (successC) {
                            cb(null, true, detailsC);
                        } else {
                            cb(null, false, detailsC);
                        }
                    }
                });
            }
        });
}

function logData(data) {
    console.log(data);
    logger.log(data);
}

function getSLAClientWiseDetailsBySupGrp(data, cb) {
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
            str = "select a.id, a.ACTIVESLA, a.ENABLE_ESCALATION, " +
                "a.NAME name, a.DESCRIPTIONS des, e.busi_priority_name priority, " +
                "d.ATTRVAL ticket, a.RESPONSETIME responseTime, a.RESOLUTIONTIME " +
                "resolutionTime , x.supportGrp from SLA_client_specific a, CLIENT b, " +
                "TICKETATTRIBUTES d, BUSINESSPRIORITY e ,(SELECT i.id ,  GROUP_CONCAT(c.LEVELLONGDESC) " +
                "supportGrp FROM SLA_client_specific i, SUPPORTGROUPLEVEL c WHERE FIND_IN_SET(c.id , " +
                "i.supportGroupLevelId) GROUP BY i.id) x where a.CLIENTID = b.id and a.TICKETTYPEID = d.id " +
                "and a.busi_priority_id = e.id and a.CLIENTID = " + data.clientId + " and a.deleteflag = '0' and b.DeleteFlag = '0' " +
                "and e.DeleteFlag = '0' and a.id = x.id and a.id > 0 ORDER BY a.id ASC LIMIT  " + page_size + ""
            util.logData('sql=' + str);
        } else if (paginationType == 'prev') {
            str = " select * from (" +
                "select a.id, a.ACTIVESLA, a.ENABLE_ESCALATION, " +
                "a.NAME name, a.DESCRIPTIONS des, e.busi_priority_name priority, " +
                "d.ATTRVAL ticket, a.RESPONSETIME responseTime, a.RESOLUTIONTIME " +
                "resolutionTime , x.supportGrp from SLA_client_specific a, CLIENT b, " +
                "TICKETATTRIBUTES d, BUSINESSPRIORITY e ,(SELECT i.id ,  GROUP_CONCAT(c.LEVELLONGDESC) " +
                "supportGrp FROM SLA_client_specific i, SUPPORTGROUPLEVEL c WHERE FIND_IN_SET(c.id , " +
                "i.supportGroupLevelId) GROUP BY i.id) x where a.CLIENTID = b.id and a.TICKETTYPEID = d.id " +
                "and a.busi_priority_id = e.id and a.CLIENTID = " + data.clientId + " and a.deleteflag = '0' and b.DeleteFlag = '0' " +
                "and e.DeleteFlag = '0' and a.id = x.id and a.id < 0 ORDER BY a.id desc LIMIT  " + page_size + "" +
                ")z ORDER BY z.id  ASC;";
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
        var str1 = " select count(*) count " +
            " from SLA_client_specific a, CLIENT b, TICKETATTRIBUTES d, BUSINESSPRIORITY e ,(SELECT i.id ,  GROUP_CONCAT(c.LEVELLONGDESC) supportGrp FROM SLA_client_specific i, SUPPORTGROUPLEVEL c WHERE FIND_IN_SET(c.id ,i.supportGroupLevelId) GROUP BY i.id) x" +
            " where a.CLIENTID = b.id " +
            " and a.TICKETTYPEID = d.id " +
            " and a.busi_priority_id = e.id " +
            " and a.CLIENTID =" + data.clientId + " " +
            " and a.deleteflag = '0' " +
            " and b.DeleteFlag = '0' " +
            " and e.DeleteFlag = '0' and a.supportGroupLevelId is not null" +
            " and a.id = x.id" +
            " and a.id > 0";
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

function getClientWiseSlaClient(data, cb) {
    var sql = "Select NAME, DESCRIPTIONS, RESPONSETIME, RESOLUTIONTIME, supportGroupLevelId from SLA_client_specific  where CLIENTID =" + data.clientId + " and busi_priority_id =" + data.busi_priority_id + " " +
        " and TICKETTYPEID =" + data.TICKETTYPEID + " and deleteflag = '0' and supportGroupLevelId is null";
    con.query(sql, function (err, result) {
        if (err) {
            util.logData(err);
            cb(err, null);
        } else {
            util.logData(result);
            cb(null, true, result);
        }
    });
}

module.exports.getClientWiseSlaClient = getClientWiseSlaClient;
module.exports.getSLAClientWiseDetailsBySupGrp = getSLAClientWiseDetailsBySupGrp;
module.exports.updateforSlaResponseTicketWise = updateforSlaResponseTicketWise;
module.exports.callStartSlaDtlsTicketWise = callStartSlaDtlsTicketWise;
module.exports.updateStopSlaDtlsTicketWise = updateStopSlaDtlsTicketWise;
//module.exports.callStopSlaDtlsTicketWise = callStopSlaDtlsTicketWise;
module.exports.getSLAClientWiseDetails = getSLAClientWiseDetails;
module.exports.deleteSLAClientWiseDetails = deleteSLAClientWiseDetails;
module.exports.insertSLAClientWiseDetails = insertSLAClientWiseDetails;
module.exports.updateSLAClientWiseDetails = updateSLAClientWiseDetails;

