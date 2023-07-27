const config = require('./dbConnection');
const conMaster = config.createMysqlConn();
const con = config.createMysqlConnReport();

// const logger = require('inspire').logger;
const util=require('../util');
const async = require('async');
function stringToBool(value) {
    if (value === 'true' || value === 'True' || value === 'TRUE') {
        return true;
    } else {
        return false;
    }
}

function getColumListByTableName(data, cb) {
    console.log(data);
    var str = "select column_name, DATA_TYPE as column_type from information_schema.columns where table_name='"+data.table+"'";
    console.log(str);
    conMaster.query(str, function (err, done, fields) {
        if (err) {
            util.logData('---Error from getColumListByTableName inside ReportConfiguratorDB.js----');
            util.logData(err);
            cb(err, null);
        } else {
            cb(null, true, done);
        }
    });
}

function addReportConfiguratorTemplate(data, cb) {
    console.log(data);
    if(Array.isArray(data.columns) && data.columns.length === 0){
        cb(null, false, "Please add coulumn for template");
    }

    var str1 = 'select count(*) cnt from report_configurator_template where DeleteFlag = 0 and template_name="' + data.template + '" and CLIENTID = '+data.client_id;

    conMaster.query(str1, function (err1, result1) {
        if (err1) {
            util.logData('---Error from addReportConfiguratorTemplate inside ReportConfiguratorDB.js----');
            util.logData(err1);
            cb(err1, null);
        } else {
            if (result1[0].cnt === 0) {
                var sql = "INSERT INTO report_configurator_template (template_name, table_name, CLIENTID, createbyid, report_type, report_graph_type) "+
                " VALUES ('" + data.template + "','" + data.table + "'," + data.client_id + "," + data.createdBy + ",'"+data.type+"','"+data.graph+"')";
                util.logData(sql)
                conMaster.query(sql, function (err, result) {
                    if (err) {
                        util.logData('---Error from addReportConfiguratorTemplate inside ReportConfiguratorDB.js----');
                        util.logData(err);
                        cb(err, null);
                    } else {
                        var columnsArray = data.columns;
                        var sqlValues = ''; 
                        for (var i in columnsArray) {
                            if(sqlValues == ''){
                                sqlValues = sqlValues +  '('+ result.insertId +',"'+ columnsArray[i].column_name +'","'+ columnsArray[i].column_type +'","'+ columnsArray[i].report_field_name +'","'+ columnsArray[i].filter +'","'+ columnsArray[i].operator +'",'+ columnsArray[i].sequence +','+ data.client_id + "," + data.createdBy +')';
                            }else{
                                sqlValues = sqlValues +  ',('+ result.insertId +',"'+ columnsArray[i].column_name +'","'+ columnsArray[i].column_type +'","'+columnsArray[i].report_field_name +'","'+ columnsArray[i].filter +'","'+columnsArray[i].operator+'",'+ columnsArray[i].sequence +','+ data.client_id + "," + data.createdBy +')';
                            }
                        }
                        console.log(sqlValues);

                        var sql = "INSERT INTO report_configurator_template_fields (template_id,column_name,column_type,report_field_name,report_field_filter,report_field_operation,sequence,CLIENTID,createbyid) VALUES "+ sqlValues;
                        console.log(sql);
                        util.logData(sql)
                        conMaster.query(sql, function (err, result) {
                            if (err) {
                                util.logData('---Error from addReportConfiguratorTemplate inside ReportConfiguratorDB.js----');
                                util.logData(err);
                                cb(err, null);
                            } else {
                                cb(null, true, "Inserted Successfully");
                            }
                        });
                        
                    }
                });
            } else {
                cb(null, false, "Template name already exists");
            }
        }
    });
}

function getReportConfiguratorTemplateList(data, cb) {
    console.log(data);
    var str = 'select id, template_name from report_configurator_template where DeleteFlag = 0 and CLIENTID = '+data.clientId;
    console.log(str);
    conMaster.query(str, function (err, done, fields) {
        if (err) {
            util.logData('---Error from getReportConfiguratorTemplateList inside ReportConfiguratorDB.js----');
            util.logData(err);
            cb(err, null);
        } else {
            cb(null, true, done);
        }
    });
}

function getUniqueValueByField(data, cb) {
    console.log(data);
    var str = 'select DISTINCT '+data.fieldName+' uniqueField from '+data.tableName+' where DeleteFlag = 0 and CLIENTID = '+data.clientId;
    console.log(str);
    conMaster.query(str, function (err, done, fields) {
        if (err) {
            util.logData('---Error from getReportConfiguratorTemplateList inside ReportConfiguratorDB.js----');
            util.logData(err);
            cb(err, null);
        } else {
            if(done.length > 50){
                cb(null, false, "Not Filterable");  
            }
            else{
                cb(null, true, done);
            }
            
        }
    });
}

function getReportTableData(data, cb) {
    console.log(data);
    var sqlSelect = "select column_name, column_type, report_field_name, report_field_filter,CLIENTID,report_field_operation, "+
    " (SELECT table_name FROM report_configurator_template where id = template_id)  table_name , "+
    " (SELECT report_type FROM report_configurator_template where id = template_id)  report_type "+
    " from report_configurator_template_fields where template_id = "+data.template_id;
    console.log(sqlSelect);
    conMaster.query(sqlSelect, function (err, results, fields) {
        if (err) {
            util.logData('---Error from getReportTableData inside ReportConfiguratorDB.js----');
            util.logData(err);
            cb(err, null);
        } else {
            if(results.length > 0){
                console.log(results[0].report_type);
                if(results[0].report_type === "0" || results[0].report_type === "" || results[0].report_type === null){
                    cb(null, false, "No data found");  
                }
                var tableName = results[0].table_name;
                var fieldQuery = "";
                var whereQuery = " clientid = "+results[0].CLIENTID;
                for (var i in results) {
                    var columnName = results[i].column_name;

                    //--------- Select Statements ---------//
                    var columnNameSelect = results[i].column_name;
                    if(results[i].column_type.toUpperCase() === "TIMESTAMP"){
                        columnNameSelect = "date_format (" +columnNameSelect+ ",'%Y-%m-%d %T') "+columnNameSelect;
                    }

                    if(fieldQuery === ""){
                        fieldQuery = columnNameSelect; 
                    }else{
                        fieldQuery = fieldQuery + ", " + columnNameSelect;
                    }

                    //--------- WHERE Statements ---------//

                    if (results[i].report_field_filter !== ""){
                        var conditionStr = "";
                        if(results[i].column_type.toUpperCase() === "TIMESTAMP"){
                            if(results[i].report_field_operation === "between"){
                                var dates = results[i].report_field_filter.split(",");
                                //conditionStr = date_format (ADDTIME(coalesce(columnName), '5:30:0.000000'),'%Y-%m-%d') + " between " +dates[0]+ " and " + dates[1];
                                whereQuery = whereQuery + " and date_format (" +columnName+ ",'%Y-%m-%d')" + " between '" +dates[0]+ "' and '" +dates[1]+ "'";
                            }
                            else{
                                whereQuery = whereQuery + " and date_format (" +columnName+ ",'%Y-%m-%d') " +results[i].report_field_operation+" '"+results[i].report_field_filter+"'";
                            }
                        }
                        else if(results[i].column_type.toUpperCase() === "VARCHAR" || results[i].column_type.toUpperCase() === "TEXT"){
                            if(results[i].report_field_operation === "a%"){
                                whereQuery = whereQuery + " and "+columnName+" like '"+results[i].report_field_filter+"%'";
                            }
                            else if(results[i].report_field_operation === "%a"){
                                whereQuery = whereQuery + " and "+columnName+" like '%"+results[i].report_field_filter+"'";
                            }
                            else if(results[i].report_field_operation === "%a%"){
                                whereQuery = whereQuery + " and "+columnName+" like '%"+results[i].report_field_filter+"%'";
                            }
                            else if(results[i].report_field_operation === "="){
                                whereQuery = whereQuery + " and "+columnName+" = '"+results[i].report_field_filter+"'";
                            }
                            else if(results[i].report_field_operation === "dropdown"){
                                whereQuery = whereQuery + " and "+columnName+" = '"+results[i].report_field_filter+"'";
                            } 
                        }
                    }
                   
                }

                //--------- Build Query ---------//
                var reportSql = "select id, " +fieldQuery+ " from " +tableName ;
                if(whereQuery !== ""){
                    reportSql = reportSql + " where "+ whereQuery;
                }

                console.log( "ReportSql ========>>>>>>> " + reportSql);
                con.query(reportSql, function (err, done, fields) {
                    if (err) {
                        util.logData('---Error from getReportConfiguratorTemplateList inside ReportConfiguratorDB.js----');
                        util.logData(err);
                        cb(err, null);
                    } else {
                        cb(null, true, [{
                            columns: results,
                            val: done,
                            type: results[0].report_type
                        }])
                    }
                });

                
            }
            else{
                
                cb(null, false, "No data found");  
            }
        }
    });
}

function getSLAComplainceReport(data, cb) {
    //console.log(data);
    var resArray = [];
    var tableArray = [];
    var volumeArray = [];
    var pieArray = [];
    var idCount = 1;
    var tableDefinationArray = [];
    async.waterfall([
        function getReportType(callback) {
            var reportTypeSql = "";
            if(data.type === "1"){
                //console.log("Overall");
                reportTypeSql = "";
                tableDefinationArray = [{id:2, name:"Total Open Tickets", field:"openTickets"},
                            {id:3, name:"Total Closed Tickets", field:"closedTickets"},
                            {id:4, name:"SLA Compliance (%)", field:"slaCompliance"},
                            {id:5, name:"Average Response time(minutes)", field:"avResponsetime"},
                            {id:6, name:"Average Resolution time(minutes)", field:"avResolutionTime"}
                        ]; 
            }else if(data.type === "2"){
                //console.log("Support group wise");
                reportTypeSql = "SELECT id sgId,LEVELSHORTDESC sgName FROM SUPPORTGROUPLEVEL WHERE "+
                " CLIENTID=" + data.clientId + " AND DeleteFlag=0 AND group_level != 0 ORDER BY id";

                tableDefinationArray = [ {id:1, name:"Support group", field:"type"},
                        {id:2, name:"Total Open Tickets", field:"openTickets"},
                        {id:3, name:"Total Closed Tickets", field:"closedTickets"},
                        {id:4, name:"SLA Compliance (%)", field:"slaCompliance"},
                        {id:5, name:"Average Response time(minutes)", field:"avResponsetime"},
                        {id:6, name:"Average Resolution time(minutes)", field:"avResolutionTime"}
                    ];

            }else if(data.type === "3"){
                //console.log("Category wise");
                var mainCategory = "SELECT id FROM TICKETATTRIBUTES where ATTRID = 1 AND CLIENTID = "+ data.clientId +" "+
                " and PARENT_ID = 0 and DeleteFlag = '0' and attrHeaderMstId in "+
                " (SELECT id FROM attributesHeaderMst where ticket_type = "+ data.ticketType +" and DeleteFlag = '0') LIMIT 1";

                reportTypeSql = "SELECT id ,ATTRVAL FROM TICKETATTRIBUTES where ATTRID "+
                        " = 1 AND CLIENTID = "+ data.clientId +" and PARENT_ID = ("+mainCategory+")";

                tableDefinationArray = [ {id:1, name:"Category", field:"type"},
                        {id:2, name:"Total Open Tickets", field:"openTickets"},
                        {id:3, name:"Total Closed Tickets", field:"closedTickets"},
                        {id:4, name:"SLA Compliance (%)", field:"slaCompliance"},
                        {id:5, name:"Average Response time(minutes)", field:"avResponsetime"},
                        {id:6, name:"Average Resolution time(minutes)", field:"avResolutionTime"}
                      ];

            }else if(data.type === "4"){
                //console.log("Ticket type wise");
                reportTypeSql = "SELECT distinct ticketTypeId, ticketTypeVal ticketType FROM ticket_report where clientid = " + data.clientId +
                " and DeleteFlag = '0'";

                tableDefinationArray = [ {id:1, name:"Ticket Type/Service Type", field:"type"},
                        {id:2, name:"Total Open Tickets", field:"openTickets"},
                        {id:3, name:"Total Closed Tickets", field:"closedTickets"},
                        {id:4, name:"SLA Compliance (%)", field:"slaCompliance"},
                        {id:5, name:"Average Response time(minutes)", field:"avResponsetime"},
                        {id:6, name:"Average Resolution time(minutes)", field:"avResolutionTime"}
                      ];
            }
            //console.log( " Report Type SQL ==>> " + reportTypeSql);
            if(reportTypeSql === ""){
                callback(null, ["all"]);
            }else{
                con.query(reportTypeSql, function (err, results, fields) {
                    if (err) {
                        util.logData('---Error from getSLAComplainceReport inside ReportConfiguratorDB.js----');
                        util.logData(err);
                        cb(err, null);
                    } else {
                        //console.log(results);
                        if (results.length > 0) {
                            callback(null, results);
                        }else{
                            cb(null, false, "No data found for type");
                        }
                    }
                });
            }
        },
        function getReportData(reportTypeResult, callback) {
            //console.log(reportTypeResult);
            async.eachSeries(Object.keys(reportTypeResult), function (key, loopcallback){
                var resultType = "";
                var conditionQuery = "";
                var conditionQueryWFC = "";
                // Types
                if(data.type === "1"){
                    //console.log("Overall 2");
                    conditionQuery = " ";
                    conditionQueryWFC = " ";
                }else if(data.type === "2"){
                    var sgTypeID = reportTypeResult[key].sgId;
                    resultType = reportTypeResult[key].sgName;

                    conditionQuery = " ";
                    conditionQueryWFC = " and x.supportGroupLevelId = "+sgTypeID+" ";
                }else if(data.type === "3"){
                    conditionQuery = " and t.working_category = "+reportTypeResult[key].id+" ";
                    conditionQueryWFC = " and y.working_category = "+reportTypeResult[key].id+" ";
                    resultType = reportTypeResult[key].ATTRVAL;
                }else if(data.type === "4"){
                    var ticketTypeID = reportTypeResult[key].ticketTypeId;
                    resultType = reportTypeResult[key].ticketType;
                    conditionQuery = " and t.ticketTypeId = "+ticketTypeID+" ";
                    conditionQueryWFC = " and y.ticketTypeId = "+ticketTypeID+" ";
                }
                // Filters
                var conditionQueryFilter = "";
                if(data.filter === "1"){
                    //console.log("Daily");
                    conditionQueryFilter = " and DATE(t.createdate) = CURRENT_DATE()";
                }else if(data.filter === "2"){
                    //console.log("Weekly");
                    conditionQueryFilter = " and  YEARWEEK(t.createdate) = YEARWEEK(CURRENT_DATE())";
                }else if(data.filter === "3"){
                    //console.log("Monthly");
                    conditionQueryFilter = " and  MONTH(t.createdate) = MONTH(CURRENT_DATE())";
                }else if(data.filter === "4"){
                    //console.log("Quarterly");
                    conditionQueryFilter = " and  QUARTER(t.createdate) = QUARTER(CURRENT_DATE())";
                }else if(data.filter === "5"){
                    //console.log("Yearly");
                    conditionQueryFilter = " and  YEAR(t.createdate) = YEAR(CURRENT_DATE())";
                }else if(data.filter === "7"){
                    //console.log("Till Date");
                    conditionQueryFilter = " and date_format (ADDTIME(t.createdate, '5:30:0.000000'),'%Y-%m-%d') <= '" + data.tillDate +"'";
                }else if(data.filter === "6"){
                    //console.log("From and to date");
                    conditionQueryFilter = " and date_format (ADDTIME(t.createdate, '5:30:0.000000'),'%Y-%m-%d') between '"+ data.fromdate +"' and '"+ data.todate +"'";
                }
                conditionQuery = conditionQuery + conditionQueryFilter;
                var funcArr = {countCloseTicket, countOpenTicket, slaCompliance, avResponsetime, avResolutionTime, getTotalTicket};
                async.parallel(funcArr,
                function (err, results) {
                    if (err) {
                        util.logData('---Error from getSLAComplainceReport inside ReportConfiguratorDB.js----');
                        util.logData(err);
                    } else {
                        //console.log(results);
                        tableArray.push({id: idCount,
                                        type: resultType,
                                        openTickets: results.countOpenTicket,
                                        closedTickets: results.countCloseTicket,
                                        slaCompliance: results.slaCompliance,
                                        avResponsetime: results.avResponsetime,
                                        avResolutionTime: results.avResolutionTime
                                    });      
                        var volArray =  [
                                            {grpName: 'Open Tickets', grpValue: results.countOpenTicket},
                                            {grpName: 'Close Tickets', grpValue: results.countCloseTicket}
                                        ]
                        volumeArray.push({id: idCount,
                                        type: resultType,
                                        volume: volArray,
                                    });
                        pieArray.push({id: idCount,
                            name: resultType,
                            value: Number(results.countOpenTicket)+Number(results.countCloseTicket),
                        });
                    }
                    idCount = idCount + 1;
                    loopcallback();
                });

                function countCloseTicket(callback) {
                    var countCloseTicketSQL = "SELECT COUNT(DISTINCT t.id) close FROM WFCCLIENTRESULT_report w, ticket_report t where "+
                    " w.PKFIELDVAL = t.id and t.DeleteFlag='0' and t.clientid="+data.clientId+" "+conditionQuery+" "+
                    " and w.tStatus = (SELECT id FROM TICKETATTRIBUTES where ATTRID = 2 AND CLIENTID = "+data.clientId+" "+
                    " and sequence_no = 0 and DeleteFlag = '0') and w.id IN (SELECT MAX(x.id) FROM "+
                    " WFCCLIENTRESULT_report x, ticket_report y WHERE x.PKFIELDVAL = y.id AND y.clientid = "+data.clientId+" "+conditionQueryWFC+" GROUP BY x.PKFIELDVAL);"
                   // console.log("SQL countCloseTicket --> " + countCloseTicketSQL);
                    con.query(countCloseTicketSQL, function (err, result) {
                        if (err) {
                            util.logData('---Error from getSLAComplainceReport inside ReportConfiguratorDB.js----');
                            util.logData(err);
                            cb(err, null);
                        } else {
                            callback(null, result[0].close);
                        }
                    });
                }
    
                function countOpenTicket(callback) {
                    var countOpenTicketSQL = "SELECT COUNT(DISTINCT t.id) open FROM WFCCLIENTRESULT_report w, ticket_report t where "+
                    " w.PKFIELDVAL = t.id and t.DeleteFlag='0' and t.clientid="+data.clientId+" "+conditionQuery+" "+
                    " and w.tStatus != (SELECT id FROM TICKETATTRIBUTES where ATTRID = 2 AND CLIENTID = "+data.clientId+" "+
                    " and sequence_no = 0 and DeleteFlag = '0') and w.id IN (SELECT MAX(x.id) FROM "+
                    " WFCCLIENTRESULT_report x, ticket_report y WHERE x.PKFIELDVAL = y.id AND y.clientid = "+data.clientId+" "+conditionQueryWFC+" GROUP BY x.PKFIELDVAL);"
                    //console.log("SQL countOpenTicket --> " + countOpenTicketSQL);
                    con.query(countOpenTicketSQL, function (err, result) {
                        if (err) {
                            util.logData('---Error from getSLAComplainceReport inside ReportConfiguratorDB.js----');
                            util.logData(err);
                            cb(err, null);
                        } else {
                            callback(null, result[0].open);
                        }
                    });
                }
                function slaCompliance(callback) {
                    var slaComplianceTotalSQL = "SELECT COUNT(DISTINCT t.id) total FROM WFCCLIENTRESULT_report w, ticket_report t where "+
                    " w.PKFIELDVAL = t.id and t.DeleteFlag='0' and t.clientid="+data.clientId+" "+conditionQuery+" "+
                    " and w.id IN (SELECT MAX(x.id) FROM "+
                    " WFCCLIENTRESULT_report x, ticket_report y WHERE x.PKFIELDVAL = y.id AND y.clientid = "+data.clientId+" "+conditionQueryWFC+" GROUP BY x.PKFIELDVAL);"
                    //console.log("SQL slaCompliance Total --> " + slaComplianceTotalSQL);
                    con.query(slaComplianceTotalSQL, function (err, result) {
                        if (err) {
                            util.logData('---Error from getSLAComplainceReport inside ReportConfiguratorDB.js----');
                            util.logData(err);
                            cb(err, null);
                        } else {
                            //cb(null, result[0].total);
                            var slaComplianceSQL = "SELECT COUNT(DISTINCT t.id) sla FROM WFCCLIENTRESULT_report w, ticket_report t, ticket_sla_response_dtls_report sla where "+
                            " w.PKFIELDVAL = t.id and w.PKFIELDVAL = sla.ticketId and t.DeleteFlag='0' and t.clientid="+data.clientId+" "+conditionQuery+" "+
                            " and sla.response_datetime > COALESCE (sla.response_stop_datetime,Now()) and w.id IN (SELECT MAX(x.id) FROM "+
                            " WFCCLIENTRESULT_report x, ticket_report y WHERE x.PKFIELDVAL = y.id AND y.clientid = "+data.clientId+" "+conditionQueryWFC+" GROUP BY x.PKFIELDVAL);"
                            //console.log("SQL slaCompliance --> " + slaComplianceSQL);
                            con.query(slaComplianceSQL, function (err, result2) {
                                if (err) {
                                    util.logData(err);
                                    cb(err, null);
                                } else {
                                    var compliance = 0;
                                    var totalTicket = result[0].total;
                                    var nonViolated = result2[0].sla;
                                    if(nonViolated === '0' || nonViolated === 0){
                                        compliance = 0;
                                    }else{
                                        compliance = Math.round((Number(nonViolated)/Number(totalTicket))*100);
                                    }
                                    
                                    //console.log("SLA Non Violated - " + nonViolated);
                                    //console.log("Total Ticket - " + totalTicket);
                                    //console.log("SLA Compliance - " + compliance);
                                    callback(null, compliance);
                                }
                       
                            });  
                        }
                    });
                }
    
                function avResponsetime(callback) {
                    var slaComplianceSQL = "SELECT ROUND(AVG(sla_response_period),2) avRes FROM WFCCLIENTRESULT_report w, ticket_report t, ticket_sla_response_dtls_report sla where "+
                    " w.PKFIELDVAL = t.id and w.PKFIELDVAL = sla.ticketId and t.DeleteFlag='0' and t.clientid="+data.clientId+" "+conditionQuery+" "+
                    " and sla.response_datetime > COALESCE (sla.response_stop_datetime,Now()) and w.id IN (SELECT MAX(x.id) FROM "+
                    " WFCCLIENTRESULT_report x, ticket_report y WHERE x.PKFIELDVAL = y.id AND y.clientid = "+data.clientId+" "+conditionQueryWFC+" GROUP BY x.PKFIELDVAL);"
                    //console.log("SQL slaCompliance --> " + slaComplianceSQL);
                    con.query(slaComplianceSQL, function (err, result) {
                        if (err) {
                            util.logData('---Error from getSLAComplainceReport inside ReportConfiguratorDB.js----');
                            util.logData(err);
                            cb(err, null);
                        } else {
                            if(result[0].avRes === null){
                                callback(null, 0);
                            }
                            else{
                                callback(null, result[0].avRes);
                            }
                            
                        }
                
                    });
                   
                }
                function avResolutionTime(callback) {
                    var avResolutionTimeSQL = "SELECT ROUND(AVG(sla_resolution_period),2) avResol FROM WFCCLIENTRESULT_report w, ticket_report t, ticket_sla_response_dtls_report sla where "+
                    " w.PKFIELDVAL = t.id and w.PKFIELDVAL = sla.ticketId and t.DeleteFlag='0' and t.clientid="+data.clientId+" "+conditionQuery+" "+
                    " and sla.response_datetime > COALESCE (sla.response_stop_datetime,Now()) and w.id IN (SELECT MAX(x.id) FROM "+
                    " WFCCLIENTRESULT_report x, ticket_report y WHERE x.PKFIELDVAL = y.id AND y.clientid = "+data.clientId+" "+conditionQueryWFC+" GROUP BY x.PKFIELDVAL);"
                    //console.log("SQL avResolutionTime --> " + avResolutionTimeSQL);
                    con.query(avResolutionTimeSQL, function (err, result) {
                        if (err) {
                            util.logData('---Error from getSLAComplainceReport inside ReportConfiguratorDB.js----');
                            util.logData(err);
                            cb(err, null);
                        } else {
                            if(result[0].avResol === null){
                                callback(null, 0);
                            }
                            else{
                                callback(null, result[0].avResol);
                            }
                            
                        }
                
                    });
                }
    
                function getTotalTicket(callback){
                    var getTotalTicketSQL = "SELECT COUNT(DISTINCT t.id) total FROM WFCCLIENTRESULT_report w, ticket_report t where "+
                    " w.PKFIELDVAL = t.id and t.DeleteFlag='0' and t.clientid="+data.clientId+" "+conditionQuery+" "+
                    " and w.id IN (SELECT MAX(x.id) FROM "+
                    " WFCCLIENTRESULT_report x, ticket_report y WHERE x.PKFIELDVAL = y.id AND y.clientid = "+data.clientId+" "+conditionQueryWFC+" GROUP BY x.PKFIELDVAL);"
                    //console.log("SQL getTotalTicket --> " + getTotalTicketSQL);
                    con.query(getTotalTicketSQL, function (err, result) {
                        if (err) {
                            util.logData('---Error from getSLAComplainceReport inside ReportConfiguratorDB.js----');
                            util.logData(err);
                            cb(err, null);
                        } else {
                            callback(null, result[0].total);
                        }
                    });
                }   
                
                   
            }, function(err) {
                console.log('iterating done');
                resArray.push({tabledata: tableArray,
                    voldata: volumeArray,
                    piedata: pieArray,
                    tableDef: tableDefinationArray,
                });
                //console.log(resArray);
                cb(null, true, resArray);
            });

        },

    ],
    function (err) {
        if (err) {
            throw new Error(err);
        } else {     
            util.logData(err);
        }
    });
}

function getCSATReport(data, cb){
    //console.log("getCSATReport Called ...");
    var resArray = [];
    var tableArray = [];
    var volumeArray = [];
    var pieArray = [];
    var CsatTypesArray = [];
    var idCount = 1;
    var tableDefinationArray = [];
    var solutionID = 0;
    async.waterfall([
        function getSolutionID(callback){
            sqlCSATType = "SELECT id FROM TICKETATTRIBUTES where ATTRID = 2 AND CLIENTID = "+ data.clientId +" and sequence_no = 2 and DeleteFlag = '0' LIMIT 1";

            con.query(sqlCSATType, function (err, results, fields) {
                if (err) {
                    util.logData('---Error from sqlCSATType inside ReportConfiguratorDB.js----');
                    util.logData(err);
                    cb(err, null);
                } else {
                    //console.log("Ticket Solution ID");
                    if (results.length > 0) {
                        solutionID = results[0].id;
                        callback(null, solutionID);
                    }else{
                        cb(null, false, "Something went wrong..");
                    }
                }
            });
        },
        function getCSATtype(solutionID, callback){
            sqlCSATType = "SELECT id, csatRating FROM `csat-rating` where DeleteFlag = '0' and "+
            " clientId = "+ data.clientId;

            con.query(sqlCSATType, function (err, results, fields) {
                if (err) {
                    util.logData('---Error from sqlCSATType inside ReportConfiguratorDB.js----');
                    util.logData(err);
                    cb(err, null);
                } else {
                    //console.log("CSAT Types");
                    if (results.length > 0) {
                        CsatTypesArray = results;
                        callback(null, results);
                    }else{
                        cb(null, false, "No data found for CSAT Type");
                    }
                }
            });
        },
        function getReportType(CSATTypes, callback) {
            //console.log(CSATTypes);
            tableDefinationArray = [];
            async.eachSeries(Object.keys(CSATTypes), function (key, loopcallback){
                tableDefinationArray.push({id:CSATTypes[key].id, name: CSATTypes[key].csatRating, field: CSATTypes[key].csatRating});
                loopcallback();
            }, function(err) {
                //console.log('iterating done CSATTypes');
                //console.log(tableDefinationArray);
                util.logData('---Error from getCSATReport inside ReportConfiguratorDB.js----');
                util.logData(err);
            });

            var reportTypeSql = "";
            if(data.type === "1"){
                //console.log("Overall");
                reportTypeSql = "";
                
            }else if(data.type === "2"){
                //console.log("Support group wise");
                reportTypeSql = "SELECT id sgId,LEVELSHORTDESC sgName FROM SUPPORTGROUPLEVEL WHERE "+
                " CLIENTID=" + data.clientId + " AND DeleteFlag=0 AND group_level != 0 ORDER BY id";
                tableDefinationArray.unshift({id:0, name:"Support group", field:"type"});
               

            }else if(data.type === "3"){
                //console.log("Category wise");
                var mainCategory = "SELECT id FROM TICKETATTRIBUTES where ATTRID = 1 AND CLIENTID = "+ data.clientId +" "+
                " and PARENT_ID = 0 and DeleteFlag = '0' and attrHeaderMstId in "+
                " (SELECT id FROM attributesHeaderMst where ticket_type = "+ data.ticketType +" and DeleteFlag = '0') LIMIT 1";

                reportTypeSql = "SELECT id ,ATTRVAL FROM TICKETATTRIBUTES where ATTRID "+
                        " = 1 AND CLIENTID = "+ data.clientId +" and PARENT_ID = ("+mainCategory+")";

                tableDefinationArray.unshift({id:0, name:"Category", field:"type"});
                
            }else if(data.type === "4"){
                //console.log("Ticket type wise");
                reportTypeSql = "SELECT distinct ticketTypeId, ticketTypeVal ticketType FROM ticket_report where clientid = " + data.clientId +
                " and DeleteFlag = '0'";

                tableDefinationArray.unshift({id:0, name:"Ticket Type/Service Type", field:"type"});
            }
            //console.log( " Report Type SQL ==>> " + reportTypeSql);
            if(reportTypeSql === ""){
                callback(null, ["all"]);
            }else{
                con.query(reportTypeSql, function (err, results, fields) {
                    if (err) {
                        util.logData('---Error from getCSATReport inside ReportConfiguratorDB.js----');
                        util.logData(err);
                        cb(err, null);
                    } else {
                        //console.log("Get Report Type");
                        if (results.length > 0) {
                            callback(null, results);
                            //console.log(results);
                        }else{
                            cb(null, false, "No data found for type");
                        }
                    }
                });
            }
        },
        function getReportData(reportTypeResult, callback) {
            //console.log("getReportData -----------");
            async.eachSeries(Object.keys(reportTypeResult), function (key, loopcallback){
                var resultType = "";
                var conditionQuery = "";
                var conditionQueryWFC = "";
                // Types
                if(data.type === "1"){
                    //console.log("Overall 2");
                    conditionQuery = " ";
                    conditionQueryWFC = " ";
                }else if(data.type === "2"){
                    var sgTypeID = reportTypeResult[key].sgId;
                    resultType = reportTypeResult[key].sgName;

                    conditionQuery = " and (select wfcl.supportGroupLevelId from WFCCLIENTRESULT_report wfcl where wfcl.PKFIELDVAL = csat.ticket_id and wfcl.DeleteFlag = '0' order by wfcl.id desc limit 1,1) = "+sgTypeID;
                    conditionQueryWFC = " and (select wfcl.supportGroupLevelId from WFCCLIENTRESULT_report wfcl where wfcl.PKFIELDVAL = csat.ticket_id and wfcl.DeleteFlag = '0' order by wfcl.id desc limit 1,1) = "+sgTypeID;

                }else if(data.type === "3"){
                    conditionQuery = " and t.working_category = "+reportTypeResult[key].id+" ";
                    conditionQueryWFC = " and y.working_category = "+reportTypeResult[key].id+" ";
                    resultType = reportTypeResult[key].ATTRVAL;
                }else if(data.type === "4"){
                    var ticketTypeID = reportTypeResult[key].ticketTypeId;
                    resultType = reportTypeResult[key].ticketType;
                    conditionQuery = " and t.ticketTypeId = "+ticketTypeID+" ";
                    conditionQueryWFC = " and y.ticketTypeId = "+ticketTypeID+" ";
                }
                // Filters
                var conditionQueryFilter = "";
                if(data.filter === "1"){
                    //console.log("Daily");
                    conditionQueryFilter = " and DATE(t.createdate) = CURRENT_DATE()";
                }else if(data.filter === "2"){
                    //console.log("Weekly");
                    conditionQueryFilter = " and  YEARWEEK(t.createdate) = YEARWEEK(CURRENT_DATE())";
                }else if(data.filter === "3"){
                    //console.log("Monthly");
                    conditionQueryFilter = " and  MONTH(t.createdate) = MONTH(CURRENT_DATE())";
                }else if(data.filter === "4"){
                    //console.log("Quarterly");
                    conditionQueryFilter = " and  QUARTER(t.createdate) = QUARTER(CURRENT_DATE())";
                }else if(data.filter === "5"){
                    //console.log("Yearly");
                    conditionQueryFilter = " and  YEAR(t.createdate) = YEAR(CURRENT_DATE())";
                }else if(data.filter === "7"){
                    //console.log("Till Date");
                    conditionQueryFilter = " and date_format (ADDTIME(t.createdate, '5:30:0.000000'),'%Y-%m-%d') <= '" + data.tillDate +"'";
                }else if(data.filter === "6"){
                    //console.log("From and to date");
                    conditionQueryFilter = " and date_format (ADDTIME(t.createdate, '5:30:0.000000'),'%Y-%m-%d') between '"+ data.fromdate +"' and '"+ data.todate +"'";
                }
                conditionQuery = conditionQuery + conditionQueryFilter;
                var objForTable = {id: idCount, type: resultType};
                var objForVol = {id: idCount, type: resultType};
                var volArray =  []
                var objForPie = {id: idCount, type: resultType};
                //var idCount = 1;
                async.eachSeries(Object.keys(tableDefinationArray), function (key, loopcallback2){
                //for (var key in tableDefinationArray) {
                    var reportFieldName =  tableDefinationArray[key].field;
                    var csatId =  tableDefinationArray[key].id;
                    //console.log("csatId -----------");
                    //console.log(csatId);
                    if(tableDefinationArray[key].id !== 0){
                        //continue; 
                        //loopcallback2();               
                        //var funcArr = {getTotalTicket, getCSATCount};
                        var funcArr = {getCSATCount};
                        async.parallel(funcArr,
                            function (err, results) {
                                if (err) {
                                    util.logData('---Error from getCSATReport inside ReportConfiguratorDB.js----');
                                    util.logData(err);
                                } else {
                                    //console.log(results);
                                    var csatPercentage = 0;
                                    //var totalTicket = results.getTotalTicket;
                                    var csatCount = results.getCSATCount;
                                    // if(csatCount === '0' || csatCount === 0){
                                    //     csatPercentage = 0;
                                    // }else{
                                    //     csatPercentage = Math.round((Number(csatCount)/Number(totalTicket))*100);
                                    // }
                                    
                                    objForTable[reportFieldName] = csatCount;
                                    volArray.push({grpName: reportFieldName, grpValue: csatCount});
                                    loopcallback2();
                                    // pieArray.push({id: idCount,
                                    //     name: resultType,
                                    //     value: Number(results.countOpenTicket)+Number(results.countCloseTicket),
                                    // });
                                }
                                
                                
                            
                            });
                        }
                        else{
                            loopcallback2();
                        }
                        
                    function getCSATCount(callback) {
                        var getCSATCountSQL_old = "SELECT count(t.id) csat  FROM WFCCLIENTRESULT_report w, ticket_report t, ticketwise_csat_form csat where "+
                        " w.PKFIELDVAL = t.id and w.PKFIELDVAL = csat.ticket_id and t.DeleteFlag='0' and t.clientid="+data.clientId+" "+conditionQuery+" "+
                        " and csat.csat_scrore = "+csatId+" and csat.deleteflag ='0' and w.id IN (SELECT MAX(x.id) FROM "+
                        " WFCCLIENTRESULT_report x, ticket_report y WHERE x.PKFIELDVAL = y.id AND y.clientid = "+data.clientId+" "+conditionQueryWFC+" GROUP BY x.PKFIELDVAL);"
                        
                        
                        var getCSATCountSQL = "SELECT count(*) csat from (SELECT t.id csat FROM WFCCLIENTRESULT_report w, ticket_report t, "+
                        " ticketwise_csat_form csat where  w.PKFIELDVAL = t.id and w.PKFIELDVAL = csat.ticket_id and csat.csat_scrore = "+csatId+" and "+
                        " t.DeleteFlag='0' and t.clientid= "+data.clientId+ " "+
                        " and csat.deleteflag ='0' "+conditionQuery+" group by w.PKFIELDVAL) as CSATResult;";

                        
                        console.log("SQL getCSATCountSQL --> " + getCSATCountSQL);



                        con.query(getCSATCountSQL, function (err, result) {
                            if (err) {
                                util.logData('---Error from getCSATReport inside ReportConfiguratorDB.js----');
                                util.logData(err);
                                cb(err, null);
                            } else {
                                if(result[0].csat === null){
                                    callback(null, 0);
                                }
                                else{
                                    callback(null, result[0].csat);
                                }
                                
                            }
                    
                        });
                    }
        
                    function getTotalTicket(callback){
                        var getTotalTicketSQL = "SELECT COUNT(DISTINCT t.id) total FROM WFCCLIENTRESULT_report w, ticket_report t where "+
                        " w.PKFIELDVAL = t.id and t.DeleteFlag='0' and t.clientid="+data.clientId+" "+conditionQuery+" "+
                        " and w.id IN (SELECT MAX(x.id) FROM "+
                        " WFCCLIENTRESULT_report x, ticket_report y WHERE x.PKFIELDVAL = y.id AND y.clientid = "+data.clientId+" "+conditionQueryWFC+" GROUP BY x.PKFIELDVAL);"
                        //console.log("SQL getTotalTicket --> " + getTotalTicketSQL);
                        con.query(getTotalTicketSQL, function (err, result) {
                            if (err) {
                                util.logData('---Error from getCSATReport inside ReportConfiguratorDB.js----');
                                util.logData(err);
                                cb(err, null);
                            } else {
                                callback(null, result[0].total);
                            }
                        });
                    } 
                    //loopcallback2();
                }, function(err) {
                    console.log('iterating done ' + resultType);
                    //console.log(volArray);
                    idCount = idCount + 1;
                    tableArray.push(objForTable);
                    volumeArray.push({id: idCount,
                        type: resultType,
                        volume: volArray,
                    });
                    loopcallback();
                });
                
            }, function(err) {
                console.log('iterating done for Result');
                resArray.push({tabledata: tableArray,
                    voldata: volumeArray,
                    piedata: pieArray,
                    tableDef: tableDefinationArray,
                });
                //console.log(volumeArray);
                console.log(resArray);
                cb(null, true, resArray);
            });

        },

    ],
    function (err) {
        if (err) {
            throw new Error(err);
        } else {
            util.logData(err);
        }
    });
}

function getEscalationReport(data, cb) {
    //console.log(data);
    var resArray = [];
    var tableArray = [];
    var volumeArray = [];
    var pieArray = [];
    var idCount = 1;
    var tableDefinationArray = [];
    async.waterfall([
        function getReportType(callback) {
            var reportTypeSql = "";
            if(data.type === "1"){
                //console.log("Overall");
                reportTypeSql = "";
                tableDefinationArray = [{id:2, name:"Total Open Tickets (Escalated)", field:"openTickets"},
                            {id:3, name:"Total Closed Tickets (Escalated)", field:"closedTickets"},
                            {id:4, name:"Escalation By User (%)", field:"escalation"},
                            {id:5, name:"Average Response time(minutes)", field:"avResponsetime"},
                            {id:6, name:"Average Resolution time(minutes)", field:"avResolutionTime"}
                        ]; 
            }else if(data.type === "2"){
                //console.log("Support group wise");
                reportTypeSql = "SELECT id sgId,LEVELSHORTDESC sgName FROM SUPPORTGROUPLEVEL WHERE "+
                " CLIENTID=" + data.clientId + " AND DeleteFlag=0 ORDER BY id";

                tableDefinationArray = [ {id:1, name:"Support group", field:"type"},
                        {id:2, name:"Total Open Tickets (Escalated)", field:"openTickets"},
                        {id:3, name:"Total Closed Tickets (Escalated)", field:"closedTickets"},
                        {id:4, name:"Escalation By User (%)", field:"escalation"},
                        {id:5, name:"Average Response time(minutes)", field:"avResponsetime"},
                        {id:6, name:"Average Resolution time(minutes)", field:"avResolutionTime"}
                    ];

            }else if(data.type === "3"){
                //console.log("Category wise");
                var mainCategory = "SELECT id FROM TICKETATTRIBUTES where ATTRID = 1 AND CLIENTID = "+ data.clientId +" "+
                " and PARENT_ID = 0 and DeleteFlag = '0' and attrHeaderMstId in "+
                " (SELECT id FROM attributesHeaderMst where ticket_type = "+ data.ticketType +" and DeleteFlag = '0') LIMIT 1";

                reportTypeSql = "SELECT id ,ATTRVAL FROM TICKETATTRIBUTES where ATTRID "+
                        " = 1 AND CLIENTID = "+ data.clientId +" and PARENT_ID = ("+mainCategory+")";

                tableDefinationArray = [ {id:1, name:"Category", field:"type"},
                        {id:2, name:"Total Open Tickets (Escalated)", field:"openTickets"},
                        {id:3, name:"Total Closed Tickets (Escalated)", field:"closedTickets"},
                        {id:4, name:"Escalation By User (%)", field:"escalation"},
                        {id:5, name:"Average Response time(minutes)", field:"avResponsetime"},
                        {id:6, name:"Average Resolution time(minutes)", field:"avResolutionTime"}
                      ];

            }else if(data.type === "4"){
                //console.log("Ticket type wise");
                reportTypeSql = "SELECT distinct ticketTypeId, ticketTypeVal  ticketType FROM ticket_report where clientid = " + data.clientId +
                " and DeleteFlag = '0'";

                tableDefinationArray = [ {id:1, name:"Ticket Type/Service Type", field:"type"},
                        {id:2, name:"Total Open Tickets (Escalated)", field:"openTickets"},
                        {id:3, name:"Total Closed Tickets (Escalated)", field:"closedTickets"},
                        {id:4, name:"Escalation By User (%)", field:"escalation"},
                        {id:5, name:"Average Response time(minutes)", field:"avResponsetime"},
                        {id:6, name:"Average Resolution time(minutes)", field:"avResolutionTime"}
                      ];
            }
            //console.log( " Report Type SQL ==>> " + reportTypeSql);
            if(reportTypeSql === ""){
                callback(null, ["all"]);
            }else{
                con.query(reportTypeSql, function (err, results, fields) {
                    if (err) {
                        util.logData('---Error from getEscalationReport inside ReportConfiguratorDB.js----');
                        util.logData(err);
                        cb(err, null);
                    } else {
                        //console.log(results);
                        if (results.length > 0) {
                            callback(null, results);
                        }else{
                            cb(null, false, "No data found for report type");
                        }
                    }
                });
            }
        },
        function getReportData(reportTypeResult, callback) {
            //console.log(reportTypeResult);
            async.eachSeries(Object.keys(reportTypeResult), function (key, loopcallback){
                var resultType = "";
                var conditionQuery = "";
                var conditionQueryWFC = "";
                var escalationQuery = " and x.tStatus= "+
                " (SELECT id FROM TICKETATTRIBUTES where ATTRID = 2 AND CLIENTID = 7 and "+
                " sequence_no = 7 and DeleteFlag = '0' limit 1) "
                // Types
                if(data.type === "1"){
                    //console.log("Overall 2");
                    conditionQuery = " ";
                    conditionQueryWFC = " ";
                }else if(data.type === "2"){
                    var sgTypeID = reportTypeResult[key].sgId;
                    resultType = reportTypeResult[key].sgName;

                    conditionQuery = " ";
                    conditionQueryWFC = " and x.supportGroupLevelId = "+sgTypeID+" ";
                }else if(data.type === "3"){
                    conditionQuery = " and t.working_category = "+reportTypeResult[key].id+" ";
                    conditionQueryWFC = " and y.working_category = "+reportTypeResult[key].id+" ";
                    resultType = reportTypeResult[key].ATTRVAL;
                }else if(data.type === "4"){
                    var ticketTypeID = reportTypeResult[key].ticketTypeId;
                    resultType = reportTypeResult[key].ticketType;
                    conditionQuery = " and t.ticketTypeId = "+ticketTypeID+" ";
                    conditionQueryWFC = " and y.ticketTypeId = "+ticketTypeID+" ";
                }
                // Filters
                var conditionQueryFilter = "";
                if(data.filter === "1"){
                    //console.log("Daily");
                    conditionQueryFilter = " and DATE(t.createdate) = CURRENT_DATE()";
                }else if(data.filter === "2"){
                    //console.log("Weekly");
                    conditionQueryFilter = " and  YEARWEEK(t.createdate) = YEARWEEK(CURRENT_DATE())";
                }else if(data.filter === "3"){
                    //console.log("Monthly");
                    conditionQueryFilter = " and  MONTH(t.createdate) = MONTH(CURRENT_DATE())";
                }else if(data.filter === "4"){
                    //console.log("Quarterly");
                    conditionQueryFilter = " and  QUARTER(t.createdate) = QUARTER(CURRENT_DATE())";
                }else if(data.filter === "5"){
                    //console.log("Yearly");
                    conditionQueryFilter = " and  YEAR(t.createdate) = YEAR(CURRENT_DATE())";
                }else if(data.filter === "7"){
                    //console.log("Till Date");
                    conditionQueryFilter = " and date_format (ADDTIME(t.createdate, '5:30:0.000000'),'%Y-%m-%d') <= '" + data.tillDate +"'";
                }else if(data.filter === "6"){
                    //console.log("From and to date");
                    conditionQueryFilter = " and date_format (ADDTIME(t.createdate, '5:30:0.000000'),'%Y-%m-%d') between '"+ data.fromdate +"' and '"+ data.todate +"'";
                }
                conditionQuery = conditionQuery + conditionQueryFilter;
                var funcArr = {countCloseTicket, countOpenTicket, getEscalation, avResponsetime, avResolutionTime, getTotalTicket};
                async.parallel(funcArr,
                function (err, results) {
                    if (err) {
                        util.logData('---Error from getEscalationReport inside ReportConfiguratorDB.js----');
                        util.logData(err);
                    } else {
                        //console.log(results);
                        tableArray.push({id: idCount,
                                        type: resultType,
                                        openTickets: results.countOpenTicket,
                                        closedTickets: results.countCloseTicket,
                                        escalation: results.getEscalation,
                                        avResponsetime: results.avResponsetime,
                                        avResolutionTime: results.avResolutionTime
                                    });      
                        var volArray =  [
                                            {grpName: 'Open Tickets', grpValue: results.countOpenTicket},
                                            {grpName: 'Close Tickets', grpValue: results.countCloseTicket}
                                        ]
                        volumeArray.push({id: idCount,
                                        type: resultType,
                                        volume: volArray,
                                    });
                        pieArray.push({id: idCount,
                            name: resultType,
                            value: Number(results.countOpenTicket)+Number(results.countCloseTicket),
                        });
                    }
                    idCount = idCount + 1;
                    loopcallback();
                });

                function countCloseTicket(callback) {
                    var countCloseTicketSQL = "SELECT COUNT(DISTINCT t.id) close FROM WFCCLIENTRESULT_report w, ticket_report t where "+
                    " w.PKFIELDVAL = t.id and t.DeleteFlag='0' and t.clientid="+data.clientId+" "+conditionQuery+" "+
                    " and w.tStatus = (SELECT id FROM TICKETATTRIBUTES where ATTRID = 2 AND CLIENTID = "+data.clientId+" "+
                    " and sequence_no = 0 and DeleteFlag = '0') and w.id IN (SELECT MAX(x.id) FROM "+
                    " WFCCLIENTRESULT_report x, ticket_report y WHERE x.PKFIELDVAL = y.id AND y.clientid = "+data.clientId+" "+conditionQueryWFC+" "+escalationQuery+" GROUP BY x.PKFIELDVAL);"
                    //console.log("SQL countCloseTicket --> " + countCloseTicketSQL);
                    con.query(countCloseTicketSQL, function (err, result) {
                        if (err) {
                            util.logData('---Error from getEscalationReport inside ReportConfiguratorDB.js----');
                            util.logData(err);
                            cb(err, null);
                        } else {
                            callback(null, result[0].close);
                        }
                    });
                }
    
                function countOpenTicket(callback) {
                    var countOpenTicketSQL = "SELECT COUNT(DISTINCT t.id) open FROM WFCCLIENTRESULT_report w, ticket_report t where "+
                    " w.PKFIELDVAL = t.id and t.DeleteFlag='0' and t.clientid="+data.clientId+" "+conditionQuery+" "+
                    " and w.tStatus != (SELECT id FROM TICKETATTRIBUTES where ATTRID = 2 AND CLIENTID = "+data.clientId+" "+
                    " and sequence_no = 0 and DeleteFlag = '0') and w.id IN (SELECT MAX(x.id) FROM "+
                    " WFCCLIENTRESULT_report x, ticket_report y WHERE x.PKFIELDVAL = y.id AND y.clientid = "+data.clientId+" "+conditionQueryWFC+" "+escalationQuery+" GROUP BY x.PKFIELDVAL);"
                    //console.log("SQL countOpenTicket --> " + countOpenTicketSQL);
                    con.query(countOpenTicketSQL, function (err, result) {
                        if (err) {
                            util.logData('---Error from getEscalationReport inside ReportConfiguratorDB.js----');
                            util.logData(err);
                            cb(err, null);
                        } else {
                            callback(null, result[0].open);
                        }
                    });
                }
                function getEscalation(callback) {
                    var slaComplianceTotalSQL = "SELECT COUNT(DISTINCT t.id) total FROM WFCCLIENTRESULT w, ticket t where "+
                    " w.PKFIELDVAL = t.id and t.DeleteFlag='0' and t.clientid="+data.clientId+" "+conditionQuery+" "+
                    " and w.id IN (SELECT MAX(x.id) FROM "+
                    " WFCCLIENTRESULT_report x, ticket_report y WHERE x.PKFIELDVAL = y.id AND y.clientid = "+data.clientId+" "+conditionQueryWFC+" GROUP BY x.PKFIELDVAL);"
                    //console.log("SQL slaCompliance Total --> " + slaComplianceTotalSQL);
                    con.query(slaComplianceTotalSQL, function (err, result) {
                        if (err) {
                            util.logData('---Error from getEscalationReport inside ReportConfiguratorDB.js----');
                            util.logData(err);
                            cb(err, null);
                        } else {
                            //cb(null, result[0].total);
                            var escalationSQL = "SELECT COUNT(DISTINCT t.id) escalated FROM WFCCLIENTRESULT_report w, "+
                            " ticket_report t where w.PKFIELDVAL = t.id and t.DeleteFlag='0' and t.clientid="+data.clientId+" "+conditionQuery+" "+
                            " and w.id IN (SELECT MAX(x.id) FROM WFCCLIENTRESULT_report x, ticket_report y WHERE "+
                            " x.PKFIELDVAL = y.id AND y.clientid = "+data.clientId+" "+conditionQueryWFC+" "+escalationQuery+" GROUP BY x.PKFIELDVAL)"

                            //console.log("SQL Escalation --> " + escalationSQL);
                            con.query(escalationSQL, function (err, result2) {
                                if (err) {
                                    util.logData(err);
                                    cb(err, null);
                                } else {
                                    var escalationPer = 0;
                                    var totalTicket = result[0].total;
                                    var escalatedCount = result2[0].escalated;
                                    if(escalatedCount === '0' || escalatedCount === 0){
                                        escalationPer = 0;
                                    }else{
                                        escalationPer = Math.round((Number(escalatedCount)/Number(totalTicket))*100);
                                    }
                                    
                                    //console.log("Escalated Count - " + escalatedCount);
                                    //console.log("Total Ticket - " + totalTicket);
                                    //console.log("Escalation Percentage - " + escalationPer);
                                    callback(null, escalationPer);
                                }
                       
                            });  
                        }
                    });
                }
    
                function avResponsetime(callback) {
                    var slaComplianceSQL = "SELECT ROUND(AVG(sla_response_period),2) avRes FROM WFCCLIENTRESULT_report w, ticket_report t, ticket_sla_response_dtls_report sla where "+
                    " w.PKFIELDVAL = t.id and w.PKFIELDVAL = sla.ticketId and t.DeleteFlag='0' and t.clientid="+data.clientId+" "+conditionQuery+" "+
                    " and sla.response_datetime > COALESCE (sla.response_stop_datetime,Now()) and w.id IN (SELECT MAX(x.id) FROM "+
                    " WFCCLIENTRESULT_report x, ticket_report y WHERE x.PKFIELDVAL = y.id AND y.clientid = "+data.clientId+" "+conditionQueryWFC+" "+escalationQuery+" GROUP BY x.PKFIELDVAL);"
                    //console.log("SQL slaCompliance --> " + slaComplianceSQL);
                    con.query(slaComplianceSQL, function (err, result) {
                        if (err) {
                            util.logData('---Error from getEscalationReport inside ReportConfiguratorDB.js----');
                            util.logData(err);
                            cb(err, null);
                        } else {
                            if(result[0].avRes === null){
                                callback(null, 0);
                            }
                            else{
                                callback(null, result[0].avRes);
                            }
                            
                        }
                
                    });
                   
                }
                function avResolutionTime(callback) {
                    var avResolutionTimeSQL = "SELECT ROUND(AVG(sla_resolution_period),2) avResol FROM WFCCLIENTRESULT_report w, ticket_report t, ticket_sla_response_dtls_report sla where "+
                    " w.PKFIELDVAL = t.id and w.PKFIELDVAL = sla.ticketId and t.DeleteFlag='0' and t.clientid="+data.clientId+" "+conditionQuery+" "+
                    " and sla.response_datetime > COALESCE (sla.response_stop_datetime,Now()) and w.id IN (SELECT MAX(x.id) FROM "+
                    " WFCCLIENTRESULT_report x, ticket_report y WHERE x.PKFIELDVAL = y.id AND y.clientid = "+data.clientId+" "+conditionQueryWFC+" "+escalationQuery+" GROUP BY x.PKFIELDVAL);"
                    //console.log("SQL avResolutionTime --> " + avResolutionTimeSQL);
                    con.query(avResolutionTimeSQL, function (err, result) {
                        if (err) {
                            util.logData('---Error from getEscalationReport inside ReportConfiguratorDB.js----');
                            util.logData(err);
                            cb(err, null);
                        } else {
                            if(result[0].avResol === null){
                                callback(null, 0);
                            }
                            else{
                                callback(null, result[0].avResol);
                            }
                            
                        }
                
                    });
                }
    
                function getTotalTicket(callback){
                    var getTotalTicketSQL = "SELECT COUNT(DISTINCT t.id) total FROM WFCCLIENTRESULT_report w, ticket_report t where "+
                    " w.PKFIELDVAL = t.id and t.DeleteFlag='0' and t.clientid="+data.clientId+" "+conditionQuery+" "+
                    " and w.id IN (SELECT MAX(x.id) FROM "+
                    " WFCCLIENTRESULT_report x, ticket_report y WHERE x.PKFIELDVAL = y.id AND y.clientid = "+data.clientId+" "+conditionQueryWFC+" GROUP BY x.PKFIELDVAL);"
                    //console.log("SQL getTotalTicket --> " + getTotalTicketSQL);
                    con.query(getTotalTicketSQL, function (err, result) {
                        if (err) {
                            util.logData('---Error from getEscalationReport inside ReportConfiguratorDB.js----');
                            util.logData(err);
                            cb(err, null);
                        } else {
                            callback(null, result[0].total);
                        }
                    });
                }   
                
                   
            }, function(err) {
                console.log('iterating done');
                resArray.push({tabledata: tableArray,
                    voldata: volumeArray,
                    piedata: pieArray,
                    tableDef: tableDefinationArray,
                });
                //console.log(resArray);
                cb(null, true, resArray);
            });

        },

    ],
    function (err) {
        if (err) {
            throw new Error(err);
        } else {
            util.logData(err);
        }
    });
}

function getProductivityReport(data, cb) {
    //console.log(data);
    var resArray = [];
    var tableArray = [];
    var volumeArray = [];
    var pieArray = [];
    var pieArrayTeam = [];
    var idCount = 1;
    var tableDefinationArray = [];
    async.waterfall([
        function getReportType(callback) {
            var reportTypeSql = "";
            if(data.type === "1"){
                //console.log("Overall");
                
                reportTypeSql = "SELECT id sgId,LEVELSHORTDESC sgName FROM SUPPORTGROUPLEVEL WHERE "+
                " CLIENTID=" + data.clientId + " AND group_level != 0 AND DeleteFlag=0 ORDER BY id";

                tableDefinationArray = [ {id:1, name:"Support group", field:"type"},
                            {id:2, name:"Analyst", field:"analyst"},
                            {id:3, name:"Total Solved Tickets", field:"totalticket"},
                            {id:4, name:"SLA Compliance (%)", field:"slaCompliance"},
                            {id:5, name:"Average Response time(minutes)", field:"avResponsetime"},
                            {id:6, name:"Average Resolution time(minutes)", field:"avResolutionTime"}
                        ]; 
            }else if(data.type === "2"){
                //console.log("Support group wise");
                reportTypeSql = "SELECT id sgId,LEVELSHORTDESC sgName FROM SUPPORTGROUPLEVEL WHERE "+
                " CLIENTID=" + data.clientId + " AND id in ("+data.team+") AND DeleteFlag=0 ORDER BY id";

                tableDefinationArray = [ {id:1, name:"Support group", field:"type"},
                            {id:2, name:"Analyst", field:"analyst"},
                            {id:3, name:"Total Solved Tickets", field:"totalticket"},
                            {id:4, name:"SLA Compliance (%)", field:"slaCompliance"},
                            {id:5, name:"Average Response time(minutes)", field:"avResponsetime"},
                            {id:6, name:"Average Resolution time(minutes)", field:"avResolutionTime"}
                        ]; 
            }
            //console.log( " Report Type SQL ==>> " + reportTypeSql);
            if(reportTypeSql === ""){
                callback(null, ["all"]);
            }else{
                con.query(reportTypeSql, function (err, results, fields) {
                    if (err) {
                        util.logData('---Error from getProductivityReport inside ReportConfiguratorDB.js----');
                        util.logData(err);
                        cb(err, null);
                    } else {
                        //console.log(results);
                        if (results.length > 0) {
                            callback(null, results);
                        }else{
                            cb(null, false, "No data found for type");
                        }
                    }
                });
            }
        },
        function getReportData(reportTypeResult, callback) {
            //console.log(reportTypeResult);
            async.eachSeries(Object.keys(reportTypeResult), function (key, loopcallback){
                var resultType = "";
                var conditionQuery = "";
                var conditionQueryWFC = "";
                // Types
                if(data.type === "1"){
                    var sgTypeID = reportTypeResult[key].sgId;
                    resultType = reportTypeResult[key].sgName;
                    conditionQuery = " ";
                    //conditionQueryWFC = " and x.supportGroupLevelId = "+sgTypeID+" ";
                    conditionQueryWFC = " and x.frw_user_id = us.userId and us.supportGroupLevelId = "+ sgTypeID +" ";
                }else if(data.type === "2"){
                    var sgTypeID = reportTypeResult[key].sgId;
                    resultType = reportTypeResult[key].sgName;

                    conditionQuery = " ";
                    //conditionQueryWFC = " and x.supportGroupLevelId = "+sgTypeID+" ";

                    conditionQueryWFC = " and x.frw_user_id = us.userId and us.supportGroupLevelId = "+ sgTypeID +" ";
                }
                // Filters
                var conditionQueryFilter = "";
                if(data.filter === "1"){
                    conditionQueryFilter = " and DATE(y.createdate) = CURRENT_DATE()";
                }else if(data.filter === "2"){
                    conditionQueryFilter = " and  YEARWEEK(y.createdate) = YEARWEEK(CURRENT_DATE())";
                }else if(data.filter === "3"){
                    conditionQueryFilter = " and  MONTH(y.createdate) = MONTH(CURRENT_DATE())";
                }else if(data.filter === "4"){
                    conditionQueryFilter = " and  QUARTER(y.createdate) = QUARTER(CURRENT_DATE())";
                }else if(data.filter === "5"){
                    conditionQueryFilter = " and  YEAR(y.createdate) = YEAR(CURRENT_DATE())";
                }else if(data.filter === "7"){
                    conditionQueryFilter = " and date_format (ADDTIME(y.createdate, '5:30:0.000000'),'%Y-%m-%d') <= '" + data.tillDate +"'";
                }else if(data.filter === "6"){
                    conditionQueryFilter = " and date_format (ADDTIME(y.createdate, '5:30:0.000000'),'%Y-%m-%d') between '"+ data.fromdate +"' and '"+ data.todate +"'";
                }
                //conditionQuery = conditionQuery + conditionQueryFilter;
                conditionQueryWFC = conditionQueryWFC + conditionQueryFilter;

                var teamSql = "SELECT distinct(x.frw_user_id) analystID, (select NAME from USER where id= x.frw_user_id) analystName FROM WFCCLIENTRESULT_report x, ticket_report y, supportGroupUser us "+
                " WHERE x.PKFIELDVAL = y.id AND y.clientid = "+data.clientId+" "+conditionQueryWFC+" and x.tStatus= "+
                " (SELECT id FROM TICKETATTRIBUTES where ATTRID = 2 AND CLIENTID = "+data.clientId+" "+
                " and sequence_no = 2 and DeleteFlag = '0' limit 1)  GROUP BY x.PKFIELDVAL";

                //console.log("SQL solutionProvider --> " + teamSql);
                con.query(teamSql, function (err, resultsTeam) {
                    if (err) {
                        util.logData('---Error from getProductivityReport inside ReportConfiguratorDB.js----');
                        util.logData(err);
                        cb(err, null);
                    } else {
                        if(resultsTeam.length > 0){
                            var volArray =  [];
                            var countTotalSolved = 0;
                            var analystID = 0;
                            //conditionQueryWFC = conditionQueryWFC + " and x.frw_user_id = " + analystID;
                            async.eachSeries(Object.keys(resultsTeam), function (key2, loopcallback2){
                                analystID = resultsTeam[key2].analystID; 
                                var analystName = resultsTeam[key2].analystName         
                                //console.log("For Analyst --------------- " + analystName);
                                //console.log("For Analyst ID --------------- " + analystID);                
                                
                                var funcArr = {countSolvedTicket, slaCompliance, avResponsetime, avResolutionTime};
                                async.parallel(funcArr,
                                    function (err, results) {
                                        if (err) {
                                            util.logData(err);
                                        } else {
                                            //console.log(results);
                                            tableArray.push({id: idCount,
                                                            type : resultType,
                                                            analyst : analystName,
                                                            totalticket: results.countSolvedTicket,
                                                            slaCompliance: results.slaCompliance,
                                                            avResponsetime: results.avResponsetime,
                                                            avResolutionTime: results.avResolutionTime
                                                        });  
                                            volArray.push({id: idCount,
                                                grpName : analystName,
                                                grpValue: results.countSolvedTicket,
                                            
                                            }); 
                                            
                                            // var volArray =  [
                                            //                     {grpName: 'Open Tickets', grpValue: results.countOpenTicket},
                                            //                     {grpName: 'Close Tickets', grpValue: results.countCloseTicket}
                                            //                 ]
                                            
                                            countTotalSolved = countTotalSolved + results.countSolvedTicket;
                                            pieArray.push({id: idCount,
                                                name: analystName,
                                                value: results.countSolvedTicket,
                                            });
                                        }
                                        idCount = idCount + 1;
                                        
                                        loopcallback2();
                                    });

                
    
                                function countSolvedTicket(callback) {
                                    var countOpenTicketSQL = " select count(result.id) solved from (SELECT y.id "+
                                    " FROM WFCCLIENTRESULT_report x, ticket_report y, supportGroupUser us "+
                                    " WHERE x.PKFIELDVAL = y.id AND y.clientid = "+data.clientId+" "+conditionQueryWFC+" and x.frw_user_id = " +analystID+" and x.tStatus= "+
                                    " (SELECT id FROM TICKETATTRIBUTES where ATTRID = 2 AND CLIENTID = "+data.clientId+" "+
                                    " and sequence_no = 2 and DeleteFlag = '0' limit 1)  GROUP BY x.PKFIELDVAL) result";
                                    //console.log("SQL countSolvedTicket --> " + countOpenTicketSQL);
                                    con.query(countOpenTicketSQL, function (err, result) {
                                        if (err) {
                                            util.logData('---Error from getProductivityReport inside ReportConfiguratorDB.js----');
                                            util.logData(err);
                                            cb(err, null);
                                        } else {
                                            //console.log("solved ---> ");
                                            //console.log(result[0].solved);
                                            callback(null, result[0].solved);
                                        }
                                    });
                                }

                                function slaCompliance(callback) {
                                    var slaComplianceTotalSQL = " select count(result.id) solved from (SELECT y.id "+
                                    " FROM WFCCLIENTRESULT_report x, ticket_report y, supportGroupUser us "+
                                    " WHERE x.PKFIELDVAL = y.id AND y.clientid = "+data.clientId+" "+conditionQueryWFC+" and x.frw_user_id = " +analystID+" and x.tStatus= "+
                                    " (SELECT id FROM TICKETATTRIBUTES where ATTRID = 2 AND CLIENTID = "+data.clientId+" "+
                                    " and sequence_no = 2 and DeleteFlag = '0' limit 1)  GROUP BY x.PKFIELDVAL) result";
                                    //console.log("SQL slaCompliance Total --> " + slaComplianceTotalSQL);
                                    con.query(slaComplianceTotalSQL, function (err, result) {
                                        if (err) {
                                            util.logData('---Error from getProductivityReport inside ReportConfiguratorDB.js----');
                                            util.logData(err);
                                            cb(err, null);
                                        } else {
                                            //cb(null, result[0].total);
                                            var slaComplianceSQL = " select count(result.id) sla from (SELECT y.id "+
                                            " FROM WFCCLIENTRESULT_report x, ticket_report y, supportGroupUser us, ticket_sla_response_dtls sla "+
                                            " WHERE x.PKFIELDVAL = y.id AND y.clientid = "+data.clientId+" "+conditionQueryWFC+" and x.frw_user_id = " +analystID+" and x.tStatus= "+
                                            " (SELECT id FROM TICKETATTRIBUTES where ATTRID = 2 AND CLIENTID = "+data.clientId+" "+
                                            " and sequence_no = 2 and DeleteFlag = '0' limit 1) and x.PKFIELDVAL = sla.ticketId and sla.response_datetime > COALESCE (sla.response_stop_datetime,Now())  GROUP BY x.PKFIELDVAL) result";

                                            //console.log("SQL slaCompliance --> " + slaComplianceSQL);
                                            con.query(slaComplianceSQL, function (err, result2) {
                                                if (err) {
                                                    util.logData(err);
                                                    cb(err, null);
                                                } else {
                                                    var compliance = 0;
                                                    var totalTicket = result[0].solved;
                                                    var nonViolated = result2[0].sla;
                                                    if(nonViolated === '0' || nonViolated === 0){
                                                        compliance = 0;
                                                    }else{
                                                        compliance = Math.round((Number(nonViolated)/Number(totalTicket))*100);
                                                    }
                                                    
                                                    //console.log("SLA Non Violated - " + nonViolated);
                                                    //console.log("Total Ticket - " + totalTicket);
                                                    //console.log("SLA Compliance - " + compliance);
                                                    callback(null, compliance);
                                                }
                                    
                                            });  
                                        }
                                    });
                                }
    
                                function avResponsetime(callback) {
                                   
                                    var avResponsetimeSQL = " select count(result.avRes1) avRes from (SELECT ROUND(AVG(sla.sla_response_period),2) avRes1 "+
                                            " FROM WFCCLIENTRESULT_report x, ticket_report y, supportGroupUser us, ticket_sla_response_dtls sla "+
                                            " WHERE x.PKFIELDVAL = y.id AND y.clientid = "+data.clientId+" "+conditionQueryWFC+" and x.frw_user_id = " +analystID+" and x.tStatus= "+
                                            " (SELECT id FROM TICKETATTRIBUTES where ATTRID = 2 AND CLIENTID = "+data.clientId+" "+
                                            " and sequence_no = 2 and DeleteFlag = '0' limit 1) and x.PKFIELDVAL = sla.ticketId and sla.response_datetime > COALESCE (sla.response_stop_datetime,Now())  GROUP BY x.PKFIELDVAL) result";
                                    
                                    //console.log("SQL avResponsetimeSQL --> " + avResponsetimeSQL);
                                    con.query(avResponsetimeSQL, function (err, result) {
                                        if (err) {
                                            util.logData('---Error from getProductivityReport inside ReportConfiguratorDB.js----');
                                            util.logData(err);
                                            cb(err, null);
                                        } else {
                                            if(result[0].avRes === null){
                                                callback(null, 0);
                                            }
                                            else{
                                                callback(null, result[0].avRes);
                                            }
                                            
                                        }
                                
                                    });
                                
                                }

                                function avResolutionTime(callback) {
                                   var avResolutionTimeSQL = " select count(result.avRes1) avResol from (SELECT ROUND(AVG(sla.sla_resolution_period),2) avRes1 "+
                                            " FROM WFCCLIENTRESULT_report x, ticket_report y, supportGroupUser us, ticket_sla_response_dtls sla "+
                                            " WHERE x.PKFIELDVAL = y.id AND y.clientid = "+data.clientId+" "+conditionQueryWFC+" and x.frw_user_id = " +analystID+" and x.tStatus= "+
                                            " (SELECT id FROM TICKETATTRIBUTES where ATTRID = 2 AND CLIENTID = "+data.clientId+" "+
                                            " and sequence_no = 2 and DeleteFlag = '0' limit 1) and x.PKFIELDVAL = sla.ticketId and sla.response_datetime > COALESCE (sla.response_stop_datetime,Now())  GROUP BY x.PKFIELDVAL) result";
                                    
                                    //console.log("SQL avResolutionTime --> " + avResolutionTimeSQL);
                                    con.query(avResolutionTimeSQL, function (err, result) {
                                        if (err) {
                                            util.logData('---Error from getProductivityReport inside ReportConfiguratorDB.js----');
                                            util.logData(err);
                                            cb(err, null);
                                        } else {
                                            if(result[0].avResol === null){
                                                callback(null, 0);
                                            }
                                            else{
                                                callback(null, result[0].avResol);
                                            }
                                            
                                        }
                                
                                    });
                                }
                           
                            }, function(err) {
                                //console.log('Team iterating done');
                                volumeArray.push({id: idCount,
                                    type: resultType,
                                    volume: volArray,
                                });
                                pieArrayTeam.push({id: idCount,
                                    name: resultType,
                                    value: countTotalSolved,
                                });
                                loopcallback();
                            });

                        }
                        else{
                            //cb(null, false, "No data found for Analyst"); 
                            loopcallback();
                        }

                    }
                });
   
            }, function(err) {
                console.log('iterating done');
                resArray.push({tabledata: tableArray,
                    voldata: volumeArray,
                    piedata: pieArray,
                    piedatateam: pieArrayTeam,
                    tableDef: tableDefinationArray,
                });
                //console.log(resArray);
                cb(null, true, resArray);
            });

        },

    ],
    function (err) {
        if (err) {
            throw new Error(err);
        } else {
            util.logData(err);
        }
    });
}

function getProductivityTeam(data, cb){
    //console.log(data);
    teamSql = "SELECT id,LEVELSHORTDESC name FROM SUPPORTGROUPLEVEL WHERE "+
                " CLIENTID=" + data.clientId + " AND group_level != 0 AND DeleteFlag=0 ORDER BY id";

    //console.log("SQL getProductivityTeam --> " + teamSql);
    con.query(teamSql, function (err, result) {
        if (err) {
            util.logData('---Error from getProductivityTeam inside ReportConfiguratorDB.js----');
            util.logData(err);
            cb(err, null);
        } else {
            cb(null, true, result);
        }
    });
}


    function getTrendReport(data, cb) {
    console.log(data);
    var resArray = [];
    var trendArray = [];
    var idCount = 1;
    async.waterfall([
            function getReportType(callback) {
                var reportTypeSql = "";
                if(data.type === "1"){
                    reportTypeSql = "";

                }else if(data.type === "2"){
                    reportTypeSql = "SELECT id,LEVELSHORTDESC type FROM SUPPORTGROUPLEVEL WHERE "+
                        " CLIENTID=" + data.clientId + " AND group_level != 0 AND DeleteFlag=0 ORDER BY id";

                }else if(data.type === "3"){
                    var mainCategory = "SELECT id FROM TICKETATTRIBUTES where ATTRID = 1 AND CLIENTID = "+ data.clientId +" "+
                        " and PARENT_ID = 0 and DeleteFlag = '0' and attrHeaderMstId in "+
                        " (SELECT id FROM attributesHeaderMst where ticket_type = "+ data.ticketType +" and DeleteFlag = '0') LIMIT 1";

                    reportTypeSql = "SELECT id ,ATTRVAL type FROM TICKETATTRIBUTES where ATTRID "+
                        " = 1 AND CLIENTID = "+ data.clientId +" and PARENT_ID = ("+mainCategory+")";

                }else if(data.type === "4"){
                    reportTypeSql = "SELECT distinct ticketTypeId id, ticketTypeVal type FROM ticket_report where clientid = " + data.clientId +
                        " and DeleteFlag = '0'";
                }
                //console.log( " Report Type SQL ==>> " + reportTypeSql);
                if(reportTypeSql === ""){
                    callback(null, ["all"]);
                }else{
                    con.query(reportTypeSql, function (err, results, fields) {
                        if (err) {
                            util.logData('---Error from getCSATReport inside ReportConfiguratorDB.js----');
                            util.logData(err);
                            cb(err, null);
                        } else {
                            //console.log(results);
                            if (results.length > 0) {
                                callback(null, results);
                            }else{
                                cb(null, false, "No data found for type");
                            }
                        }
                    });
                }
            },
            function getReportData(reportTypes, callback) {
                var timeStampQuery = "";
                var groupbyQuery = "";
                var selectDate = "";
                if(data.filter === "1"){
                    //Daily Trend (for the month)
                    timeStampQuery = " and  MONTH(w.createdate) = MONTH(CURRENT_DATE()) ";
                    groupbyQuery = "  group by DATE(selecteddate) order by selecteddate ";
                    selectDate = " date_format(selecteddate,'%d-%b-%y') date, ";

                }else if(data.filter === "2"){
                    //Weekly (for the month)
                    timeStampQuery = " and  MONTH(w.createdate) = MONTH(CURRENT_DATE()) ";
                    groupbyQuery = "  group by week(selecteddate) order by selecteddate ";
                    selectDate = " IF( month(SUBDATE(selecteddate, dayofweek(selecteddate) - 1)) = month(selecteddate), "+
                        " date_format(SUBDATE(selecteddate, dayofweek(selecteddate) - 1), '%d-%b-%y'), DATE_FORMAT(selecteddate,'01-%b-%y') ) date, ";

                }else if(data.filter === "3"){
                    //Monthly (for 3 months)
                    timeStampQuery = " and w.createdate >= now()-interval 3 month";
                    groupbyQuery = "  group by MONTH(selecteddate) order by selecteddate ";
                    selectDate = " DATE_FORMAT(selecteddate,'01-%b-%y') date, ";

                }else if(data.filter === "4"){
                    //Quarterly (for 4 quarters) QUARTER
                    timeStampQuery = " and w.createdate >= now()-interval 4 quarter";
                    groupbyQuery = "  group by QUARTER(selecteddate) order by selecteddate ";
                    selectDate = " CASE QUARTER(selecteddate) "+
                        " WHEN 1 THEN DATE_FORMAT(selecteddate, '01-Jan-%y') "+
                        " WHEN 2 THEN DATE_FORMAT(selecteddate, '01-Apr-%y') "+
                        " WHEN 3 THEN DATE_FORMAT(selecteddate, '01-Jul-%y') "+
                        " WHEN 4 THEN DATE_FORMAT(selecteddate, '01-Oct-%y') END AS date, ";

                }else if(data.filter === "5"){
                    //Yearly (for 5 years)
                    timeStampQuery = " and w.createdate >= now()-interval 4 year";
                    groupbyQuery = "  group by year(selecteddate) order by selecteddate ";
                    selectDate = " DATE_FORMAT(selecteddate,'01-Jan-%y') date, ";

                }else if(data.filter === "6"){
                    //From and to date
                    timeStampQuery =  " and date_format (ADDTIME(w.createdate, '5:30:0.000000'),'%Y-%m-%d') between '"+ data.fromdate +"' and '"+ data.todate +"'";


                    if(data.xScale === "1"){
                        groupbyQuery = "  group by DATE(selecteddate) order by selecteddate ";
                        selectDate = " date_format(selecteddate,'%d-%b-%y') date, ";

                    }else if(data.xScale === "2"){
                        groupbyQuery = "  group by week(selecteddate) order by selecteddate ";
                        selectDate = " IF( month(SUBDATE(selecteddate, dayofweek(selecteddate) - 1)) = month(selecteddate), "+
                            " date_format(SUBDATE(selecteddate, dayofweek(selecteddate) - 1), '%d-%b-%y'), DATE_FORMAT(selecteddate,'01-%b-%y') ) date, ";

                    }else if(data.xScale === "3"){
                        groupbyQuery = "  group by MONTH(selecteddate) order by selecteddate ";
                        selectDate = " DATE_FORMAT(selecteddate,'01-%b-%y') date, ";

                    }else if(data.xScale === "4"){
                        groupbyQuery = "  group by QUARTER(selecteddate) order by selecteddate ";
                        selectDate = " CASE QUARTER(selecteddate) "+
                            " WHEN 1 THEN DATE_FORMAT(selecteddate, '01-Jan-%y') "+
                            " WHEN 2 THEN DATE_FORMAT(selecteddate, '01-Apr-%y') "+
                            " WHEN 3 THEN DATE_FORMAT(selecteddate, '01-Jul-%y') "+
                            " WHEN 4 THEN DATE_FORMAT(selecteddate, '01-Oct-%y') END AS date, ";

                    }else if(data.xScale === "5"){
                        groupbyQuery = "  group by year(selecteddate) order by selecteddate ";
                        selectDate = " DATE_FORMAT(selecteddate,'01-Jan-%y') date, ";
                    }

                }
                var ticketStatusQuery = "";
                if(data.ticketStatus === "1"){
                    // Total Logged
                    ticketStatusQuery = " and (w.tStatus = (SELECT id FROM TICKETATTRIBUTES where ATTRID = 2 "+
                        " AND CLIENTID = "+ data.clientId +"  and sequence_no = 1 and DeleteFlag = '0') OR w.tStatus = (SELECT id FROM TICKETATTRIBUTES where ATTRID = 2 "+
                        " AND CLIENTID = "+ data.clientId +"  and sequence_no = 301 and DeleteFlag = '0') OR w.tStatus = (SELECT id FROM TICKETATTRIBUTES where ATTRID = 2 "+
                        " AND CLIENTID = "+ data.clientId +"  and sequence_no = 401 and DeleteFlag = '0'))";
                }else if(data.ticketStatus === "2"){
                    // Total Resolved
                    ticketStatusQuery = " and (w.tStatus = (SELECT id FROM TICKETATTRIBUTES where ATTRID = 2 "+
                        " AND CLIENTID = "+ data.clientId +"  and sequence_no = 2 and DeleteFlag = '0') OR w.tStatus = (SELECT id FROM TICKETATTRIBUTES where ATTRID = 2 "+
                        " AND CLIENTID = "+ data.clientId +"  and sequence_no = 302 and DeleteFlag = '0') OR w.tStatus = (SELECT id FROM TICKETATTRIBUTES where ATTRID = 2 "+
                        " AND CLIENTID = "+ data.clientId +"  and sequence_no = 402 and DeleteFlag = '0'))";
                }else if(data.ticketStatus === "3"){
                    // Total Open
                    ticketStatusQuery = " and (w.tStatus != (SELECT id FROM TICKETATTRIBUTES where ATTRID = 2 "+
                        " AND CLIENTID = "+ data.clientId +"  and sequence_no = 0 and DeleteFlag = '0') OR w.tStatus != (SELECT id FROM TICKETATTRIBUTES where ATTRID = 2 "+
                        " AND CLIENTID = "+ data.clientId +"  and sequence_no = 300 and DeleteFlag = '0') OR w.tStatus != (SELECT id FROM TICKETATTRIBUTES where ATTRID = 2 "+
                        " AND CLIENTID = "+ data.clientId +"  and sequence_no = 400 and DeleteFlag = '0'))";
                }else if(data.ticketStatus === "4"){
                    // Total Closed
                    ticketStatusQuery = " and (w.tStatus = (SELECT id FROM TICKETATTRIBUTES where ATTRID = 2 "+
                        " AND CLIENTID = "+ data.clientId +"  and sequence_no = 0 and DeleteFlag = '0') OR w.tStatus = (SELECT id FROM TICKETATTRIBUTES where ATTRID = 2 "+
                        " AND CLIENTID = "+ data.clientId +"  and sequence_no = 300 and DeleteFlag = '0') OR w.tStatus = (SELECT id FROM TICKETATTRIBUTES where ATTRID = 2 "+
                        " AND CLIENTID = "+ data.clientId +"  and sequence_no = 400 and DeleteFlag = '0'))";
                }

                function getTotalTicket(typeQuery , wfcQuery, callback){
                    // totalOpenTicketSQL = "SELECT "+selectDate+" count(t.id) "+
                    // " as 'count' FROM WFCCLIENTRESULT_report w, ticket_report t where  w.PKFIELDVAL = t.id and t.DeleteFlag='0' "+
                    // " and t.clientid= "+ data.clientId +" "+timeStampQuery+" "+typeQuery+" and w.id IN "+
                    // " (SELECT MAX(x.id) FROM  WFCCLIENTRESULT_report x, ticket_report y WHERE x.PKFIELDVAL = y.id AND y.clientid = "+ data.clientId +" "+
                    // " "+wfcQuery+" GROUP BY x.PKFIELDVAL) "+groupbyQuery+" ";

                    totalTicketsSQL = "select "+selectDate+" count(*) as 'count' from (select max(w.createdate) selecteddate from "+
                        " WFCCLIENTRESULT_report w, ticket_report t where w.PKFIELDVAL = t.id and "+
                        " t.DeleteFlag = 0 and t.clientid = "+ data.clientId +" "+typeQuery+" "+timeStampQuery+" "+ticketStatusQuery+" "+
                        " group by w.PKFIELDVAL) b "+groupbyQuery;

                    console.log("totalOpenTicketSQL --- " + totalTicketsSQL);
                    con.query(totalTicketsSQL, function (err, result) {
                        if (err) {
                            util.logData('---Error from getTrendReport inside ReportConfiguratorDB.js----');
                            util.logData(err);
                            cb(err, null);
                        } else {
                            callback(null, result);
                        }

                    });

                }


                //reportTypes
                async.eachSeries(Object.keys(reportTypes), function (key, loopcallback){
                    var typeQuery = "";
                    var wfcQuery = "";
                    var type = reportTypes[key].type;
                    var typeId = reportTypes[key].id;
                    if(data.type === "2"){
                        wfcQuery = " and x.supportGroupLevelId = "+typeId;
                        typeQuery = " and w.supportGroupLevelId = "+typeId;
                    }
                    else if(data.type === "3"){
                        wfcQuery = " and y.working_category = "+typeId;
                        typeQuery = " and t.working_category = "+typeId;
                    }
                    else if(data.type === "4"){
                        wfcQuery = " and y.ticketTypeId = "+typeId;
                        typeQuery = " and t.ticketTypeId = "+typeId;
                    }
                    var funcArr = {totalTicket : getTotalTicket.bind(null, typeQuery, wfcQuery)};
                    async.parallel(funcArr,
                        function (err, results) {
                            if (err) {
                                //console.log(err);
                                util.logData(err);
                            } else {
                                //console.log(results);
                                if(data.type === "1"){
                                    trendArray.push({type: "Overall",
                                        values: results.totalTicket
                                    });
                                }else{
                                    trendArray.push({type: type,
                                        values: results.totalTicket
                                    });
                                }

                            }
                            loopcallback();
                        });
                }, function(err) {
                    console.log('iterating done for Type');
                    cb(null, true, trendArray);
                });

            }
        ],
        function (err) {
            if (err) {
                throw new Error(err);
            } else {
                util.logData(err);
            }
        });
}

function getHeatmapReport(data, cb) {
    console.log(data);
    var resArray = [];
    var trendArray = [];
    var idCount = 1;

    var lastXmonths = 0;
    var timeStampQuery = "";
    var timeStampQueryWFC = "";
    var selectQuery = "";

    async.waterfall([
        function getReportType(callback) {
            var reportTypeSql = "";
            if(data.type === "1"){
                reportTypeSql = "";
                
            }else if(data.type === "2"){
                reportTypeSql = "SELECT id,LEVELSHORTDESC type FROM SUPPORTGROUPLEVEL WHERE "+
                " CLIENTID=" + data.clientId + " AND group_level != 0 AND DeleteFlag=0 ORDER BY id";
               
            }else if(data.type === "3"){
                var mainCategory = "SELECT id FROM TICKETATTRIBUTES where ATTRID = 1 AND CLIENTID = "+ data.clientId +" "+
                " and PARENT_ID = 0 and DeleteFlag = '0' and attrHeaderMstId in "+
                " (SELECT id FROM attributesHeaderMst where ticket_type = "+ data.ticketType +" and DeleteFlag = '0') LIMIT 1";

                reportTypeSql = "SELECT id ,ATTRVAL type FROM TICKETATTRIBUTES where ATTRID "+
                        " = 1 AND CLIENTID = "+ data.clientId +" and PARENT_ID = ("+mainCategory+")";
                
            }else if(data.type === "4"){
                reportTypeSql = "SELECT distinct ticketTypeId id, ticketTypeVal type FROM ticket_report where clientid = " + data.clientId +
                " and DeleteFlag = '0'";
            }
            //console.log( " Report Type SQL ==>> " + reportTypeSql);
            if(reportTypeSql === ""){
                callback(null, ["all"]);
            }else{
                con.query(reportTypeSql, function (err, results, fields) {
                    if (err) {
                        util.logData('---Error from getCSATReport inside ReportConfiguratorDB.js----');
                        util.logData(err);
                        cb(err, null);
                    } else {
                        //console.log(results);
                        if (results.length > 0) {
                            callback(null, results);
                        }else{
                            cb(null, false, "No data found for type");
                        }
                    }
                });
            }
        },
        function getReportData(reportTypes, callback) {
            lastXmonths = data.filter;
            if(lastXmonths === "1" || lastXmonths === 1){
                
                timeStampQuery = " and MONTH(t.createdate) = MONTH(CURRENT_DATE()) ";
                timeStampQueryWFC = " and MONTH(y.createdate) = MONTH(CURRENT_DATE()) ";
            }else{
                lastXmonths = lastXmonths - 1;
                timeStampQuery = " and t.createdate between (now()-interval "+lastXmonths+" month) and now() ";
                timeStampQueryWFC = " and y.createdate between (now()-interval "+lastXmonths+" month) and now() ";
            }
            
            selectQuery = " DATE_FORMAT(t.createdate, '%M-%Y') Date ";
            if(data.type === "1"){
                selectQuery = selectQuery + ", COUNT(t.id) as 'Overall' ";
                callback(null, selectQuery);
            }
            else{
                //reportTypes
                async.eachSeries(Object.keys(reportTypes), function (key, loopcallback){
                    var typeName = reportTypes[key].type;
                    var typeId = reportTypes[key].id;
                    if(data.type === "2"){
                        selectQuery = selectQuery + ", SUM(w.supportGroupLevelId = "+typeId+") as '"+typeName+"' ";
                    }
                    else if(data.type === "3"){
                        selectQuery = selectQuery + ", SUM(t.working_category = "+typeId+") as '"+typeName+"' ";
                    }
                    else if(data.type === "4"){
                        selectQuery = selectQuery + ", SUM(t.ticketTypeId = "+typeId+") as '"+typeName+"' ";
                    }
                    loopcallback();
                }, function(err) {
                    console.log('iterating done for Type');
                    //console.log(selectQuery);
                    callback(null, selectQuery);
                });
            }
        },
        function countSLA(reportDataResult, callback){
            var slaComplianceTotalSQL = "SELECT "+selectQuery+" FROM WFCCLIENTRESULT_report w, ticket_report t, ticket_sla_response_dtls_report sla where "+
            " w.PKFIELDVAL = t.id and w.PKFIELDVAL = sla.ticketId and t.DeleteFlag='0' and t.clientid="+data.clientId+" "+timeStampQuery+" "+
            " and w.id IN (SELECT MAX(x.id) FROM "+
            " WFCCLIENTRESULT_report x, ticket_report y WHERE x.PKFIELDVAL = y.id AND y.clientid = "+data.clientId+" "+timeStampQueryWFC+" GROUP BY x.PKFIELDVAL)  GROUP BY MONTH(t.createdate) ORDER BY MIN(t.createdate );"
            console.log("SQL slaCompliance Total --> " + slaComplianceTotalSQL);
            con.query(slaComplianceTotalSQL, function (err, result) {
                if (err) {
                    util.logData('---Error from getSLAComplainceReport inside ReportConfiguratorDB.js----');
                    util.logData(err);
                    cb(err, null);
                } else {
                    //cb(null, result[0].total);
                    var slaComplianceSQL = "SELECT "+selectQuery+" FROM WFCCLIENTRESULT_report w, ticket_report t, ticket_sla_response_dtls_report sla where "+
                    " w.PKFIELDVAL = t.id and w.PKFIELDVAL = sla.ticketId and t.DeleteFlag='0' and t.clientid="+data.clientId+" "+timeStampQuery+" "+
                    " and sla.response_datetime > COALESCE (sla.response_stop_datetime,Now()) and w.id IN (SELECT MAX(x.id) FROM "+
                    " WFCCLIENTRESULT_report x, ticket_report y WHERE x.PKFIELDVAL = y.id AND y.clientid = "+data.clientId+" "+timeStampQueryWFC+" GROUP BY x.PKFIELDVAL)  GROUP BY MONTH(t.createdate) ORDER BY MIN(t.createdate );"
                    console.log("SQL slaCompliance --> " + slaComplianceSQL);
                    con.query(slaComplianceSQL, function (err, result2) {
                        if (err) {
                            util.logData(err);
                            cb(err, null);
                        } else {
                            //console.log(result);
                            //console.log(result2);
                            resArray = result.map(a => Object.assign({}, a));
                            async.eachSeries(Object.keys(result), function (key2, loopcallback2){
                                var totalObj = result[key2];
                                var resObj = resArray[key2];
                                var monthName = totalObj.Date;
                                var slaObj = result2.filter(function(value){ return value.Date==monthName;})
                                console.log("----------------------");
                                //console.log(totalObj);
                                //console.log(slaObj);
                                async.eachSeries(Object.keys(result[key2]), function (key3, loopcallback3){
                                    //console.log(key3);
                                    //console.log(totalObj);
                                    console.log(slaObj);
                                    
                                    if(key3 !== "Date"){
                                        if(slaObj.length > 0){
                                            var compliance = 0;
                                            var totalTicket = totalObj[key3];
                                            var nonViolated = slaObj[0][key3];
                                            if(nonViolated === '0' || nonViolated === 0){
                                                compliance = 0;
                                            }else{
                                                compliance = Math.round((Number(nonViolated)/Number(totalTicket))*100);
                                            }
                                            resObj[key3] = compliance;
                                            console.log("SLA Non Violated - " + nonViolated);
                                            console.log("Total Ticket - " + totalTicket);
                                            console.log("SLA Compliance - " + compliance);
                                        }
                                        else{
                                            resObj[key3] = 0;
                                        }

                                    }
                                    
                                    loopcallback3();
                                }, function(err) {
                                    console.log('iterating done for SLA 233');
                                    
                                    // callback(null, "");
                                });
                                loopcallback2();
                            }, function(err) {
                                console.log('iterating done for SLA Calculation');
                                //callback(null, "");
                                console.log(resArray);
                                cb(null, true, resArray);
                            });
                            
                        }
                
                    });  
                }
            });
        }      
    ],
    function (err) {
        if (err) {
            throw new Error(err);
        } else {     
            util.logData(err);
        }
    });
}

function getTrendBarReport(data, cb) {
    console.log(data);
    var trendArray = [];
    var typeQuery = "";
    var wfcQuery = "";
    var timeStampQuery = "";
    var groupbyQuery = "";
    var selectDate = "";
    var typeId = data.typeValue;;

    if(data.type === "2"){
        wfcQuery = " and x.supportGroupLevelId = "+typeId;
        typeQuery = "";
    }
    else if(data.type === "3"){
        wfcQuery = " and y.working_category = "+typeId;
        typeQuery = " and t.working_category = "+typeId;
    }
    else if(data.type === "4"){
        wfcQuery = " and y.ticketTypeId = "+typeId;
        typeQuery = " and t.ticketTypeId = "+typeId;
    }

    if(data.filter === "1"){
        //Daily Trend (for the month)
        timeStampQuery = " and  MONTH(t.createdate) = MONTH(CURRENT_DATE()) ";
        groupbyQuery = "  group by DATE(t.createdate) order by t.createdate ";
        selectDate = " date_format(t.createdate,'%d-%b-%y') date, ";

    }else if(data.filter === "2"){
        //Weekly (for the month)
        timeStampQuery = " and  MONTH(t.createdate) = MONTH(CURRENT_DATE()) ";
        groupbyQuery = "  group by week(t.createdate) order by t.createdate ";
        selectDate = " IF( month(SUBDATE(t.createdate, dayofweek(t.createdate) - 1)) = month(t.createdate), "+
            " date_format(SUBDATE(t.createdate, dayofweek(t.createdate) - 1), '%d-%b-%y'), DATE_FORMAT(t.createdate,'01-%b-%y') ) date, ";

    }else if(data.filter === "3"){
        //Monthly (for 3 months)
        timeStampQuery = " and t.createdate >= now()-interval 3 month";
        groupbyQuery = "  group by MONTH(t.createdate) order by t.createdate ";
        selectDate = " DATE_FORMAT(t.createdate,'01-%b-%y') date, ";

    }else if(data.filter === "4"){
        //Quarterly (for 4 quarters) QUARTER
        timeStampQuery = " and t.createdate >= now()-interval 4 quarter";
        groupbyQuery = "  group by QUARTER(t.createdate) order by t.createdate ";
        selectDate = " CASE QUARTER(t.createdate) "+
            " WHEN 1 THEN DATE_FORMAT(t.createdate, '01-Jan-%y') "+
            " WHEN 2 THEN DATE_FORMAT(t.createdate, '01-Apr-%y') "+
            " WHEN 3 THEN DATE_FORMAT(t.createdate, '01-Jul-%y') "+
            " WHEN 4 THEN DATE_FORMAT(t.createdate, '01-Oct-%y') END AS date, ";

    }else if(data.filter === "5"){
        //Yearly (for 5 years)
        timeStampQuery = " and t.createdate >= now()-interval 4 year";
        groupbyQuery = "  group by year(t.createdate) order by t.createdate ";
        selectDate = " DATE_FORMAT(t.createdate,'01-Jan-%y') date, ";
    }

    function getTotalTicket(typeQuery , wfcQuery, callback){
        totalOpenTicketSQL = "SELECT "+selectDate+" COALESCE(count(t.id),0) "+
        " as 'count' FROM WFCCLIENTRESULT_report w, ticket_report t where  w.PKFIELDVAL = t.id and t.DeleteFlag='0' "+
        " and t.clientid= "+ data.clientId +" "+timeStampQuery+" "+typeQuery+" and w.id IN "+
        " (SELECT MAX(x.id) FROM  WFCCLIENTRESULT_report x, ticket_report y WHERE x.PKFIELDVAL = y.id AND y.clientid = "+ data.clientId +" "+
        " "+wfcQuery+" GROUP BY x.PKFIELDVAL) "+groupbyQuery+" ";
        console.log("totalOpenTicketSQL --- " + totalOpenTicketSQL);
        con.query(totalOpenTicketSQL, function (err, result) {
            if (err) {
                util.logData('---Error from getTrendBarReport inside ReportConfiguratorDB.js----');
                util.logData(err);
                cb(err, null);
            } else {
                callback(null, result);
            }
    
        });
    }

    function getNonViolatedTicket(typeQuery , wfcQuery, callback){
        totalOpenTicketSQL = "SELECT "+selectDate+" COALESCE(count(t.id),0) "+
        " as 'count' FROM WFCCLIENTRESULT_report w, ticket_report t, ticket_sla_response_dtls_report sla where  w.PKFIELDVAL = t.id and t.DeleteFlag='0' and  w.PKFIELDVAL = sla.ticketId"+
        " and t.clientid= "+ data.clientId +" "+timeStampQuery+" "+typeQuery+" and w.id IN "+
        " (SELECT MAX(x.id) FROM  WFCCLIENTRESULT_report x, ticket_report y WHERE x.PKFIELDVAL = y.id AND y.clientid = "+ data.clientId +" "+
        " "+wfcQuery+" GROUP BY x.PKFIELDVAL) "+groupbyQuery+" ";
        console.log("totalOpenTicketSQL --- " + totalOpenTicketSQL);
        con.query(totalOpenTicketSQL, function (err, result) {
            if (err) {
                util.logData('---Error from getTrendBarReport inside ReportConfiguratorDB.js----');
                util.logData(err);
                cb(err, null);
            } else {
                callback(null, result);
            }
    
        });
    }

    //var wfcQuery = "";
    var caseQueryLogged = " ";
    var caseQueryResolved = " and w.tStatus = (SELECT id FROM TICKETATTRIBUTES where ATTRID = 2 AND CLIENTID = "+ data.clientId +"  and sequence_no = 2 and DeleteFlag = '0')";
    var caseQueryNonViolated = " and sla.response_datetime > COALESCE (sla.response_stop_datetime,Now()) " + caseQueryResolved;
    var funcArr = {totalloggedTicket : getTotalTicket.bind(null, caseQueryLogged, wfcQuery), totalClosedTicket : getTotalTicket.bind(null, caseQueryResolved, wfcQuery), totalSlaNonViolatedTicket : getNonViolatedTicket.bind(null, caseQueryNonViolated, wfcQuery)};
    async.parallel(funcArr,
        function (err, results) {
            if (err) {
                //console.log(err);
                util.logData(err);
            } else {
                console.log(results.totalloggedTicket);
                console.log(results.totalSlaNonViolatedTicket);
                console.log(results.totalClosedTicket);
                var SLAResArray = [];
                async.eachSeries(Object.keys(results.totalloggedTicket), function (key, loopcallback){
                    var resObj = {};
                    var totalObj = results.totalloggedTicket[key];
                    var newDate = totalObj['date'];
                    var slaObj = results.totalSlaNonViolatedTicket.filter(function(value){ return value.date==newDate;})
                    var closedObj = results.totalClosedTicket.filter(function(value){ return value.date==newDate;})
                    console.log("-----------");
                    console.log(closedObj);
                    
                    if(slaObj.length > 0){
                        var compliance = 0;
                        var totalTicket = totalObj["count"];
                        var nonViolated = slaObj[0]["count"];
                        if(nonViolated === '0' || nonViolated === 0){
                            compliance = 0;
                        }else{
                            compliance = Math.round((Number(nonViolated)/Number(totalTicket))*100);
                        }
                        //resObj["SLA Complaince"] = compliance;
                        console.log("SLA Non Violated - " + nonViolated);
                        console.log("Total Ticket - " + totalTicket);
                        console.log("SLA Compliance - " + compliance);
                    }
                    else{
                        //resObj["SLA Complaince"] = 0;
                        compliance = 0;
                    }
                    var closedCount = 0;
                    if(closedObj.length > 0){
                        closedCount = closedObj[0]["count"];
                    }

                    resObj.Date = newDate;
                    var cat = [{Name: "Logged", Value:  totalObj["count"]}, {Name: "Resolved", Value:  closedCount}];
                    resObj.Categories = cat;
                    var sla = [{Name: "SLA Complaince", Value: compliance}];
                    resObj.LineCategory = sla;
                    
                    trendArray.push(resObj);
                    loopcallback();
                }, function(err) {
                    console.log('iterating done for SLA');
                    // trendArray.push({type: 'logged',
                    //             values: results.totalloggedTicket
                    //         },{type: 'closed',
                    //             values: results.totalClosedTicket
                    //         },{type: 'sla',
                    //         values: SLAResArray
                    //     });
                    console.log(JSON.stringify(trendArray));
                    cb(null, true, trendArray);
                });
                
            }
    });
                
}

function getReportCategory(data, cb){
    //console.log(data);
    var mainCategory = "SELECT id FROM TICKETATTRIBUTES where ATTRID = 1 AND CLIENTID = "+ data.clientId +" "+
                " and PARENT_ID = 0 and DeleteFlag = '0' and attrHeaderMstId in "+
                " (SELECT id FROM attributesHeaderMst where ticket_type = "+ data.ticketType +" and DeleteFlag = '0') LIMIT 1";

    reportTypeSql = "SELECT id ,ATTRVAL name FROM TICKETATTRIBUTES where ATTRID "+
                        " = 1 AND CLIENTID = "+ data.clientId +" and PARENT_ID = ("+mainCategory+")";
    
    //console.log("SQL getProductivityTeam --> " + reportTypeSql);
    con.query(reportTypeSql, function (err, result) {
        if (err) {
            util.logData('---Error from getProductivityTeam inside ReportConfiguratorDB.js----');
            util.logData(err);
            cb(err, null);
        } else {
            cb(null, true, result);
        }
    });
}

function getReportStatus(data, cb){
    //console.log(data);
    reportStatusSql = "SELECT id ,ATTRVAL name FROM TICKETATTRIBUTES where ATTRID "+
                        " = 3 AND CLIENTID = "+ data.clientId +" and deleteFlag = '0'";
    
    //console.log("SQL getProductivityTeam --> " + reportTypeSql);
    con.query(reportStatusSql, function (err, result) {
        if (err) {
            util.logData('---Error from getProductivityTeam inside ReportConfiguratorDB.js----');
            util.logData(err);
            cb(err, null);
        } else {
            cb(null, true, result);
        }
    });
}

function getReportFilters(data, cb){
    var resArray = [];
    var reportTypeArray = [{type:0, view:"Select Report Type"},
                            {type:1, view:"Overall"},
                            {type:2, view:"Support group"},
                            {type:3, view:"Category"},
                            {type:4, view:"Ticket type"},
                          ];

    var reportTypeArrayProductivity = [{type:0, view:"Select Report Type"},
                                {type:1, view:"Overall"},
                                {type:2, view:"Team"}
                            ];

    var reportFilterArrayTrend = [{type:0, view:"Select Report Filter"},
                            {type:1, view:"Day wise - Current Month"},
                            {type:2, view:"Week wise - Current Month"},
                            {type:3, view:"Month wise - Last Three Months"},
                            {type:4, view:"Quarter wise - Last Four Quarters"},
                            {type:5, view:"Yearly - Last five years"},
                            {type:6, view:"From and To Date"},
                        ];

    var reportFilterArray = [{type:0, view:"Select Report Filter"},
                        {type:1, view:"Current Day"},
                        {type:2, view:"Current Week"},
                        {type:3, view:"Current Month"},
                        {type:4, view:"Current Quarter"},
                        {type:5, view:"Current Year"},
                        {type:6, view:"From and to date"},
                      ];

    var reportScaleArray = [{type:0, view:"Select Report Scale"},
                        {type:1, view:"Daily"},
                        {type:2, view:"Weekly"},
                        {type:3, view:"Monthly"},
                        {type:4, view:"Quarterly"},
                        {type:5, view:"Yearly"}
                        ];

    var reportStatusArray = [{type:0, view:"Select Status"},
                        {type:1, view:"Logged"},
                        {type:2, view:"Resolved"},
                        {type:3, view:"Opened"},
                        {type:4, view:"Closed"}
                        ];

    if(data.reportType === "SLA"){
        resArray.push({type: reportTypeArray,
            filter: reportFilterArray,
            scale: ""
        });
        
    }
    else if(data.reportType === "CSAT"){
        resArray.push({type: reportTypeArray,
            filter: reportFilterArray,
            scale: ""
        });
    }
    else if(data.reportType === "ESCALATION"){
        resArray.push({type: reportTypeArray,
            filter: reportFilterArray,
            scale: ""
        });
    }
    else if(data.reportType === "PRODUCTIVITY"){
        resArray.push({type: reportTypeArrayProductivity,
            filter: reportFilterArray,
            scale: ""
        });
    }
    else if(data.reportType === "TREND"){
        resArray.push({type: reportTypeArray,
            filter: reportFilterArrayTrend,
            scale: reportScaleArray,
            status:reportStatusArray
        });
    }
    else if(data.reportType === "HEATMAP"){

    }
    else if(data.reportType === "TRENDBAR"){

    }

    cb(null, true, resArray);
}

function getStagingTableList(data, cb){
    var resArray = [{type:0, view:"Select Table"},
                    {type:1, view:"ticket_report"},
                    {type:2, view:"TicketActivityLogs_report"},
                    {type:3, view:"ticketCategory_report"},
                    {type:4, view:"ticket_closure_dtl_report"},
                    {type:5, view:"ticketFeedBack_report"},
                    {type:6, view:"ticketFileAttachementLog_report"},
                    {type:7, view:"ticket_sla_response_dtls_report"},
                    {type:8, view:"ticket_sla_startstop_logs_all_action_report"},
                    {type:9, view:"ticketSolutions_report"},
                    {type:10, view:"WFCCLIENTRESULT_report"},
                    {type:11, view:"ticketExtandDtlsTbl_report"}];
   
    cb(null, true, resArray);
}

module.exports.getColumListByTableName = getColumListByTableName;
module.exports.addReportConfiguratorTemplate = addReportConfiguratorTemplate;
module.exports.getReportConfiguratorTemplateList = getReportConfiguratorTemplateList;
module.exports.getUniqueValueByField = getUniqueValueByField;
module.exports.getReportTableData = getReportTableData;

module.exports.getSLAComplainceReport = getSLAComplainceReport;
module.exports.getCSATReport = getCSATReport;
module.exports.getEscalationReport = getEscalationReport;
module.exports.getProductivityReport = getProductivityReport;
module.exports.getTrendReport = getTrendReport;
module.exports.getHeatmapReport = getHeatmapReport;
module.exports.getTrendBarReport = getTrendBarReport;
module.exports.getReportStatus = getReportStatus;

module.exports.getProductivityTeam = getProductivityTeam;
module.exports.getReportCategory = getReportCategory;
module.exports.getReportFilters = getReportFilters;
module.exports.getStagingTableList = getStagingTableList;
