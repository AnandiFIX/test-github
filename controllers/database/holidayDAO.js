var config = require('./config');
var dbConn = require('./dbConnection');
var con = dbConn.createMysqlConn();
// const logger = require('inspire').logger;
const SLA_URL = global.gConfig.SLA_URL;
const util=require('../util');
const request = require('superagent');
var async = require('async');



function updateHoliday(data, cb) {
    var sql = "update holiDaysListMst set holiday_desc= '"+data.holiday_desc+"' ,modifybyid = " + data.user_id + ", modifydate = Now() where id = " + data.id + " ";
    util.logData('aa----------'+sql);
    con.query(sql, function (err, details) {
        if (err) {
            util.logData(err);
            cb(err, null);
        } else {
            if (details.affectedRows > 0) {
                cb(null, true, details.affectedRows);
            } else {
                cb(null, false, 'error occured');
            }
        }
    })

}

function getHoliday(data,cb) {
    var page_size = data.page_size;
    var paginationType = data.paginationType;
    var offset = data.nextOffset;
    var funcArr = {};
    var str = "";

    if(offset == "0") {
        funcArr = {dataObj , totalData};
    } else {
        funcArr = {dataObj};
    }
    async.parallel(funcArr,
        function(err, results) {
            if(err) {
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
            str = "select id,concat(holyday,'') holyday, CASE WHEN holidaytype IN ('F') THEN true" +
                " ELSE false END AS holidaytype, holidaystarttime, holiday_desc " +
                " from holiDaysListMst where clientid = " + data.clientId + " and deleteflag = '0' and supportGroupLevelId is  null " +
                " and id > " + offset + " ORDER BY id ASC LIMIT " + page_size;
            util.logData('sql=' + str);
        } else if (paginationType == 'prev') {
            str = " select * from (select id,concat(holyday,'') holyday, CASE WHEN holidaytype IN ('F') THEN true" +
                " ELSE false END AS holidaytype, holidaystarttime, holiday_desc " +
                " from holiDaysListMst where clientid = " + data.clientId + " and deleteflag = '0' and supportGroupLevelId is null and id < " +
                offset  + " ORDER BY id DESC LIMIT " + page_size + ")z ORDER BY z.id  ASC;";
            util.logData('sql1=' + str);
        }
        con.query(str, function (err, done) {
            if (err) {
                util.logData('---Error from getHoliday inside HolidayDao.js----');
                util.logData(err);
                cb(err, null);
            } else {
                cb(null, done);

            }
        });
    }

    function totalData(cb) {
        var str1 = "select count(*) count " +
            " from holiDaysListMst where clientid = " + data.clientId + " and deleteflag = '0' and supportGroupLevelId is null";
        con.query(str1, function (err, done) {
            if (err) {
                util.logData('---Error from getHoliday inside HolidayDao.js----');
                util.logData(err);
                cb(err, null);
            } else {
                util.logData('result1=' + done);
                cb(null, done);
            }
        });
    }
}

function insertHoliday_old(data, cb) {
    util.logData('data----------'+JSON.stringify(data));
    // if(data.group === ''){
    //     data.group = null;
    //   }
    let sql1 ="";
    if(data.group === '') {
        sql1 = "select * from holiDaysListMst where clientid = " + data.clientid + " and holyday=(select " +
            "ADDTIME('" + util.changeDateFormat(data.holyday) + "','5:30:0.000000')) and deleteflag=0 and supportGroupLevelId is null";
    }else{
        sql1 = "select * from holiDaysListMst where clientid = " + data.clientid + " and holyday=(select " +
            "ADDTIME('" + util.changeDateFormat(data.holyday) + "','5:30:0.000000')) and deleteflag=0 and supportGroupLevelId is not null ";
    }
    util.logData('sql1----------'+sql1);
    con.query(sql1, function (err1, details1) {
        if (err1) {
            util.logData(err1);
            cb(err1, null);
        } else {
            if (details1.length==0) {
                var sql ="";
                if(data.group === ''){
                    if(data.holidaytype=='F'){
                        sql = "insert into holiDaysListMst  (clientid,holyday,holidaytype,holiday_desc,createbyid) " +
                            " values ("+ data.clientid +",(select ADDTIME('" + util.changeDateFormat(data.holyday) + "','5:30:0.000000')),'"+data.holidaytype+"','"+data.holiday_desc+"','"+data.createdBy+"') ";
                    }else{
                        sql = "insert into holiDaysListMst  (clientid,holyday,holidaytype,holiday_desc,holidaystarttime,createbyid) " +
                            " values ("+ data.clientid +",(select ADDTIME('" + util.changeDateFormat(data.holyday) + "','5:30:0.000000')),'"+data.holidaytype+"','"+data.holiday_desc+"','"+data.holidaystarttime+"','"+data.createdBy+"') ";
                    }
                }else{
                    if(data.holidaytype=='F'){
                        sql = "insert into holiDaysListMst  (clientid,holyday,holidaytype,holiday_desc,createbyid,supportGroupLevelId) " +
                            " values ("+ data.clientid +",(select ADDTIME('" + util.changeDateFormat(data.holyday) + "','5:30:0.000000')),'"+data.holidaytype+"','"+data.holiday_desc+"','"+data.createdBy+"','"+data.group+"') ";
                    }else{
                        sql = "insert into holiDaysListMst  (clientid,holyday,holidaytype,holiday_desc,holidaystarttime,createbyid,supportGroupLevelId) " +
                            " values ("+ data.clientid +",(select ADDTIME('" + util.changeDateFormat(data.holyday) + "','5:30:0.000000')),'"+data.holidaytype+"','"+data.holiday_desc+"','"+data.holidaystarttime+"','"+data.createdBy+"','"+data.group+"') ";
                    }
                }
                util.logData('aa----------'+sql);
                con.query(sql, function (err, details) {
                    if (err) {
                        util.logData(err);
                        cb(err, null);
                    } else {
                        if (details.insertId > 0) {
                            var str2 = "SELECT concat(holyday,'') holiday FROM holiDaysListMst where clientid="+ data.clientid +" and holyday = (select ADDTIME('" + util.changeDateFormat(data.holyday) + "','5:30:0.000000'))";
                            con.query(str2, function (err, details1) {
                                if (err) {
                                    util.logData(err);
                                    cb(err, null);
                                } else {
                                    util.logData(JSON.stringify(details1));
                                    // request
                                    //     .get(SLA_URL + '/urgentHolidayCalculation')
                                    //     .query({clientid: data.clientid,holyday:details[0].holiday}) // query string
                                    //     .end((err, resp) => {
                                    //         if (err) {
                                    //             util.logData(err);
                                    //         } else {
                                    //             util.logData(JSON.stringify(resp));
                                    //         }
                                    //         // Do something
                                    //     });
                                    request
                                        .post(SLA_URL + '/urgentHolidayCalculation')
                                        .send({clientid: data.clientid,holyday:details1[0].holiday})
                                        .end((err, resp) => {
                                            if (err) {
                                                util.logData(err);
                                            } else {
                                                util.logData(JSON.stringify(resp));
                                                cb(null, true, details.insertId);
                                            }
                                            // Do something
                                        });
                                    // .then(resp => {
                                    //     util.logData(JSON.stringify(resp.body));
                                    //     cb(null, true, details.insertId);
                                    // });

                                }
                            })

                        } else {
                            cb(null, false, 'error occured');
                        }
                    }
                })
            } else {
                cb(null, false, 'Duplicate data');
            }
        }
    })
}

function insertHoliday(data, cb) {
    util.logData('data----------' + JSON.stringify(data));
    let param = [] ;
    let group = data.group.split(',');
    let sql = "";
    let sql1 = "";
    let DuplicateFull = 0 ;
    let DuplicateHalf = 0 ;
    if (data.group === ''){
        //=======================================> Check entry by SuppGrp and Date and ClientId <=====================================//
        sql = "select * from holiDaysListMst where clientid = " + data.clientid + " and holyday=(select " +
            "ADDTIME('" + util.changeDateFormat(data.holyday) + "','5:30:0.000000')) and deleteflag = 0 ";
        con.query(sql, function (err, PrevData) {
            if(err){
                cb(err,null);
            } else {
                if (PrevData.length > 0) {
                    cb(null,false,'Duplicate Data');
                } else {
                    //=======================================>If No Duplicate Found , Insert Instead <==========================================//
                    if (data.holidaytype == 'F') {
                        sql1 = "insert into holiDaysListMst  (clientid,holyday,holidaytype,holiday_desc,createbyid) " +
                            " values (?,(select ADDTIME(?,'5:30:0.000000')),?,?,?) ";
                        param = [data.clientid , util.changeDateFormat(data.holyday) , data.holidaytype , data.holiday_desc,data.createdBy ];
                    } else if (data.holidaytype === 'H'){
                        sql1 = "insert into holiDaysListMst  (clientid,holyday,holidaytype,holiday_desc,holidaystarttime,createbyid) " +
                            " values (?,(select ADDTIME(?,'5:30:0.000000')),?,?,?,?) ";
                        param = [data.clientid , util.changeDateFormat(data.holyday) , data.holidaytype , data.holiday_desc,data.holidaystarttime ,data.createdBy]
                    }
                }
                con.query(sql1,param,function(err,resp){
                    if(err){
                        cb(err,null);
                    } else {
                        util.logData('------------------ Response == > '+ JSON.stringify(resp));
                        var str2 = "SELECT concat(holyday,'') holiday FROM holiDaysListMst where clientid=" + data.clientid + " and holyday = (select ADDTIME('" + util.changeDateFormat(data.holyday) + "','5:30:0.000000'))";
                        util.logData('str22222222222====' + str2);
                        con.query(str2, function (err, details1) {
                            if (err) {
                                util.logData(err);
                                cb(err, null);
                            } else {
                                util.logData(JSON.stringify(details1));
                                request
                                    .post(SLA_URL + '/urgentHolidayCalculation')
                                    .send({clientid: data.clientid, holyday: details1[0].holiday})
                                    .end((err, resp) => {
                                        if (err) {
                                            util.logData(err);
                                        } else {
                                            util.logData(JSON.stringify(resp));
                                            cb(null, true,'Inserted Successfully');
                                        }
                                        // Do something
                                    });
                            }
                        });
                        // cb(null,true,'Inserted Successfully');
                    }
                })
            }
        })
    } else {
        for (let i = 0; i < group.length; i++) {
            //=======================================> Check entry by SuppGrp and Date and ClientId <=====================================//
            sql = "select * from holiDaysListMst where clientid = " + data.clientid + " and holyday=(select " +
                "ADDTIME('" + util.changeDateFormat(data.holyday) + "','5:30:0.000000')) and deleteflag = 0 and supportGroupLevelId =" + group[i] + "";
            con.query(sql, function (err, PrevData) {
                if (err) {
                    cb(err, null);
                } else {
                    if (PrevData.length > 0) {
                        //=======================================> Update If Duplicate Found <=====================================//
                        console.log(JSON.stringify(PrevData));
                        if (data.holidaytype === 'F') {
                            sql1 = "UPDATE `holiDaysListMst` SET `holiday_desc` = ? , holidaytype = ?  WHERE `id`= ?";
                            param = [data.holiday_desc, data.holidaytype, PrevData[0].id];
                            //=======================================> Duplicate Count For Full HoliDay<=====================================//
                            if (PrevData[0].holidaytype === 'F'){
                                DuplicateFull++ ;
                            }
                        } else if (data.holidaytype === 'H') {
                            sql1 = "UPDATE `holiDaysListMst` SET `holiday_desc` = ? , holidaytype = ? , holidaystarttime = ?  WHERE `id`= ?";
                            param = [data.holiday_desc, data.holidaytype, data.holidaystarttime ,PrevData[0].id];
                            //=======================================> Duplicate Count For Half HoliDay<=====================================//
                            if (PrevData[0].holidaytype === 'H' && PrevData[0].holidaystarttime === data.holidaystarttime){
                                DuplicateHalf++ ;
                            }
                        }
                    } else {
                        //=======================================> If No Duplicate Found , Insert Instead <==========================================//
                        if (data.holidaytype == 'F') {
                            sql1 = "insert into holiDaysListMst  (clientid,holyday,holidaytype,holiday_desc,createbyid,supportGroupLevelId) " +
                                " values (?,(select ADDTIME(?,'5:30:0.000000')),?,?,?,?) ";
                            param = [data.clientid , util.changeDateFormat(data.holyday) , data.holidaytype , data.holiday_desc,data.createdBy , group[i] ];
                        } else if (data.holidaytype === 'H'){
                            sql1 = "insert into holiDaysListMst  (clientid,holyday,holidaytype,holiday_desc,holidaystarttime,createbyid,supportGroupLevelId) " +
                                " values (?,(select ADDTIME(?,'5:30:0.000000')),?,?,?,?,?) ";
                            param = [data.clientid , util.changeDateFormat(data.holyday) , data.holidaytype , data.holiday_desc,data.holidaystarttime ,data.createdBy , group[i] ]
                        }
                    }
                    console.log(sql1 + '/n' + param);
                    con.query(sql1,param,function(err,resp){
                        if(err){
                            cb(err,null);
                        }else {
                            // util.logData('------------------ Response == > '+ JSON.stringify(resp));
                            var str2 = "SELECT concat(holyday,'') holiday FROM holiDaysListMst where clientid=" + data.clientid + " and holyday = (select ADDTIME('" + util.changeDateFormat(data.holyday) + "','5:30:0.000000'))";
                            util.logData('str22222222222====' + str2);
                            con.query(str2, function (err, details1) {
                                if (err) {
                                    util.logData(err);
                                    cb(err, null);
                                } else {
                                    util.logData(JSON.stringify(details1));
                                    request
                                        .post(SLA_URL + '/urgentHolidayCalculation')
                                        .send({clientid: data.clientid, holyday: details1[0].holiday})
                                        .end((err, resp) => {
                                            if (err) {
                                                util.logData(err);
                                            } else {
                                                util.logData(JSON.stringify(resp));
                                                cb(null, true,'Inserted Successfully');
                                            }
                                            // Do something
                                        });
                                }
                            });
                        }
                    })
                }
            })
        }
        var str2 = "SELECT concat(holyday,'') holiday FROM holiDaysListMst where clientid=" + data.clientid + " and holyday = (select ADDTIME('" + util.changeDateFormat(data.holyday) + "','5:30:0.000000'))";
        util.logData('str22222222222====' + str2);
        con.query(str2, function (err, details1) {
            if (err) {
                util.logData(err);
                cb(err, null);
            } else {
                util.logData(JSON.stringify(details1));
                request
                    .post(SLA_URL + '/urgentHolidayCalculation')
                    .send({clientid: data.clientid, holyday: details1[0].holiday})
                    .end((err, resp) => {
                        if (err) {
                            util.logData(err);
                        } else {
                            util.logData(JSON.stringify(resp));
                            cb(null, true,'Inserted Successfully');
                        }
                        // Do something
                    });
            }
        });
        // if(DuplicateFull === group.length -1 || DuplicateHalf === group.length -1){
        //     cb(null,false,'Duplicate Data');
        // }else{
        //     cb(null,true,'Inserted Successfully');
        // }
    }
}


function updateHolidayDateVal(data, cb) {
    util.logData('data----------'+JSON.stringify(data));
    if(data.holidaytype=='F') {
        var sql1 = "select * from holiDaysListMst where clientid = " + data.clientid + " and  holidaytype= '" + data.holidaytype + "' and holyday=(select ADDTIME('" + util.changeDateFormat(data.holyday) + "','5:30:0.000000'))  ";
    }else{
        var sql1 = "select * from holiDaysListMst where clientid = " + data.clientid + " and  holidaytype= '" + data.holidaytype + "' and holidaystarttime = '"+data.holidaystarttime+"' and holyday=(select ADDTIME('" + util.changeDateFormat(data.holyday) + "','5:30:0.000000'))  ";
    }
    util.logData('sql1----------'+sql1);
    con.query(sql1, function (err1, details1) {
        if (err1) {
            util.logData(err1);
            cb(err1, null);
        } else {
            if (details1.length==0) {
                var sql ="";
                if(data.holidaytype=='F'){
                    sql = "update holiDaysListMst  set holyday =date_format((select ADDTIME('" + util.changeDateFormat(data.holyday) + "','5:30:0.000000')),'%Y/%m/%d')" +
                        " ,holidaytype = '"+data.holidaytype+"',holidaystarttime= '00:00', modifybyid = "+data.user_id+", modifydate = Now() where id="+data.id+" ";
                }else{
                    sql = "update holiDaysListMst  set holyday =date_format((select ADDTIME('" + util.changeDateFormat(data.holyday) + "','5:30:0.000000')),'%Y/%m/%d')" +
                        " ,holidaytype = '"+data.holidaytype+"',holidaystarttime ='"+data.holidaystarttime+"' , modifybyid = "+data.user_id+", modifydate = Now() where id="+data.id+" ";

                }
                util.logData('aa----------'+sql);
                con.query(sql, function (err, details) {
                    if (err) {
                        util.logData(err);
                        cb(err, null);
                    } else {
                        if (details.affectedRows > 0) {
                            var str2 = "SELECT concat(holyday,'') holiday FROM holiDaysListMst where id= "+data.id+"";
                            util.logData('str2-------------'+str2)
                            con.query(str2, function (err, details1) {
                                if (err) {
                                    util.logData(err);
                                    cb(err, null);
                                } else {
                                    util.logData(JSON.stringify(details1));
                                   request
                                        .post(SLA_URL + '/urgentHolidayCalculation')
                                        .send({clientid: data.clientid,holyday:details1[0].holiday})
                                        .end((err, resp) => {
                                                    if (err) {
                                                        util.logData(err);
                                                    } else {
                                                        util.logData(JSON.stringify(resp));
                                                        cb(null, true, details.insertId);
                                                    }
                                                    // Do something
                                                });


                                }
                            })

                        } else {
                            cb(null, false, 'error occured');
                        }
                    }
                })
            } else {
                cb(null, false, 'Duplicate data');
            }
        }
    })
}

function deleteHolidayDateVal(data, cb) {

    var sql = "update holiDaysListMst  set deleteflag = '1',delete_by_id = "+data.user_id+", deletedate = Now() where id="+data.id+" ";

    util.logData('aa----------'+sql);
    con.query(sql, function (err, details) {
        if (err) {
            util.logData(err);
            cb(err, null);
        } else {
            if (details.affectedRows > 0) {
                var str2 = "SELECT concat(holyday,'') holiday FROM holiDaysListMst where id = "+data.id+"";
                con.query(str2, function (err, details1) {
                    if (err) {
                        util.logData(err);
                        cb(err, null);
                    } else {
                        util.logData(JSON.stringify(details1));
                        request
                            .post(SLA_URL + '/deleteHolidayCalculation')
                            .send({clientid: data.clientid,holyday:details1[0].holiday})
                            .end((err, resp) => {
                                if (err) {
                                    util.logData(err);
                                } else {
                                    util.logData(JSON.stringify(resp));
                                    cb(null, true, details.insertId);
                                }
                                // Do something
                            });


                    }
                })

            } else {
                cb(null, false, 'error occured');
            }
        }
    })

}

function getHolidayBySupGrp_old(data,cb) {
    var page_size = data.page_size;
    var paginationType = data.paginationType;
    var offset = data.nextOffset;
    var funcArr = {};
    var str = "";

    if(offset == "0") {
        funcArr = {dataObj , totalData};
    } else {
        funcArr = {dataObj};
    }
    async.parallel(funcArr,
        function(err, results) {
            if(err) {
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
            str = "select a.id, k.supportGrp,concat(a.holyday,'') holyday, "+
                "a.holidaystarttime, CASE WHEN holidaytype IN ('F') THEN true ELSE false END AS holidaytype , a.holiday_desc from holiDaysListMst a,(SELECT i.id , " +
                "GROUP_CONCAT(c.LEVELLONGDESC) supportGrp FROM holiDaysListMst i, SUPPORTGROUPLEVEL "+
                "c WHERE FIND_IN_SET(c.id , i.supportGroupLevelId) GROUP BY i.id)  k where a.clientid = " + data.clientId +" "+
                "and a.deleteflag = '0' and k.id = a.id and a.id > "+offset+" ORDER BY a.id asc limit "+page_size+";";
            util.logData('sql=' + str);
        } else if (paginationType == 'prev') {
            str = " select * from ("+
                "select a.id, k.supportGrp,concat(a.holyday,'') holyday, "+
                "a.holidaystarttime, CASE WHEN holidaytype IN ('F') THEN true ELSE false END AS holidaytype , a.holiday_desc from holiDaysListMst a,(SELECT i.id , " +
                "GROUP_CONCAT(c.LEVELLONGDESC) supportGrp FROM holiDaysListMst i, SUPPORTGROUPLEVEL "+
                "c WHERE FIND_IN_SET(c.id , i.supportGroupLevelId) GROUP BY i.id)  k where a.clientid = " + data.clientId +" "+
                "and a.deleteflag = '0' and k.id = a.id and a.id < "+offset+" ORDER BY a.id DESC limit "+page_size+
                ")z ORDER BY z.id  ASC;";
            util.logData('sql1=' + str);
        }
        con.query(str, function (err, done) {
            if (err) {
                util.logData('---Error from getHoliday inside HolidayDao.js----');
                util.logData(err);
                cb(err, null);
            } else {
                cb(null, done);

            }
        });
    }

    function totalData(cb) {
        var str1 = "select count(*) count " +
            " from holiDaysListMst where clientid = " + data.clientId + " and deleteflag = '0' and supportGroupLevelId is not null ";
        con.query(str1, function (err, done) {
            if (err) {
                util.logData('---Error from getHoliday inside HolidayDao.js----');
                util.logData(err);
                cb(err, null);
            } else {
                util.logData('result1=' + done);
                cb(null, done);
            }
        });
    }
}

function getHolidayBySupGrp(data,cb) {
    var page_size = data.page_size;
    var paginationType = data.paginationType;
    var offset = data.nextOffset;
    var funcArr = {};
    var str = "";

    if(offset == "0") {
        funcArr = {dataObj , totalData};
    } else {
        funcArr = {dataObj};
    }
    async.parallel(funcArr,
        function(err, results) {
            if(err) {
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
            str = "select a.id ,  (select LEVELLONGDESC from SUPPORTGROUPLEVEL" +
                " where SUPPORTGROUPLEVEL.id = a.supportGroupLevelId) supportGrp , " +
                "a.holidaystarttime, CASE WHEN holidaytype IN ('F') THEN true ELSE false END AS holidaytype , " +
                "a.holiday_desc , concat(a.holyday,'') holyday   from holiDaysListMst a  where a.clientid = "+ data.clientId + " and a.deleteflag = 0 " +
                "and a.id > "+offset+" ORDER BY a.id asc limit "+page_size+ ";" ;
            // str = "select a.id, k.supportGrp,concat(a.holyday,'') holyday, "+
            //     "a.holidaystarttime, CASE WHEN holidaytype IN ('F') THEN true ELSE false END AS holidaytype , a.holiday_desc from holiDaysListMst a,(SELECT i.id , " +
            //     "GROUP_CONCAT(c.LEVELLONGDESC) supportGrp FROM holiDaysListMst i, SUPPORTGROUPLEVEL "+
            //     "c WHERE FIND_IN_SET(c.id , i.supportGroupLevelId) GROUP BY i.id)  k where a.clientid = " + data.clientId +" "+
            //     "and a.deleteflag = '0' and k.id = a.id and a.id > "+offset+" ORDER BY a.id asc limit "+page_size+";";
            util.logData('sql=' + str);
        } else if (paginationType == 'prev') {
            str = " select * from ("+
                "select a.id ,  (select LEVELLONGDESC from SUPPORTGROUPLEVEL" +
                " where SUPPORTGROUPLEVEL.id = a.supportGroupLevelId) supportGrp , " +
                "a.holidaystarttime, CASE WHEN holidaytype IN ('F') THEN true ELSE false END AS holidaytype , " +
                "a.holiday_desc , concat(a.holyday,'') holyday   from holiDaysListMst a  where a.clientid = "+ data.clientId + " and a.deleteflag = 0 " +
                "and a.id < "+offset+" ORDER BY a.id asc limit "+page_size+
                ")z ORDER BY z.id  ASC;";
            util.logData('sql1=' + str);
        }
        con.query(str, function (err, done) {
            if (err) {
                util.logData('---Error from getHoliday inside HolidayDao.js----');
                util.logData(err);
                cb(err, null);
            } else {
                cb(null, done);

            }
        });
    }

    function totalData(cb) {
        var str1 = "select count(*) count " +
            " from holiDaysListMst where clientid = " + data.clientId + " and deleteflag = '0'";
        con.query(str1, function (err, done) {
            if (err) {
                util.logData('---Error from getHoliday inside HolidayDao.js----');
                util.logData(err);
                cb(err, null);
            } else {
                util.logData('result1=' + done);
                cb(null, done);
            }
        });
    }
}


module.exports.getHolidayBySupGrp = getHolidayBySupGrp;
module.exports.deleteHolidayDateVal = deleteHolidayDateVal;
module.exports.updateHolidayDateVal = updateHolidayDateVal;
module.exports.updateHoliday = updateHoliday;
module.exports.getHoliday = getHoliday;
module.exports.insertHoliday = insertHoliday;
