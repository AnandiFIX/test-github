const config = require('./dbConnection');
const con = config.createMysqlConn();
var async = require('async');
const util = require('../util');

const dataAccess = require('./DataAccess')
const SLA_URL = global.gConfig.SLA_URL;
const DOCU_URL = global.gConfig.DOCU_URL;
const SECRET_TOKEN = global.gConfig.SECRET_TOKEN;
const UPLOAD_PATH = 'https://ifix-uat-2.s3.amazonaws.com/';
// const LUCENE_PATH = '/home/subham/Documents/Projects/NodeJS/Inspire/IFIX_Server/lucene/';
const request = require('superagent');

const DELETE_PERMISSION = 'You do not have  permission to delete';
const UPDATE_PERMISSION = 'You do not have  permission to update';

const UPDATE_ID = 2;
const DELETE_ID = 3;

const DOCU_SEQ = 10;

function changeDateFormat(startDate) {
    return new Date(startDate).toISOString().slice(0, 19).replace('T', ' ');
}

function uploadDocument(data, cb) {
    // util.logData(JSON.stringify(data));
    let sql = 'select id from document where DeleteFlag=0 and clientId=? and title="?"';
    con.query(sql, [data.clientId, data.title], function (err, result) {
        if (err) {
            util.logData(err);
            cb(err, false);
        } else {
            util.logData("result.length:" + result.length);
            if (result.length === 0) {
                if (data.categoryDtlsLt === '') {
                    cb(null, false, 'Please add all categories.');
                } else if (data.attachmentPath.length === 0) {
                    cb(null, false, 'Please add document.');
                } /*else if (data.groupId.length === 0) {
                    cb(null, false, 'Please add atleast one Support Group');
                }*/ else if (data.users.length === 0) {
                    cb(null, false, 'Please add atleast one user.');
                } else if (data.actions.length === 0) {
                    cb(null, false, 'Please provide atleast one Permission.');
                } else {
                    let sql1 = 'insert into document(title,keyword,startDate,endDate,clientId,createdBy) values("' + data.title + '","' + data.longDesc + '","' + changeDateFormat(data.requestedDate) + '","' + changeDateFormat(data.dueDate) + '",' + data.clientId + ',' + data.createdBy + ')';
                    con.query(sql1, function (err, result1) {
                        if (err) {
                            util.logData(err);
                            cb(err, false);
                        } else {
                            const docuId = result1.insertId;
                            util.logData('docuid:' + docuId);
                            data.docuId = docuId;

                            function addCategory(callback) {
                                const cats = data.categoryDtlsLt.split(',');
                                let count = 0;
                                for (let i = 0; i < cats.length; i++) {
                                    const catgory = cats[i].split('#')[1];
                                    const header = cats[i].split('#')[0];
                                    let sql2 = 'insert into docuCategory(categoryId,headerId,docuId,clientId,createdBy) values(' + catgory + ',' + header + ',' + docuId + ',' + data.clientId + ',' + data.createdBy + ')';
                                    con.query(sql2, function (err, result2) {
                                        if (err) {
                                            util.logData(err);
                                            callback(err, null);
                                        } else {
                                            count++;
                                            if (count === cats.length) {
                                                callback(null, true);
                                            }
                                        }
                                    })
                                }
                            }

                            function addAttachmentFile(callback) {
                                addAttachment(data, function (err, success) {
                                    if (err) {
                                        callback(err, false);
                                    } else {
                                        callback(null, true);
                                    }
                                })
                            }

                            // function addSupportGroup(callback) {
                            //     let count = 0;
                            //     for (let i = 0; i < data.groupId.length; i++) {
                            //         let sql2 = 'insert into docuGroup(groupId,docuId,clientId,createdBy) values(' + data.groupId[i] + ',' + docuId + ',' + data.clientId + ',' + data.createdBy + ')';
                            //         con.query(sql2, function (err, result2) {
                            //             if (err) {
                            //                 util.logData(err);
                            //                 callback(err, null);
                            //             } else {
                            //                 count++;
                            //                 if (count === data.groupId.length) {
                            //                     callback(null, true);
                            //                 }
                            //             }
                            //         })
                            //     }
                            // }

                            function addUsers(callback) {
                                addUserAndAction(data, function (err, success) {
                                    if (err) {
                                        callback(err, null);
                                    } else {
                                        callback(null, true);
                                    }
                                })
                            }

                            function generateDocuId(callback) {
                                var catVal = data.categoryDtlsLt.split(",")[0].split("#")[1];
                                const fldTU = {
                                    "clientId": data.clientId,
                                    "id": docuId,
                                    "ticket_type": data.typeId,
                                    "year_val": (new Date()).getFullYear(),
                                    "createdBy": data.createdBy,
                                    "category_id": catVal
                                };
                                getDocuId(fldTU, function (err, success, id) {
                                    if (err) {
                                        callback(err, false)
                                    } else {
                                        if (success) {
                                            util.logData('sending  data')
                                            callback(null, {success: true, id: id});
                                        } else {
                                            util.logData('error')
                                            callback(null, {success: false})
                                        }
                                    }
                                })
                            }

                            async.parallel([addCategory, addAttachmentFile, /*addSupportGroup,*/ addUsers, generateDocuId], function (err, results) {
                                if (err) {
                                    cb(err, null)
                                } else {
                                    // console.log("id:"+results[3]);
                                    if (results[3].success) {
                                        cb(null, true, 'Document created with id :' + results[3].id);
                                    }
                                }
                            })
                        }
                    })
                }

            } else {
                cb(null, false, 'Document with same title already exist');
            }
        }
    })
}

function addUserAndAction(data, cb) {
    let count = 0;
    const totalCount = (data.users.length * data.actions.length);
    for (let i = 0; i < data.users.length; i++) {
        for (let j = 0; j < data.actions.length; j++) {
            let sql2 = 'insert into docuUser(userId,actionId,docuId,clientId,createdBy) values(' + data.users[i] + ',' + data.actions[j] + ',' + data.docuId + ',' + data.clientId + ',' + data.createdBy + ')';
            con.query(sql2, function (err, result2) {
                if (err) {
                    util.logData(err);
                    cb(err, null);
                } else {
                    count++;
                    if (count === totalCount) {
                        cb(null, true);
                    }
                }
            })
        }
    }
}

function getDocuId(data, cb) {
    dataAccess.getTicketWiseTotalCnt(data, function (err, success, details) {
        let sql = " select id, client_id, ticket_type, prefix1, category_id, prefix2, prefix3 " +
            " from ticket_id_configuration a " +
            " where a.DeleteFlag = '0' " +
            " and a.client_id = " + data.clientId + " and a.ticket_type=" + data.ticket_type + " and a.category_id = " + data.category_id + " ";
        con.query(sql, function (err, result) {
            if (err) {
                util.logData(err);
                cb(err, null);
            } else {
                let x;
                if (result.length > 0) {
                    let idDtls = '';
                    let dateFmt = data.year_val;
                    var mn = new Date().getMonth() + 1;
                    if (mn > 9) {
                        dateFmt = dateFmt + mn;
                    } else {
                        dateFmt = dateFmt + '0' + mn;
                    }
                    if ((new Date()).getDate() > 9) {
                        dateFmt = dateFmt + (new Date()).getDate();
                    } else {
                        dateFmt = dateFmt + '0' + (new Date()).getDate();
                    }


                    if (result[0].prefix1.length == 8) {
                        idDtls = idDtls + dateFmt;
                    } else {
                        idDtls = idDtls + result[0].prefix1;
                    }

                    if (result[0].prefix2.length == 8) {
                        idDtls = idDtls + dateFmt;
                    } else {
                        idDtls = idDtls + result[0].prefix2;
                    }

                    if (result[0].prefix3.length == 8) {
                        idDtls = idDtls + dateFmt;
                    } else {
                        idDtls = idDtls + result[0].prefix3;
                    }


                    var ticket_id = idDtls + "00000";
                    var len = details.toString().length;
                    var y = ticket_id.length - len;
                    x = ticket_id.slice(0, y) + details;
                } else {
                    x = 'DOC' + data.id;
                }
                let sqlI = " update document set docu_id ='" + x + "' where id =" + data.id;
                con.query(sqlI, function (errI, resultI) {
                    if (errI) {
                        util.logData(errI);
                        cb(errI, null);
                    } else {
                        if (resultI.affectedRows > 0) {
                            let sqlI = " update ticket_yearly_status set yr_count =yr_count+1 " +
                                " where DeleteFlag = '0' " +
                                " and client_id = " + data.clientId + " and ticket_type=" + data.ticket_type + " and year_val=" + data.year_val + " and enddate is null ";
                            con.query(sqlI, function (errI, resultI) {
                                if (errI) {
                                    util.logData(errI);
                                    cb(errI, null);
                                } else {
                                    if (resultI.affectedRows > 0) {
                                        cb(null, true, x);
                                        util.logData('sending proper data')
                                    } else {
                                        util.logData('sending last level mistake')
                                        cb(null, false, "NA1");
                                    }
                                }
                            });
                        } else {
                            util.logData('updating not done')
                            cb(null, false, "NA2");
                        }
                    }
                });


            }
        });
    });
}

function addAttachment(data, cb) {
    util.logData(JSON.stringify(data));
    let count = 0;
    for (let i = 0; i < data.attachmentPath.length; i++) {
        let sql3 = 'select version from documentAttachment where clientId=? and docuId=? order by version desc';
        con.query(sql3, [data.clientId, data.docuId], function (err, resp) {
            if (err) {
                util.logData(err);
                cb(err, null);
            } else {
                let version;
                if (resp.length === 0) {
                    version = 1;
                } else {
                    version = Number(resp[0].version) + 1;
                }
                let sql2 = 'insert into documentAttachment(path,original_filename,docuId,version,clientId,createdBy) values("' + data.attachmentPath[count].fileName + '","' + data.attachmentPath[count].originalName + '",' + data.docuId + ',' + version + ',' + data.clientId + ',' + data.createdBy + ')';
                con.query(sql2, function (err, result2) {
                    if (err) {
                        util.logData(err);
                        cb(err, null);
                    } else {
                        count++;
                        if (count === data.attachmentPath.length) {
                            const attachedId = result2.insertId;

                            request
                                .get(DOCU_URL + '/documentFileUpload?clientid=' + data.clientId + '&primaryid=' + attachedId + '&path=' + UPLOAD_PATH + data.attachmentPath[count - 1].fileName + '&filename=' + data.attachmentPath[count - 1].fileName + '&filetitle=' + data.title)
                                .end((err, resp) => {
                                    if (err) {
                                        util.logData(err);
                                        // cb(err, false)
                                    } else {
                                        util.logData('documentFileUpload--' + JSON.stringify(resp));
                                    }
                                });
                            cb(null, true);
                        }
                    }
                })
            }
        });

    }
}

function getDataByCategory(data, cb) {
    let sql = 'SELECT D.id,D.docu_id, D.title,D.keyword,D.startDate,D.endDate,U.NAME name FROM document AS D ' +
        'JOIN docuCategory AS DC ON DC.docuId = D.id ' +
        'JOIN USER AS U ON U.id = D.createdBy ' +
        'WHERE DC.DeleteFlag = 0 and D.DeleteFlag=0 and DC.categoryId =' + data.categoryId + ' and DC.clientId =' + data.clientId +
        ' GROUP BY D.id';
    con.query(sql, function (err, result) {
        if (err) {
            util.logData(err);
            cb(err, null);
        } else {
            if (result.length > 0) {
                const dataSet = {userId: data.user_id, docuSet: result};
                getPermissionByUserId(dataSet, function (err, success, value) {
                    if (err) {
                        cb(err, false)
                    } else {
                        if (success) {
                            cb(null, true, value);
                        } else {
                            cb(null, false)
                        }
                    }
                })
            } else {
                cb(null, true, result);
            }
            // cb(null, true, result);
        }
    })
}

function updateDocument(data, cb) {
    util.logData(JSON.stringify(data));
    data.user_id=data.createdBy;
    checkPermission(data,UPDATE_ID,function (err,success) {
        if(err){
            cb(err,null);
        }else{
            if(success){
                async.parallel([updateCategory/*, updateUserAction, updateGroups*/, updateTitle, updateKeyword], function (err) {
                    if (err) {
                        cb(err, false);
                    } else {
                        cb(null, true);
                    }
                })
            }else{
                cb(null,false,UPDATE_PERMISSION)
            }
        }
    })
    function updateCategory(callback) {
        if (data.categoryDtlsLt === '') {
            callback(null, true)
        } else {
            function deleteData(callback) {
                let sql = 'Delete from docuCategory where docuId=? and clientid=?';
                con.query(sql, [data.docuId, data.clientId], function (err, result) {
                    if (err) {
                        callback(err, false)
                    } else {
                        callback(null, true);
                    }
                })
            }

            function insertData(success, callback) {
                if (success) {
                    util.logData(JSON.stringify(data));
                    const cats = data.categoryDtlsLt.split(',');
                    let count = 0;
                    for (let i = 0; i < cats.length; i++) {
                        const catgory = cats[i].split('#')[1];
                        const header = cats[i].split('#')[0];
                        let sql2 = 'insert into docuCategory(categoryId,headerId,docuId,clientId,createdBy) values(' + catgory + ',' + header + ',' + data.docuId + ',' + data.clientId + ',' + data.createdBy + ')';
                        con.query(sql2, function (err, result2) {
                            if (err) {
                                util.logData(err);
                                callback(err, null);
                            } else {
                                count++;
                                if (count === cats.length) {
                                    callback(null, true);
                                }
                            }
                        })
                    }
                } else {
                    callback(null, true)
                }
            }

            async.waterfall([deleteData, insertData], function (err, result) {
                if (err) {
                    callback(err, false)
                } else {
                    callback(null, true);
                }
            })
        }
    }

    function updateTitle(callback) {
        if (data.title) {
            let sql = 'update document set title=?,modifybyid=?,modifydate=NOW() where DeleteFlag=0 and id=?';
            con.query(sql, [data.title, data.createdBy, data.docuId], function (err, result) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, true);
                }
            })
        } else {
            callback(null, true);
        }
    }

    function updateKeyword(callback) {
        if (data.longDesc) {
            let sql = 'update document set keyword=?,modifybyid=?,modifydate=NOW() where DeleteFlag=0 and id=?';
            con.query(sql, [data.longDesc, data.createdBy, data.docuId], function (err, result) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, true);
                }
            })
        } else {
            callback(null, true);
        }
    }

    function updateUserAction(callback) {
        function deleteData(callback) {
            let sql = 'Delete from docuUser where docuId=? and clientid=?';
            con.query(sql, [data.docuId, data.clientId], function (err, result) {
                if (err) {
                    callback(err, false)
                } else {
                    console.log(JSON.stringify(result));
                    callback(null, true);
                }
            })
        }

        function insertData(success, callback) {
            if (success) {
                let count = 0;
                const totalCount = (data.users.length * data.actions.length);
                for (let i = 0; i < data.users.length; i++) {
                    for (let j = 0; j < data.actions.length; j++) {
                        let sql2 = 'insert into docuUser(userId,actionId,docuId,clientId,createdBy) values(' + data.users[i] + ',' + data.actions[j] + ',' + data.docuId + ',' + data.clientId + ',' + data.createdBy + ')';
                        con.query(sql2, function (err, result2) {
                            if (err) {
                                util.logData(err);
                                callback(err, null);
                            } else {
                                count++;
                                if (count === totalCount) {
                                    callback(null, true);
                                }
                            }
                        })
                    }
                }
            } else {
                callback(null, true)
            }
        }

        async.waterfall([deleteData, insertData], function (err, result) {
            if (err) {
                callback(err, false)
            } else {
                callback(null, true);
            }
        })
    }

    function updateGroups(callback) {
        function deleteData(callback) {
            let sql = 'Delete from docuGroup where docuId=? and clientid=?';
            con.query(sql, [data.docuId, data.clientId], function (err, result) {
                if (err) {
                    callback(err, false)
                } else {
                    console.log(JSON.stringify(result));
                    callback(null, true);
                }
            })
        }

        function insertData(success, callback) {
            if (success) {
                let count = 0;
                for (let i = 0; i < data.groupId.length; i++) {
                    let sql2 = 'insert into docuGroup(groupId,docuId,clientId,createdBy) values(' + data.groupId[i] + ',' + data.docuId + ',' + data.clientId + ',' + data.createdBy + ')';
                    con.query(sql2, function (err, result2) {
                        if (err) {
                            util.logData(err);
                            callback(err, null);
                        } else {
                            count++;
                            if (count === data.groupId.length) {
                                callback(null, true);
                            }
                        }
                    })
                }
            } else {
                callback(null, true)
            }
        }

        async.waterfall([deleteData, insertData], function (err, result) {
            if (err) {
                callback(err, false)
            } else {
                callback(null, true);
            }
        })
    }


}

function getDataByEmail(data, cb) {
    // const email = util.xorEncode(data.email, SECRET_TOKEN);
    let sql = 'SELECT id from USER where USER.DeleteFlag=0 and USERMAIL="' + data.email + '" and CLIENTID=' + data.clientId;
    con.query(sql, function (err, result) {
        if (err) {
            util.logData(err);
            cb(err, null);
        } else {
            if (result.length > 0) {
                let sql = 'SELECT D.id, D.docu_id,D.keyword, D.title,D.startDate,D.endDate,U.NAME name  FROM document AS D ' +
                    'JOIN USER AS U ON U.id = D.createdBy ' +
                    'WHERE D.DeleteFlag=0 and U.DeleteFlag=0 and D.createdBy =' + result[0].id + ' and D.clientId =' + data.clientId +
                    ' GROUP BY D.id ';
                con.query(sql, function (err, result1) {
                    if (err) {
                        util.logData(err);
                        cb(err, null);
                    } else {
                        if (result1.length > 0) {
                            const dataSet = {userId: data.user_id, docuSet: result1};
                            getPermissionByUserId(dataSet, function (err, success, value) {
                                if (err) {
                                    cb(err, false)
                                } else {
                                    if (success) {
                                        cb(null, true, value);
                                    } else {
                                        cb(null, false)
                                    }
                                }
                            })
                        } else {
                            cb(null, true, []);
                        }
                    }
                })
            } else {
                cb(null, true, []);
            }
        }
    })
}

function getPermissionByUserId(data, cb) {
    const userId = data.user_id;
    const docuSet = data.docuSet;
    // console.log(JSON.stringify(docuSet));
    const values = [];
    let docuCount = 0;
    for (let i = 0; i < docuSet.length; i++) {
        let sql = 'select priority,actionId,docuId from docuUser a,docuAction b where DeleteFlag=0 and userId=? and docuId=? and b.id=a.actionId group by actionId order by priority asc;';
        console.log(sql);
        con.query(sql, [userId, docuSet[i].id], function (err, result) {
            if (err) {
                util.logData(err);
                cb(err, null);
            } else {
                util.logData('--------->result: ' + JSON.stringify(result));
                docuCount++;
                if (result.length > 0) {
                    let matchedDocu;
                    for (let k = 0; k < docuSet.length; k++) {
                        if (docuSet[k].id === result[0].docuId) {
                            matchedDocu = docuSet[k];
                            break;
                        }
                    }
                    util.logData("------------>matchedDocu : " + JSON.stringify(matchedDocu));
                    for (let j = 0; j < result.length; j++) {
                        // if (result[j].actionId === 1) {
                        //     matchedDocu.upload = true;
                        // } else if (result[j].actionId === 2) {
                        //     matchedDocu.download = true;
                        // } else if (result[j].actionId === 3) {
                        //     matchedDocu.delete = true;
                        // }
                        if (result[j].priority === 2) {
                            matchedDocu.upload = true;
                            matchedDocu.download = true;
                            matchedDocu.delete = true;
                            break;
                        } else if (result[j].priority === 3) {
                            matchedDocu.download = true;
                            matchedDocu.upload = true;
                        } else if (result[j].priority === 4) {
                            matchedDocu.download = true;
                        }
                    }
                    util.logData("------------> after matchedDocu : " + JSON.stringify(matchedDocu));
                    if (matchedDocu.download) {
                        values.push(matchedDocu);
                    }
                }
                if (docuCount === docuSet.length) {
                    // console.log('sending....')
                    cb(null, true, values);
                }
            }

        })
    }
}

function getDataByDate(data, cb) {
    // let sql = 'SELECT D.id,D.keyword, D.title,D.startDate,D.endDate,U.NAME name  FROM document AS D ' +
    //     'JOIN USER AS U ON U.id = D.createdBy ' +
    //     'WHERE D.DeleteFlag=0 and U.DeleteFlag=0 and D.createdBy =' + result[0].id + ' and D.clientId =' + data.clientId +
    //     ' GROUP BY D.id ';
    // con.query(sql, function (err, result1) {
    //     if (err) {
    //         util.logData(err);
    //         cb(err, null);
    //     } else {
    //         if (result1.length > 0) {
    //             const dataSet = {userId: data.user_id, docuSet: result1};
    //             getPermissionByUserId(dataSet, function (err, success, value) {
    //                 if (err) {
    //                     cb(err, false)
    //                 } else {
    //                     if (success) {
    //                         cb(null, true, value);
    //                     } else {
    //                         cb(null, false)
    //                     }
    //                 }
    //             })
    //         } else {
    //             cb(null, true, []);
    //         }
    //     }
    // })
}

function getDocumentDetails(data, cb) {
    function getAttribute(callback) {
        let sql = 'select id from attributesHeaderMst where DeleteFlag = "0" and ATTRID="1" and CLIENTID = ? and ticket_type=? ORDER BY sequence_no';
        con.query(sql, [data.clientId, data.typeId], function (err, result1) {
            if (err) {
                util.logData(err)
                callback(err, null)
            } else {
                // callback(null,result)
                let count = 0;
                let arr = [];
                let arr1 = [];

                for (let i = 0; i < result1.length; i++) {
                    let sql1 = 'SELECT docuCategory.headerId parentId,docuCategory.categoryId catId,TICKETATTRIBUTES.ATTRVAL catVal,' +
                        'attributesHeaderMst.header_name header FROM docuCategory,attributesHeaderMst,TICKETATTRIBUTES where' +
                        ' docuCategory.DeleteFlag=0 and docuCategory.headerId=attributesHeaderMst.id and' +
                        ' docuCategory.categoryId=TICKETATTRIBUTES.id and docuCategory.docuId=' + data.docuId + ' and ' +
                        'docuCategory.headerId=' + result1[i].id + '; ';

                    con.query(sql1, function (err, result) {
                        if (err) {
                            util.logData(err);
                            callback(err, null);
                        } else {
                            count++;
                            arr1.push(result[0]);
                            // util.logData(JSON.stringify(arr1));
                            if (count === result1.length) {
                                for (let i = 0; i < result1.length; i++) {
                                    for (let j = 0; j < arr1.length; j++) {
                                        if (result1[i].id === arr1[j].parentId) {
                                            arr.push({
                                                id: i + 1,
                                                options: [{id: arr1[j].catId, title: arr1[j].catVal}, {
                                                    id: arr1[j].parentId,
                                                    title: arr1[j].header,
                                                    type: 'header'
                                                }]
                                            });
                                            break;
                                        }
                                    }
                                }
                                callback(null, arr)
                            }
                        }
                    })
                }
            }

        })
    }

    function getGroups(callback) {
        let sql = 'select groupId from docuGroup where DeleteFlag=0 and docuId=' + data.docuId + ' and clientId=' + data.clientId;
        con.query(sql, function (err, result) {
            if (err) {
                util.logData(err);
                callback(err, null);
            } else {
                const arr = [];
                for (let i = 0; i < result.length; i++) {
                    arr.push(result[i].groupId);
                }
                callback(null, arr);
            }
        })
    }

    function getUsersAndAction(callback) {
        let sql = 'select userId from docuUser where DeleteFlag=0 and docuId=' + data.docuId + ' and clientId=' + data.clientId;
        con.query(sql, function (err, result) {
            if (err) {
                util.logData(err);
                callback(err, null);
            } else {
                const users = [];
                for (let i = 0; i < result.length; i++) {
                    if (users.indexOf(result[i].userId) === -1) {
                        users.push(result[i].userId);
                    }

                }
                callback(null, users);
            }
        })
    }

    function getBaseCategory(callback) {
        let sql = "SELECT a.id FROM attributesHeaderMst a,docuCategory d where a.sequence_no=1 and d.DeleteFlag=0 and a.DeleteFlag=0 and a.id=d.headerId and d.docuId= ? and d.clientId= ?;";
        con.query(sql, [data.docuId, data.clientId], function (err, result1) {
            if (err) {
                util.logData(err);
                callback(err, null);
            } else {
                let sql1 = 'select id, ATTRVAL title from TICKETATTRIBUTES where DeleteFlag=0 and attrHeaderMstId=' + result1[0].id + ';'
                con.query(sql1, function (err, result) {
                    if (err) {
                        util.logData(err);
                        callback(err, null);
                    } else {
                        callback(null, result);
                    }
                });
            }
        })
    }

    async.parallel([/*getGroups, getUsersAndAction, */getAttribute, getBaseCategory], function (err, results) {
        if (err) {
            util.logData(err);
            cb(err, null);
        } else {

            for (let i = 0; i < results[1].length; i++) {
                if (results[1][i].id !== results[0][0].options[0].id) {
                    results[0][0].options.push(results[1][i]);
                }
            }
            cb(null, true, {
                cat: results[0]
            })

            // const attrib = results[2];
            // const selectedCat = attrib[0].options[0].id;
            // data.categoryId = selectedCat;
            // dataAccess.getSupportGroupByCategory(data, function (err, success, groups) {
            //     if (err) {
            //         util.logData(err);
            //         cb(err, false);
            //     } else {
            //         if (groups.length > 0) {
            //             let grp = [];
            //             for (let i = 0; i < groups.length; i++) {
            //                 grp.push(groups[i].id);
            //             }
            //             util.logData('grp::' + grp)
            //             dataAccess.getUsersByMultiGroup({
            //                 clientId: data.clientId,
            //                 groups: grp
            //             }, function (err, success, usrs) {
            //                 if (err) {
            //                     util.logData(err);
            //                     cb(err, false);
            //                 } else {
            //                     if (usrs.length > 0) {
            //                         cb(null, true, {
            //                             cat: results[2],
            //                             selectedgroups: results[0],
            //                             selectedUsers: results[1],
            //                             groups: groups,
            //                             users: usrs
            //                         })
            //                     } else {
            //                         cb(null, true, {
            //                             cat: results[2],
            //                             selectedgroups: results[0],
            //                             selectedUsers: results[1],
            //                             groups: groups,
            //                             users: []
            //                         })
            //                     }
            //                 }
            //             })
            //         } else {
            //             cb(null, true, {
            //                 cat: results[2],
            //                 selectedgroups: results[0],
            //                 selectedUsers: results[1],
            //                 groups: [],
            //                 users: []
            //             })
            //         }
            //     }
            // })
        }
    })
}

function getActionsByDocuId(data, cb) {
    getDocuActions(data, function (err, success, action) {
        if (err) {
            util.logData(err);
            cb(err, null);
        } else {
            let sql = 'select distinct actionId from docuUser where DeleteFlag=0 and docuId=' + data.docuId + ' and clientId=' + data.clientId;
            con.query(sql, function (err, result) {
                if (err) {
                    util.logData(err);
                    cb(err, null);
                } else {
                    for (let i = 0; i < action.length; i++) {
                        for (j = 0; j < result.length; j++) {
                            if (action[i].id === result[j].actionId) {
                                action[i].checked = true;
                                break;
                            }
                        }
                    }
                    cb(null, true, action);
                }
            })
        }
    })
}

function getAttachments(data, cb) {
    let sql = 'select path,original_filename,createddate from documentAttachment where DeleteFlag=0 and docuId=' + data.docuId + ' and clientId=' + data.clientId;
    con.query(sql, function (err, result) {
        if (err) {
            util.logData(err);
            cb(err, null);
        } else {
            cb(null, result);
        }
    })
}

function getDocuActions(data, cb) {
    let sql = 'select * from docuAction';
    con.query(sql, function (err, resp) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, true, resp);
        }
    })
}

function getAttachmentByDocuId(data, cb) {
    let sql = 'Select version,path,original_filename as fileName ,createddate from documentAttachment where DeleteFlag=0 and docuId=?';
    con.query(sql, [data.docuId], function (err, result) {
        if (err) {
            util.logData(err);
            cb(err, null);
        } else {
            cb(null, true, result);
        }
    })
}

function getDataByText(data, cb) {
    request
        .get(DOCU_URL + '/searchUploadedFile?clientId=' + data.clientId + '&text=' + data.text )
        .end((err, resp) => {
            if (err) {
                util.logData(err);
                cb(err, false)
            } else {
                util.logData('documentFileUpload--' + JSON.stringify(resp));
                const res = JSON.parse(resp.text);
                // console.log(JSON.stringify(res));
                const searchDetails = res.searchDetails;
                if (searchDetails.length > 0) {
                    const searchId = [];
                    for (let i = 0; i < searchDetails.length; i++) {
                        searchId.push(searchDetails[i].id);
                    }
                    console.log(JSON.stringify(searchId));
                    let sql = 'SELECT D.id,D.docu_id,D.keyword, D.title,D.startDate,D.endDate,U.NAME name  FROM document AS D ' +
                        'JOIN USER AS U ON U.id = D.createdBy ' +
                        'WHERE D.DeleteFlag=0 and U.DeleteFlag=0 and D.id in ' +
                        '(select docuId from documentAttachment dAtt where dAtt.DeleteFlag=0 and ' +
                        'dAtt.id in (?)) and D.clientId =? GROUP BY D.id';
                    con.query(sql, [searchId, data.clientId], function (err, result1) {
                        if (err) {
                            util.logData(err);
                            cb(err, false)
                        } else {
                            if (result1.length > 0) {
                                const dataSet = {userId: data.user_id, docuSet: result1};
                                getPermissionByUserId(dataSet, function (err, success, value) {
                                    if (err) {
                                        cb(err, false)
                                    } else {
                                        if (success) {
                                            cb(null, true, value);
                                        } else {
                                            cb(null, false)
                                        }
                                    }
                                })
                            } else {
                                cb(null, true, []);
                            }
                        }
                    })
                } else {
                    cb(null, true, []);
                }
            }
        });
}

function addDocuComment(data, cb) {
    let sql = 'insert into docuComments(docuId,feedback,createbyid) values(?,?,?);'
    con.query(sql, [data.docuId, data.feedback, data.createdBy], function (err, result) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, true);
        }
    })
}

function getComments(data, cb) {
    let sql = 'SELECT docuComments.feedback,docuComments.createdate createddate,USER.NAME name FROM docuComments,USER where USER.DeleteFlag=0 and docuComments.createbyid=USER.id and docuComments.docuId=? ORDER BY docuComments.createdate DESC';
    con.query(sql, [data.docuId], function (err, result) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, true, result);
        }
    })
}

function searchDocuId(data, cb) {
    var str = " select docu_id from document where DeleteFlag=0 and clientId=? and upper(docu_id) like '%" + data.id.toUpperCase() + "%' LIMIT 5; ";
    con.query(str, [data.clientId], function (err, result) {
        if (err) {
            util.logData(err);
            cb(err, null);
        } else {
            cb(null, true, result);
        }
    });
}

function getGroupsByDocument(data, cb) {
    // let sql='select a.id from TICKETATTRIBUTES a ,attributesHeaderMst b where a.DeleteFlag=0 and b.DeleteFlag=0 and a.attrHeaderMstId=b.id and b.sequence_no=1 and b.ticket_type in (select id from TICKETATTRIBUTES where DeleteFlag=0 and ATTRID=3 and sequence_no=10)';
    let sql = 'SELECT a.id FROM attributesHeaderMst a where  a.DeleteFlag=0 and a.sequence_no=1 and a.ticket_type in (SELECT id FROM TICKETATTRIBUTES b where b.ATTRID=3 and b.CLIENTID=? and b.sequence_no=10 );'
    con.query(sql, [data.clientId], function (err, result) {
        if (err) {
            util.logData(err);
            cb(err, null);
        } else {
            if (result.length > 0) {
                let sql1 = 'select c.id,c.LEVELSHORTDESC name from SupportGrpWithTicketAttributes a,docuCategory b,SUPPORTGROUPLEVEL c where ' +
                    'a.DeleteFlag=0 and b.DeleteFlag=0 and c.DeleteFlag=0 and c.id=a.supportGroupLevelId ' +
                    ' and a.ticketAttrId=b.categoryId and b.headerId=? and a.clientId=? GROUP BY a.supportGroupLevelId;'
                con.query(sql1, [result[0].id, data.clientId], function (err, result1) {
                    if (err) {
                        util.logData(err);
                        cb(err, null);
                    } else {
                        cb(null, true, result1);
                    }
                })
            } else {
                cb(null, true, result);
            }
        }
    })
}

function getActionsByDocument(data, cb) {
    let sql = 'SELECT id FROM document where docu_id=? and DeleteFlag=0 and clientId=?';
    con.query(sql, [data.docuId, data.clientId], function (err, result) {
        if (err) {
            util.logData(err);
            cb(err, null);
        } else {
            if (result.length > 0) {
                let sql1 = 'select a.id,b.NAME,c.action,d.LEVELSHORTDESC groupName ' +
                    'from docuUser a,docuAction c,USER b, ' +
                    'supportGroupUser e,SUPPORTGROUPLEVEL d where a.DeleteFlag=0 and b.DeleteFlag=0 and ' +
                    'd.DeleteFlag=0 and e.DeleteFlag=0 and a.userId=b.id and a.actionId=c.id and e.userId=a.userId ' +
                    'and e.supportGroupLevelId=d.id and a.docuId=? and a.clientId=? group by c.id,b.id;';
                con.query(sql1, [result[0].id, data.clientId], function (err, result1) {
                    if (err) {
                        util.logData(err);
                        cb(err, null);
                    } else {
                        cb(null, true, result1);
                    }
                })
            } else {
                cb(null, true, result);
            }
        }
    })
}

function addUserActionDocumentWise(data, cb) {
    let sql = 'SELECT id FROM document where docu_id=? and DeleteFlag=0 and clientId=?';
    con.query(sql, [data.search_id, data.clientId], function (err, result) {
        if (err) {
            util.logData(err);
            cb(err, null);
        } else {
            if (result.length > 0) {
                data.docuId = result[0].id;
                addUserAndAction(data, function (err, success) {
                    if (err) {
                        cb(err, null);
                    } else {
                        cb(null, true);
                    }
                })
            } else {
                cb(null, false, 'Working on Wrong Document');
            }
        }
    })
}

function checkPermission(data, TYPE_ID, cb) {
    let sql1 = 'select actionId from docuUser where DeleteFlag=0 and userId=? and docuId=? group by actionId ;';
    con.query(sql1, [data.user_id, data.docuId], function (err, result1) {
        if (err) {
            cb(err, null);
        } else {
            util.logData(JSON.stringify(result1));
            if (result1.length > 0) {
                let isPermission = false;
                for (let i = 0; i < result1.length; i++) {
                    if (result1[i].actionId === TYPE_ID) {
                        isPermission = true;
                        break;
                    }
                }
                if (isPermission) {
                    cb(null, true);
                } else {
                    cb(null, false);
                }
            } else {
                cb(null, false);
            }
        }
    });
}

function deleteActionDocumentWise(data, cb) {
    let sql1 = 'select docuId from docuUser where id=? and DeleteFlag=0';
    con.query(sql1, [data.id], function (err, result1) {
        if (err) {
            cb(err, false);
        } else {
            if (result1.length > 0) {
                data.docuId = result1[0].docuId;
                checkPermission(data, DELETE_ID,function (err, success) {
                    if (err) {
                        cb(err, false);
                    } else {
                        if (success) {
                            let sql = 'update docuUser set DeleteFlag=1 ,delete_by_id = ?,DeleteDate=NOW() where id=?';
                            con.query(sql, [data.user_id, data.id], function (err, result) {
                                if (err) {
                                    cb(null, err)
                                } else {
                                    util.logData(JSON.stringify(result))
                                    if (result.affectedRows > 0) {
                                        cb(null, true);
                                    } else {
                                        cb(null, false);
                                    }
                                }
                            })
                        } else {
                            cb(null, false, DELETE_PERMISSION)
                        }
                    }
                });
            } else {
                cb(null, false, DELETE_PERMISSION)
            }
        }
    });


}

function deleteDocument(data, cb) {
    data.docuId = data.id;
    checkPermission(data, DELETE_ID,function (err, success) {
        if (err) {
            cb(err, null)
        } else {
            if (success) {
                let sql = 'update document set DeleteFlag=1 ,delete_by_id = ?,DeleteDate=NOW() where id=?';
                con.query(sql, [data.user_id, data.id], function (err, result) {
                    if (err) {
                        cb(null, err)
                    } else {
                        util.logData(JSON.stringify(result))
                        if (result.affectedRows > 0) {
                            //cb(null, true);
                            function deleteUserAction(callback) {
                                let sql = 'update docuUser set DeleteFlag=1 ,delete_by_id = ?,DeleteDate=NOW() where docuId=? and DeleteFlag=0';
                                con.query(sql, [data.user_id, data.id], function (err, result) {
                                    if (err) {
                                        util.logData(err)
                                        callback(err, false)
                                    } else {
                                        callback(null, true);
                                    }
                                })
                            }

                            function deleteAttachment(callback) {
                                let sql = 'update documentAttachment set DeleteFlag=1 ,delete_by_id = ?,DeleteDate=NOW() where docuId=? and DeleteFlag=0';
                                con.query(sql, [data.user_id, data.id], function (err, result) {
                                    if (err) {
                                        util.logData(err)
                                        callback(err, false)
                                    } else {
                                        callback(null, true);
                                    }
                                })
                            }

                            function deleteCategory(callback) {
                                let sql = 'update docuCategory set DeleteFlag=1 ,delete_by_id = ?,DeleteDate=NOW() where docuId=? and DeleteFlag=0';
                                con.query(sql, [data.user_id, data.id], function (err, result) {
                                    if (err) {
                                        util.logData(err)
                                        callback(err, false)
                                    } else {
                                        callback(null, true);
                                    }
                                })
                            }

                            async.parallel([deleteUserAction, deleteAttachment, deleteCategory], function (err) {
                                if (err) {
                                    cb(err, false)
                                } else {
                                    cb(null, true);
                                }
                            })
                        } else {
                            cb(null, false);
                        }
                    }
                })
            } else {
                cb(null, false, DELETE_PERMISSION);
            }
        }
    });

}
function autoSearch(data,cb){
    request
        .get(SLA_URL + '/autoSearchKeyword?clientId=' + data.clientId +'&searchKeyword=' + data.searchKeyword)
        .end((err, resp) => {
            if (err) {
                // logData(err);
                cb(err,false)
            } else {
                const res = JSON.parse(resp.text);
                console.log(JSON.stringify(resp));
                if(res.success){
                    cb(null,true,res.searchDetails);
                }else{
                    cb(null,false,'Something Went Wrong')
                }
            }
        });
}

module.exports.deleteDocument = deleteDocument;
module.exports.deleteActionDocumentWise = deleteActionDocumentWise;
module.exports.addUserActionDocumentWise = addUserActionDocumentWise;
module.exports.getActionsByDocument = getActionsByDocument;
module.exports.getGroupsByDocument = getGroupsByDocument;
module.exports.searchDocuId = searchDocuId;
module.exports.getComments = getComments;
module.exports.addDocuComment = addDocuComment;
module.exports.getDataByText = getDataByText;
module.exports.addAttachment = addAttachment;
module.exports.getAttachmentByDocuId = getAttachmentByDocuId;
module.exports.updateDocument = updateDocument;
module.exports.getActionsByDocuId = getActionsByDocuId
module.exports.getDocuActions = getDocuActions;
module.exports.getAttachments = getAttachments;
module.exports.getDocumentDetails = getDocumentDetails;
module.exports.getDataByDate = getDataByDate;
module.exports.getDataByEmail = getDataByEmail;
module.exports.uploadDocument = uploadDocument;
module.exports.getDataByCategory = getDataByCategory;
