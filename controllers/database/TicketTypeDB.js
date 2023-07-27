const config = require('./dbConnection');
const con = config.createMysqlConn();
// const logger = require('inspire').logger;
const util = require('../util');
var async = require('async');

var TicketTypeEntity = require('../Entity/TicketTypeEntity');

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

function getTicketType(data, cb) {
    const val = preventSqlInjection(data);
    data = new TicketTypeEntity(val);
    let sql = "SELECT id, ATTRVAL name ,attr_desc description , sequence_no seq,it_asset_management asset FROM TICKETATTRIBUTES  where DeleteFlag=0 and PARENT_ID=0 and ATTRID=3 and clientId=" + data.clientId;
    con.query(sql, function (err1, result1) {
        if (err1) {
            util.logData(err1);
            cb(err1, null);
        } else {
            if (result1.length > 0) {
                result1[0].checked = true;
            }
            cb(null, true, result1);
        }
    });
}

function getTicketTypeForTicketCreation(data, cb) {
    // util.logData()
    const val = preventSqlInjection(data);
    data = new TicketTypeEntity(val);
    let sql = "SELECT id, ATTRVAL name ,attr_desc description , sequence_no seq,it_asset_management asset FROM TICKETATTRIBUTES  where PARENT_ID=0 and ATTRID=3 and sequence_no != 10 and  clientId=" + data.clientId + ' and DeleteFlag=0';
    con.query(sql, function (err1, result1) {
        if (err1) {
            util.logData(err1);
            cb(err1, null);
        } else {
            if (result1.length > 0) {
                result1[0].checked = true;
            }
            cb(null, true, result1);
        }
    });
}


function insertTicketAttributesClientWise(data, cb) {
    // util.logData('dataaaaaaaaaaaaaaaaaa============' + JSON.stringify(data));
    const val = preventSqlInjection(data);
    //util.logData('data1============' + JSON.stringify(val));
    data = new TicketTypeEntity(val);
    //util.logData('data2============' + JSON.stringify(data));
    let varStatus;
    if (Number(data.attrId) === 1) {
        //util.logData('555555555555555555555');
        var sql = "Select * from TICKETATTRIBUTES " +
            " where CLIENTID =? " +
            " and PARENT_ID =? " +
            " and ATTRID = ? " +
            " and attrHeaderMstId =? " +
            " and (ATTRVAL = ? or Attr_desc = ?) and DeleteFlag=0";

        varStatus = [data.clientId, data.parentId, data.attrId, data.attrHeadMstId, data.attrVal, data.attrDesc];
    } else if (Number(data.attrId) === 3) {
        var sql = "Select * from TICKETATTRIBUTES " +
            " where CLIENTID =? " +
            " and ATTRID = ? " +
            " and (ATTRVAL = ? or Attr_desc = ?) and DeleteFlag=0 ";

        varStatus = [data.clientId, data.attrId, data.attrVal, data.attrDesc];
    } else {
        var sql2 = "Select * from TICKETATTRIBUTES " +
            " where CLIENTID =? " +
            " and sequence_no =? " +
            " and ATTRID = ? " +
            " and (ATTRVAL = ? or Attr_desc = ? ) and DeleteFlag=0";
        for (let i = 0; i < data.arrayStatus.length; i++) {
            varStatus = [data.clientId, data.arrayStatus[i].seq, data.attrId, data.arrayStatus[i].name, data.arrayStatus[i].description];

            con.query(sql2, varStatus, function (err, result2) {
                if (err) {
                    cb(err, null);
                } else {
                    let isTicketTypeAdd = false;
                    if (result2.length === 0) {
                        isTicketTypeAdd = true;
                        var sql4 = "INSERT into TICKETATTRIBUTES(CLIENTID, sequence_no, ATTRID, ATTRVAL,Attr_desc,  createbyid, is_stopSlaMeter,is_command_required)" +
                            " values ( ?,?,?,?,?,?,?,? ) ";
                        variStatus4 = [data.clientId, data.arrayStatus[i].seq,
                            data.attrId, data.arrayStatus[i].name,
                            data.arrayStatus[i].description, data.createdBy, String(data.arrayStatus[i].stopSlaMeter) , data.arrayStatus[i].commandRequired];
                        insertTicketAttributes(sql4, variStatus4, isTicketTypeAdd, data.arrayStatus[i], function (err, success, details) {
                            if (err) {
                                util.logData(err);
                                cb(err, null);
                            } else {
                                cb(null, true, 'Successfully inserted');
                            }

                        })
                    } else {
                        // cb(null, false);
                    }
                }
            })
        }
    }
    // util.logData('SQL RESULT' +
    if (Number(data.attrId) === 3 || Number(data.attrId) === 1){
        con.query(sql, varStatus, function (err, result) {
            // util.logData('result==============' + JSON.stringify(result));
            // util.logData('SQL RESULT------->' + sql);
            if (err) {
                util.logData(err);
                cb(err, null);
            } else {
                let isTicketTypeAdd = false;
                let variStatus2;
                if (result.length === 0) {
                    if (Number(data.attrId) === 1) {
                        // util.logData('1111111111111111111111111111111');
                        var sql1 = "INSERT into TICKETATTRIBUTES(CLIENTID, PARENT_ID, ATTRID, ATTRVAL,Attr_desc, attrHeaderMstId, createbyid,attachedField)" +
                            " values (? ,?,?,?,?,? ,?,? ) ";

                        variStatus2 = [data.clientId, data.parentId, data.attrId, data.attrVal, data.attrDesc, data.attrHeadMstId, data.createdBy, data.attachClaimNo];
                        insertTicketAttributes(sql1, variStatus2, isTicketTypeAdd, data, function (err, success, details) {
                            if (err) {
                                util.logData(err);
                                cb(err, null);
                            } else {
                                if (data.parentId === 0) {
                                    //util.logData('3333333333333333333333333333333');
                                    var sqlp = "UPDATE TICKETATTRIBUTES SET `parentPath`=? WHERE `id`=?;";
                                    con.query(sqlp, [details.insertId, details.insertId], function (err, details2) {
                                        if (err) {
                                            util.logData(err);
                                            cb(err, null);
                                        } else {
                                            cb(null, true, details.insertId);
                                        }
                                    })
                                } else {
                                    //util.logData('222222222222222222222222===' + JSON.stringify(details));
                                    var sql2 = "select parentPath from TICKETATTRIBUTES where id=? and DeleteFlag=0 ;";
                                    con.query(sql2, [data.parentId], function (err, result) {
                                        if (err) {
                                            util.logData(err);
                                            cb(err, null);
                                        } else {
                                            var temp = result[0].parentPath + "," + details.insertId;
                                            var sqlp = "UPDATE TICKETATTRIBUTES SET `parentPath`=? WHERE `id`=?;";
                                            con.query(sqlp, [temp, details.insertId], function (err, details3) {
                                                if (err) {
                                                    util.logData(err);
                                                    cb(err, null);
                                                } else {
                                                    cb(null, true, details.insertId);
                                                }
                                            })
                                        }

                                    })

                                }
                            }

                        })
                    } else if (Number(data.attrId) === 3) {
                        isTicketTypeAdd = true;
                        var sql1 = "INSERT into TICKETATTRIBUTES(CLIENTID,PARENT_ID, sequence_no, ATTRID, ATTRVAL,Attr_desc,it_asset_management, createbyid)" +
                            " values ( ? ,0,?,?,?,?,?,? ) ";
                        variStatus2 = [data.clientId, data.seq, data.attrId, data.attrVal, data.attrDesc, data.it_asset_management, data.createdBy];
                        insertTicketAttributes(sql1, variStatus2, isTicketTypeAdd, data, function (err, success, details) {
                            if (err) {
                                util.logData(err);
                                cb(err, null);
                            } else {
                                cb(null, true, details.insertId);
                            }
                        })
                    }
                } else {
                    cb(null, false, 'Duplicate Data');
                }

            }
        });
    }
}


function insertTicketAttributes(sql1, variStatus2, isTicketTypeAdd, data, cb) {
    con.query(sql1, variStatus2, function (err1, result1) {
        if (err1) {
            util.logData(err1);
            cb(err1, null);
        } else {
            //util.logData('444444444444444====' + JSON.stringify(result1))
            if (isTicketTypeAdd && data.seq === 2) {
                let count = 0;
                const types = [{
                    attrDesc: 'Reactive Problem',
                    attrVal: 'Reactive Problem',
                    seq: 4
                }, {attrDesc: 'Preventive Problem', attrVal: 'Preventive Problem', seq: 3}]
                for (var i = 0; i < types.length; i++) {
                    let sql1 = "INSERT into TICKETATTRIBUTES(CLIENTID,PARENT_ID, sequence_no, ATTRID, ATTRVAL,Attr_desc,it_asset_management, createbyid)" +
                        " values ( ? ,?,?,?,?,?,?,?) ";
                    con.query(sql1, [data.clientId, result1.insertId, types[i].seq, data.attrId, types[i].attrVal, types[i].attrDesc, data.it_asset_management, data.createdBy], function (err1, result2) {
                        if (err1) {
                            util.logData(err1);
                            cb(err1, null);
                        } else {
                            count++;
                            if (count === types.length) {
                                cb(null, true, result1);
                            }
                        }
                    })
                }
            } else {
                cb(null, true, result1);
            }

        }
        cb(null, false, result1);
    });

}

// function insertTicketAttributes(sql6, variStatus5, isTicketTypeAdd, data, cb) {
//     // console.log("mmmmmmmmmmmmmmmmmmmm" + JSON.stringify(variStatus5));
//     // console.log("sqllllllllllllllll " + sql6);
//     con.query(sql6, variStatus5, function (err1, result5) {
//         if (err1) {
//             util.logData(err1);
//             cb(err1, null);
//         } else {
//             if (isTicketTypeAdd && data.seq === 2) {
//                 let count = 0;
//                 const types = [{
//                     attrDesc: 'Reactive Problem',
//                     attrVal: 'Reactive Problem',
//                     seq: 4
//                 }, {attrDesc: 'Preventive Problem', attrVal: 'Preventive Problem', seq: 3}]
//                 for (var j = 0; j < types.length; j++) {
//                     let sql1 = "INSERT into TICKETATTRIBUTES(CLIENTID,PARENT_ID, sequence_no, ATTRID, ATTRVAL,Attr_desc,it_asset_management, createbyid)" +
//                         " values ( ? ,?,?,?,?,?,?,?) ";
//                     con.query(sql1, [data.clientId, result5.insertId, types[j].seq, data.attrId, types[j].attrVal, types[j].attrDesc, data.it_asset_management, data.createdBy], function (err1, result6) {
//                         if (err1) {
//                             util.logData(err1);
//                             cb(err1, null);
//                         } else {
//                             count++;
//                             if (count === types.length) {
//                                 cb(null, true, result6);
//                             }
//                         }
//                     })
//                 }
//             } else {
//                 cb(null, true, result5);
//             }
//
//         }
//         cb(null, false, result5);
//     });
//
// }



function deleteTicketAttributesClientWise(data, cb) {
    const val = preventSqlInjection(data);
    data = new TicketTypeEntity(val);
    let sql = "Update TICKETATTRIBUTES set DeleteFlag = 1,delete_by_id = ?,DeleteDate=NOW() where id = ?;";
    util.logData('Del--------------->' + sql)
    con.query(sql, [data.user_id, data.id], function (err, result) {
        if (err) {
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
}


function updateTicketCategory(data, cb) {
    // const val = preventSqlInjection(data);
    data = new TicketTypeEntity(data);
    //var str1 = 'select count(*) cnt from TICKETATTRIBUTES where DeleteFlag = 0 and ATTRVAL ="' + data.name + '"and clientId =' + data.clientId + ' and id !=' + data.id;
    var str1 = 'select count(*) cnt from TICKETATTRIBUTES where DeleteFlag = 0 and ATTRVAL =? and clientId =? and id != ?';
    con.query(str1, [data.description, data.clientId, data.id], function (err1, result1) {
        if (err1) {
            util.logData('---Error from insertModuleDB inside module.js----');
            util.logData(err1);
            cb(err1, null);
        } else {
            if (result1[0].cnt === 0) {
                var sql = "Update TICKETATTRIBUTES set ATTRVAL = ? ," +
                    " Attr_desc=? , " +
                    " modifybyid =? ," +
                    " modifydate=NOW() " +
                    " where id = ?";

                con.query(sql, [data.name, data.description, data.user_id, data.id], function (err, result) {
                    if (err) {
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

function getSomeTicketType(data, cb) {
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
            str = "SELECT id, ATTRVAL name ,attr_desc description , sequence_no seq,it_asset_management asset FROM " +
                " TICKETATTRIBUTES  where id > " + offset + " and DeleteFlag=0 and PARENT_ID=0 and ATTRID=3 and clientId=" + data.clientId +
                " ORDER BY id ASC LIMIT " + page_size;
        } else if (paginationType == 'prev') {
            str = "select * from (SELECT id, ATTRVAL name ,attr_desc description , sequence_no seq,it_asset_management asset FROM " +
                " TICKETATTRIBUTES  where id < " + offset + " and DeleteFlag=0 and PARENT_ID=0 and ATTRID=3 and clientId=" + data.clientId +
                " ORDER BY id DESC LIMIT " + page_size + ")z ORDER BY z.id  ASC;";
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
        let str1 = "SELECT count(id) count FROM " +
            " TICKETATTRIBUTES  where DeleteFlag=0 and PARENT_ID=0 and ATTRID=3 and clientId=" + data.clientId;
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

function getTicketTypeForTicketCreation_LNT(data, cb) {
    // const val = preventSqlInjection(data);
    // data = new TicketTypeEntity(val);
    let sql = " SELECT distinct a.ATTRID,b.supportGroupLevelId,a.id id, a.ATTRVAL name ,a.view_sequence,a.attr_desc description , a.sequence_no seq,a.it_asset_management asset " +
        " FROM TICKETATTRIBUTES a, SupportGrpWithTicketAttributes b  " +
        " where a.id = b.ticket_type and b.supportGroupLevelId = " + data.suppGroupId + " and a.PARENT_ID=0 and a.ATTRID=3 and a.sequence_no != 10 and  a.clientId=" + data.clientId + " " +
        " and a.DeleteFlag  ='0' and b.DeleteFlag  ='0' order by a.id";
    util.logData('lnt-------------------------' + sql)
    con.query(sql, function (err1, result1) {
        if (err1) {
            util.logData(err1);
            cb(err1, null);
        } else {
            if (result1.length > 0) {
                result1[0].checked = true;
                cb(null, true, result1);
            } else {
                cb(null, false, 'No Ticket Type Mapped With the support Group');
            }

        }
    });
}

function updateTicketAttributesClientWise(data, cb) {
    let sql="UPDATE `TICKETATTRIBUTES` SET `ATTRVAL`=?, `Attr_desc`=?, `modifybyid` =?,`modifydate`=NOW() WHERE `id`=? and DeleteFlag =?;";
    con.query(sql,[data.ATTRVAL,data.Attr_desc,data.user_id,data.id,0],function(err,result){
        if(err){
            cb(err,null);
        }
        else{
            cb(null,true,'Updated successfully');
        }
    })
}

module.exports.updateTicketAttributesClientWise = updateTicketAttributesClientWise;
module.exports.getTicketTypeForTicketCreation_LNT = getTicketTypeForTicketCreation_LNT;
module.exports.getSomeTicketType = getSomeTicketType;
module.exports.getTicketTypeForTicketCreation = getTicketTypeForTicketCreation;
module.exports.getTicketType = getTicketType;
module.exports.updateTicketCategory = updateTicketCategory;
module.exports.deleteTicketAttributesClientWise = deleteTicketAttributesClientWise;
module.exports.insertTicketAttributesClientWise = insertTicketAttributesClientWise;
