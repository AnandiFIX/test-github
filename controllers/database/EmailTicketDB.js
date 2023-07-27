const config = require('./dbConnection');
const con = config.createMysqlConn();
// const logger = require('inspire').logger;
const util=require('../util');
const async = require('async');
const dataAccess = require('./DataAccess');
function stringToBool(value) {
    if (value === 'true' || value === 'True' || value === 'TRUE') {
        return true;
    } else {
        return false;
    }
}

function getEmailTicketSenderType(data, cb) {
    console.log(data);
    var str = "select id, type, type_text from email_ticket_sender_type "+
    "where deletedFlag = 0 and CLIENTID = "+data.client_id;
    console.log(str);
    con.query(str, function (err, done, fields) {
        if (err) {
            util.logData('---Error from getEmailTicketSenderType inside EmailTicketDB.js----');
            util.logData(err);
            cb(err, null);
        } else {
            cb(null, true, done);
        }
    });
}



function allEmailTicketKeyword(data,cb) {
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
            str = "SELECT et.id, (SELECT type_text FROM email_ticket_sender_type WHERE et.sender_type_id = id) sender_type_name,"+
                "(select attributes_value from email_ticket_attributes where attributes_type = 'delimiter' and client_id = "+data.clientId +" and deletedFlag = '0' limit 1) delimiter, "+
                " (SELECT type FROM email_ticket_sender_type WHERE et.sender_type_id = id) sender_type, "+
                "et.sender, et.domain, et.keyword, (select ATTRVAL from TICKETATTRIBUTES where id=et.ticketTypeId) ticket_type,"+
                " (select replace(GROUP_CONCAT(ATTRVAL),',',' / ') category from TICKETATTRIBUTES where FIND_IN_SET(id,(et.category_id))) category,"+
                " (SELECT NAME FROM USER WHERE id = et.service_user_id ) user FROM email_ticket et WHERE "+
                " et.deletedFlag= 0 and et.CLIENTID= "+data.clientId +
                " and et.id > " + offset + " ORDER BY et.id ASC LIMIT " + page_size;
            util.logData('sql=' + str);
        } else if (paginationType == 'prev') {
            str = "SELECT et.id, (SELECT type_text FROM email_ticket_sender_type WHERE et.sender_type_id = id) sender_type_name,"+
                "(select attributes_value from email_ticket_attributes where attributes_type = 'delimiter' and client_id = "+data.clientId +" and deletedFlag = '0' limit 1) delimiter, "+
                " (SELECT type FROM email_ticket_sender_type WHERE et.sender_type_id = id) sender_type, "+
                "et.sender,et.domain, et.keyword, (select ATTRVAL from TICKETATTRIBUTES where id=et.ticketTypeId) ticket_type,"+
                " (select replace(GROUP_CONCAT(ATTRVAL),',',' / ') category from TICKETATTRIBUTES where FIND_IN_SET(id,(et.category_id))) category,"+
                " (SELECT NAME FROM USER WHERE id = et.service_user_id ) user FROM email_ticket et WHERE "+
                " et.deletedFlag= 0 and et.CLIENTID= "+data.clientId +
                " and et.id > " + offset + " ORDER BY et.id ASC LIMIT " + page_size;
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
        var str1 = "SELECT count(*) count FROM email_ticket WHERE "+
            " deletedFlag=0 AND CLIENTID= "+data.clientId;
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


function deleteEmailTicketKeyword(data, cb) {
    var sql = 'Update email_ticket set  deletedFlag = 1, delete_by_id = ' + data.user_id + ', deletedDate = NOW() where id = ' + data.id ;
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) {
            util.logData('---Error from deleteEmailTicketKeyword inside AssetDescription.js----');
            util.logData(JSON.stringify(err));
            cb(err, null);
        } else {
            // util.logData(JSON.stringify(result));
            cb(null, true, result);
        }
    });
}



function getEmailTicketServiceUser(data, cb) {
    let sql = "SELECT u.id, u.NAME as name, u.login_name, su.supportGroupLevelId as userGroupId, u.USERMAIL as mail, u.USERMOBILENO mobileno "+
    "from USER u, supportGroupUser su WHERE su.userId = u.id AND u.DeleteFlag = '0' "+
    "AND u.CLIENTID = " + data.clientId + " AND user_type = 'serviceuser'";

    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) {
            util.logData(err);
            console.log(err);
            cb(err, null);
        } else {
            cb(null, true, result);
        }
    });
}

function getEmailTicketFieldsCatWise(data, cb) {
    const catgId = data.catId.split(',');
    var allField = [];
    let count = 0;
    let catagoryId = '';
    for (let i = 0; i < catgId.length; i++) {
        if (i === 0) {
            catagoryId = catgId[i];
        } else {
            catagoryId += ',' + catgId[i];
        }
        let sql = "select a.id,a.category_id, b.ATTRVAL categoryNm, c.ATTRVAL ticketType, fieldName, fieldType,predifinedValue " +
            " from ticketExtandMstTbl a, TICKETATTRIBUTES b , TICKETATTRIBUTES c " +
            " where a.category_id = b.id  " +
            " and a.ticketType = c.id  " +
            " and a.DeleteFlag = '0' and b.DeleteFlag = '0' and c.DeleteFlag = '0' " +
            " and b.clientId = ? and a.category_id = ? and a.ticketType=?";
        console.log(sql, catagoryId);
        con.query(sql, [data.clientId, catagoryId, data.ticketTypeId], function (err, details) {
            if (err) {
                util.logData(err);
                cb(err, null);
            } else {
                for (let j = 0; j < details.length; j++) {
                    allField.push(details[j]);
                }
                count++;
                if (count === catgId.length) {
    
                    cb(null, true, allField);
                }
            }
        })
    }
}

function getEmailTicketAttributesParentWiseWithPriority(data, cb) {
    let sql = "select id,ATTRVAL title,attachedField from TICKETATTRIBUTES where DeleteFlag = '0'  and CLIENTID = " +
        data.clientId + " and PARENT_ID =" + data.parentId + " ";
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) {
            util.logData(err);
            cb(err, null);
        } else {
            // console.log("----------->:" + JSON.stringify(result))
            if (result.length > 0) {
                for (let i = 0; i < result.length; i++) {
                    result[i].attachedField = stringToBool(result[i].attachedField);
                }
                cb(null, true, {val: result});
            } else {
                if (Number(data.pType) === 2) {
                    let sql1 = 'SELECT p.id id,p.busi_priority_name name FROM BUSINESSPRIORITY p,BUSINESSMATRIX m where p.DeleteFlag=0 and' +
                        ' m.DeleteFlag=0 and p.id=m.busi_priority_id and m.CLIENTID=' + data.clientId + ' and m.category_id=' + data.parentId +
                        ' and m.ticket_type=' + data.tType;
                        console.log(sql1);
                    con.query(sql1, function (err, result1) {
                        if (err) {
                            util.logData(err);
                            cb(err, null);
                        } else {
                            cb(null, true, {priority: result1[0]});
                        }
                    })
                } else {
                    cb(null, false, "No data found");
                }
            }
        }
    });
}

function getEmailTicketCreateLoadingDtls(data, cb) {
    function getAttributesHeaderMst(callback) {
        let sql = "select id,header_name title,sequence_no from attributesHeaderMst where DeleteFlag = '0' and ATTRID='1' " +
            " and CLIENTID = " + data.clientId + " and ticket_type = " + data.ticket_type + "  ORDER BY sequence_no";
        con.query(sql, function (err, result) {
            if (err) {
                util.logData(err);
                callback(err, null);
            } else {
                for (let i = 0; i < result.length; i++) {
                    result[i].type = 'header';
                }
                console.log(result);
                callback(null, result);
            }
        });
    }

    function getAttributesMstParentWise(callback) {
        // let sql = "select id,ATTRVAL title from TICKETATTRIBUTES where DeleteFlag = '0' and CLIENTID = " + data.clientId + " and PARENT_ID =0 and ATTRID = 1 " ;
        // "  and id in (SELECT categoryId FROM WFCCLIENT where  CLIENTID = " + data.clientId + " and ticket_type = " + data.ticket_type + " and DeleteFlag = '0' and flowIndicator = 'F') ";
        let sql = "select id,ATTRVAL title from TICKETATTRIBUTES where CLIENTID = " + data.clientId + " and attrHeaderMstId IN (select id from attributesHeaderMst where ATTRID='1' and CLIENTID = " + data.clientId + " and ticket_type = " + data.ticket_type + " and sequence_no=1 and DeleteFlag = '0') and DeleteFlag = '0'";
        con.query(sql, function (err, result) {
            if (err) {
                util.logData(err);
                callback(err, null);
            } else {
                console.log(result);
                callback(null, result);
            }
        });
    }

    function checkPriorityType(callback) {
        let sql = 'select ticket_priority_type from ticket_priority_configuration where deleteflag=0 and ticket_type=' + data.ticket_type + ' and client_id=' + data.clientId;
        con.query(sql, function (err, result) {
            if (err) {
                util.logData(err);
                callback(err, null);
            } else {
                if (result.length > 0) {
                    if (result[0].ticket_priority_type === 1) {
                       dataAccess.getBusinessUrgencyTicketTypeWise({
                            clientId: data.clientId,
                            ticket_type: data.ticket_type
                        }, function (err, success, urgency) {
                            if (err) {
                                util.logData(err);
                                callback(err, null);
                            } else {
                                dataAccess.getBusinessImpactTicketTypeWise({
                                    clientId: data.clientId,
                                    ticket_type: data.ticket_type
                                }, function (err, success, impact) {
                                    if (err) {
                                        util.logData(err);
                                        callback(err, null);
                                    } else {
                                        callback(null, {
                                            type: result[0].ticket_priority_type,
                                            impact: impact,
                                            urgency: urgency
                                        })
                                    }
                                })
                            }
                        })
                    }
                    if (result[0].ticket_priority_type === 2) {
                        callback(null, {type: result[0].ticket_priority_type, impact: [], urgency: []})
                    }
                } else {
                    callback(null, {error: 'Please add Priority type'})
                }
            }
        });
    }

    async.parallel([getAttributesHeaderMst, getAttributesMstParentWise, checkPriorityType], function (err, results) {
        if (err) {
            cb(err, null)
        } else {

            let arr = [];
            for (let i = 0; i < results[0].length; i++) {
                if (i === 0) {
                    let inner = [];
                    inner = results[1];
                    // if (results[1].length > 1) {
                    inner.unshift(results[0][i]);
                    // }
                    arr.push({id: i + 1, options: inner})
                } else {
                    arr.push({id: i + 1, options: [results[0][i]]})
                }
            }
            cb(null, true, [{
                attribute: arr,
                val: results[2]
            }])

        }
    })

}

function getEmailTicketBusinessPriorityTicketTypeWise(data, cb) {
    var str = " SELECT b.name clientNm ,a.id id,a.busi_priority_name name ,a.busi_priority_desc des ,a.color_desc,c.ATTRVAL  ticket_type " +
        " from BUSINESSPRIORITY a, CLIENT b, TICKETATTRIBUTES c where a.CLIENTID = b.id and a.ticket_type = c.id " +
        " and a.DeleteFlag=0 and a.CLIENTID =" + data.clientId + " and a.ticket_type =" + data.ticket_type + "  ";
    con.query(str, function (err, result) {
        if (err) {
            util.logData(err);
            cb(err, null);
        } else {
            cb(null, true, result);
        }
    });
}

function insertEmailFeedback(data, cb){
    let sql = "SELECT id FROM email_ticket where  CLIENTID = ? and keyword = ? and sender = 'comment' and domain = ? and deletedFlag = 0;";
    con.query(sql,[data.client_id , data.keyword, data.domain], function (err, result) {
        if (err) {
            util.logData(err);
            cb(err, null);
        } else {
            if (result.length > 0) {
                cb(null, false, 'Duplicate Keyword for this Domain');
            } else {

                var sql = "INSERT INTO email_ticket (keyword, sender, CLIENTID, createdById, domain) VALUES (?, ?, ? ,?, ?);";
                util.logData(sql);
                con.query(sql, [data.keyword, data.sender_value, data.client_id, data.user_id, data.domain], function (err, result) {
                    if (err) {
                        util.logData('---Error from insertEmailFeedback inside AssetManagementMaster.js----');
                        util.logData(err);
                        cb(err, null);
                    } else {
                        cb(null, true, result.insertId);
                    }
                });


            }
        }
    });

}

function insertEmailTicketKeyword(data, cb){

    if(data.sender_type === 1){

        let sql = "SELECT id FROM email_ticket where  CLIENTID = ? and keyword = ? and sender = ? and deletedFlag = 0;";
        con.query(sql,[data.client_id , data.keyword , data.sender_value], function (err, result) {
            if (err) {
                util.logData(err);
                cb(err, null);
            } else {
                if (result.length > 0) {
                    cb(null, false, 'Duplicate Keyword for this Email');
                } else {

                    var sql = "INSERT INTO email_ticket (keyword, sender_type_id, sender, categoryDtlsLt, "+
                        "category_id, CLIENTID, ticket_type_seq, service_user_id, ticketTypeId, busi_priority_id, "+
                        "priorityType, userGroupId, createdById , requesterInfo) VALUES (?, ?, ? ,?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?)"
                    util.logData(sql);
                    con.query(sql, [data.keyword, data.sender_type_id, data.sender_value, data.categoryDtlsLt, data.category_id,
                        data.client_id, data.ticket_type_seq, data.service_user_id,  data.ticketTypeId, data.busi_priority_id,
                        data.priorityType, data.userGroupId, data.user_id , data.requesterInfo], function (err, result) {
                        if (err) {
                            util.logData('---Error from insertEmailTicketKeyword inside AssetManagementMaster.js----');
                            util.logData(err);
                            cb(err, null);
                        } else {
                            cb(null, true, result.insertId);
                        }
                    });


                }
            }
        });


    }  else if(data.sender_type === 2){


        let sql = "SELECT id FROM email_ticket where  CLIENTID = ? and keyword = ? and sender = 'sender' and domain = ? and deletedFlag = 0;";
        con.query(sql,[data.client_id , data.keyword, data.sender_value], function (err, result) {
            if (err) {
                util.logData(err);
                cb(err, null);
            } else {
                if (result.length > 0) {
                    cb(null, false, 'Duplicate Keyword for this Domain');
                } else {

                    var sql = "INSERT INTO email_ticket (keyword, sender_type_id, sender, domain, categoryDtlsLt, "+
                        "category_id, CLIENTID, ticket_type_seq, ticketTypeId, busi_priority_id, "+
                        "priorityType,createdById) VALUES (?, ?, ? ,?, ?, ?, ?, ?, ?, ?, ?, ? )"
                    util.logData(sql);
                    con.query(sql, [data.keyword, data.sender_type_id, 'sender', data.sender_value, data.categoryDtlsLt, data.category_id,
                        data.client_id, data.ticket_type_seq, data.ticketTypeId, data.busi_priority_id,
                        data.priorityType,data.user_id], function (err, result) {
                        if (err) {
                            util.logData('---Error from insertEmailTicketKeyword inside AssetManagementMaster.js----');
                            util.logData(err);
                            cb(err, null);
                        } else {
                            cb(null, true, result.insertId);
                        }
                    });


                }
            }
        });

    }


}


function editEmailTicketKeyword(data, cb){

    let sql = "SELECT * FROM email_ticket where id = ? and deletedFlag = 0;";
    con.query(sql,[data.id], function (err, result) {
        if (err) {
            util.logData(err);
            cb(err, null);
        } else {
            console.log(JSON.stringify(result));
            if (result[0].sender === 'sender' || result[0].sender === 'comment' ) {

                var sql3 = "Update email_ticket set keyword = ? , domain = ? , modifybyid = ?, modifydate = NOW()  where id = ?;";
                con.query(sql3, [data.keyword,data.domain, data.createdBy, data.id], function (err3, done3) {
                    if (err3) {
                        util.logData(err3);
                        cb(err3, null);
                    } else {
                        cb(null, true, "Updated Successfully");
                    }
                });


            } else {

                var sql3 = "Update email_ticket set keyword = ? ,sender = ?, modifybyid = ?, modifydate = NOW()  where id = ?;";
                console.log(sql3);
                con.query(sql3, [data.keyword,data.sender, data.createdBy, data.id], function (err3, done3) {
                    if (err3) {
                        util.logData(err3);
                        cb(err3, null);
                    } else {
                        cb(null, true, "Updated Successfully");
                    }
                });


            }
        }
    });

}

function getEmailAttrMaster(data, cb) {
    console.log('INDISE getEmailAttrMaster >>>>>>>>>>>>>>>>>>>>>> ' + JSON.stringify(data));
    var page_size = data.page_size;
    var paginationType = data.paginationType;
    data = util.preventSqlInjection(data);
    var offset = data.nextOffset;
    var funcArr = {};
    var str = "";

    if (offset == "0") {
        funcArr = { dataObj, totalData };
    } else {
        funcArr = { dataObj };
    }
    async.parallel(funcArr,
        function (err, results) {
            if (err) {
                cb(null, true, results);
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
            str = "SELECT id, attributes_type, attributes_name, CASE WHEN attributes_type IN ('cat_mapping') THEN (select replace(GROUP_CONCAT(ATTRVAL),',',' / ') " +
                " category from TICKETATTRIBUTES where FIND_IN_SET(id,( attributes_additional_value))) ELSE attributes_value END as attributes_value " +
                "  FROM email_ticket_attributes where deletedFlag = 0 and client_id = ? and id > ? ORDER BY id ASC LIMIT ?";
        } else if (paginationType == 'prev') {
            str = "SELECT * from (SELECT id, attributes_type, attributes_name, CASE WHEN attributes_type IN ('cat_mapping') THEN (select replace(GROUP_CONCAT(ATTRVAL),',',' / ') " +
                " category from TICKETATTRIBUTES where FIND_IN_SET(id,( attributes_additional_value))) ELSE attributes_value END as attributes_value " +
                " FROM email_ticket_attributes where deletedFlag = 0 and client_id = ? and id > ? ORDER BY id ASC LIMIT ? ) Z ORDER BY Z.id  ASC";
        }
        util.logData('getEmailAttrMaster sql===' + str);
        util.logData('>>>>>>>>>>>===data' + offset + '+++++++++++++++' + page_size);
        con.query(str, [data.clientId, offset, Number(page_size)], function (err, done) {
            if (err) {
                util.logData(err);
                cb(err, null);
            } else {
                cb(null, done);

            }
        });
    }

    function totalData(cb) {
        var str1 = "select count(id) count FROM email_ticket_attributes where deletedFlag = 0 and client_id =  ?";
        con.query(str1, [data.clientId], function (err, done) {
            if (err) {
                util.logData(err);
                cb(err, null);
            } else {
                cb(null, done);
            }
        });
    }


}


function getEmailAttrMaster_old(data, cb) {
    console.log('INDISE getEmailAttrMaster >>>>>>>>>>>>>>>>>>>>>> ' + JSON.stringify(data));
    var page_size = data.page_size;
    var paginationType = data.paginationType;
    data = util.preventSqlInjection(data);
    var offset = data.nextOffset;
    var funcArr = {};
    var str = "";

    if (offset == "0") {
        funcArr = { dataObj, totalData };
    } else {
        funcArr = { dataObj };
    }
    async.parallel(funcArr,
        function (err, results) {
            if (err) {
                cb(null, true, results);
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
            str = "SELECT id, attributes_type, attributes_value  FROM email_ticket_attributes where deletedFlag = 0 and client_id = ? " +
                " and id > ? ORDER BY id ASC LIMIT ?";
        } else if (paginationType == 'prev') {
            str = "SELECT * from (SELECT id, attributes_type, attributes_value  FROM email_ticket_attributes where deletedFlag = 0 and client_id = ? " +
                " and id >  ?  ORDER BY id DESC LIMIT ? ) Z ORDER BY Z.id  ASC";
        }
        util.logData('followup sql===' + str);
        util.logData('>>>>>>>>>>>===data' + offset + '+++++++++++++++' + page_size);
        con.query(str, [data.clientId, offset, Number(page_size)], function (err, done) {
            if (err) {
                util.logData(err);
                cb(err, null);
            } else {
                cb(null, done);

            }
        });
    }

    function totalData(cb) {
        var str1 = "select count(id) count FROM email_ticket_attributes where deletedFlag = 0 and client_id =  ?";
        con.query(str1, [data.clientId], function (err, done) {
            if (err) {
                util.logData(err);
                cb(err, null);
            } else {
                // util.logData('result1=' + done);
                cb(null, done);
            }
        });
    }


}

function deleteEmailAttribute(data, cb) {
    var sql = 'Update email_ticket_attributes set  deletedFlag = 1, delete_by_id = ' + data.user_id + ', deletedDate = NOW() where id = ' + data.id;
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) {
            util.logData('---Error from deleteEmailAttribute---');
            util.logData(JSON.stringify(err));
            cb(err, null);
        } else {
            cb(null, true, result);
        }
    });
}

function AddEmailAttr_old(data, cb) {
    let sql = "INSERT INTO `email_ticket_attributes` (`attributes_type`, `attributes_value`, `client_id`, createdById) VALUES (?, ?, ?, ?);";
    con.query(sql, [data.attributes_type, data.attributes_value, data.client_id, data.user_id], function (err, result) {
        if (err) {
            util.logData(JSON.stringify(err));
            cb(err, null);
        } else {
            cb(null, true, result);
        }
    });
}


function AddEmailAttr(data, cb) {
    let sql = "INSERT INTO `email_ticket_attributes` (`attributes_type`, `attributes_value`, `client_id`, createdById, " +
        "  attributes_name, attributes_additional_value) VALUES (?, ?, ?, ?, ?, ?);";
    con.query(sql, [data.attributes_type, data.attributes_value, data.client_id, data.user_id,
    data.attributes_name, data.attributes_additional_value], function (err, result) {
        if (err) {
            util.logData(JSON.stringify(err));
            cb(err, null);
        } else {
            cb(null, true, result);
        }
    });
}


module.exports.AddEmailAttr = AddEmailAttr;
module.exports.deleteEmailAttribute = deleteEmailAttribute;
module.exports.getEmailAttrMaster = getEmailAttrMaster;
module.exports.insertEmailFeedback = insertEmailFeedback;
module.exports.getEmailTicketSenderType = getEmailTicketSenderType;
module.exports.insertEmailTicketKeyword = insertEmailTicketKeyword;
module.exports.allEmailTicketKeyword = allEmailTicketKeyword;
module.exports.editEmailTicketKeyword = editEmailTicketKeyword;
module.exports.deleteEmailTicketKeyword = deleteEmailTicketKeyword;
module.exports.getEmailTicketServiceUser = getEmailTicketServiceUser;
module.exports.getEmailTicketFieldsCatWise = getEmailTicketFieldsCatWise;
module.exports.getEmailTicketAttributesParentWiseWithPriority = getEmailTicketAttributesParentWiseWithPriority;
module.exports.getEmailTicketCreateLoadingDtls = getEmailTicketCreateLoadingDtls;
module.exports.getEmailTicketBusinessPriorityTicketTypeWise = getEmailTicketBusinessPriorityTicketTypeWise;
