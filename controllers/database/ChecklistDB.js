const config = require('./dbConnection');
const con = config.createMysqlConn();
// const logger = require('inspire').logger;
const util=require('../util');
const async = require('async');
var ChecklistEntity=require('../Entity/ChecklistEntity');

function preventSqlInjection(data) {
    let arr={};
    for(key in data){
        arr[key]=data[key];
    }
    return arr;
}

function insertChecklist(data,cb){
    console.log('--------checklist-----> ', JSON.stringify(data));
    data = new ChecklistEntity(data);
    let sql;
    if (data.predifinedValue) {
        sql='insert into checklist (client_id,description,createbyid,category_id,tickettype_id,status_id, status_sequence, fieldType, predifinedValue) VALUES (?,?,?,?,?,?,?,?,?)';
        con.query(sql,[data.client_id,data.description,data.user_id,data.category_id,data.tickettype_id,data.status, data.status_sequence, data.fieldType, data.predifinedValue], function (err, result) {
            if (err) {
                util.logData(err);
                cb(err, null);
            } else {
                if (result.insertId > 0) {
                    cb(null, true, result.insertId);
                } else {
                    cb(null, false, "No data found....");
                }
            }
        });
    } else {
        sql='insert into checklist (client_id,description,createbyid,category_id,tickettype_id,status_id, status_sequence, fieldType) VALUES (?,?,?,?,?,?,?,?)';
        con.query(sql,[data.client_id,data.description,data.user_id,data.category_id,data.tickettype_id,data.status, data.status_sequence, data.fieldType], function (err, result) {
            if (err) {
                util.logData(err);
                cb(err, null);
            } else {
                if (result.insertId > 0) {
                    cb(null, true, result.insertId);
                } else {
                    cb(null, false, "No data found....");
                }
            }
        });
    }
}

function deleteChecklist(data,cb){
    data = new ChecklistEntity(data);
    let sql="UPDATE checklist SET `DeleteFlag`=1,delete_by_id = ?,DeleteDate=NOW() WHERE `id`=?";
    con.query(sql,[data.user_id, data.id], function (err, result) {
        if (err) {
            util.logData(err);
            cb(err, null);
        } else {
            cb(null, true, result);
        }
    });
}

function getChecklist(data, cb) {
    data = new ChecklistEntity(data);
    var page_size = data.page_size;
    var paginationType = data.paginationType;
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
            str = "select a.id, (select ATTRVAL from TICKETATTRIBUTES where id=a.tickettype_id) ticketType, " +
                " (select ATTRVAL from TICKETATTRIBUTES where id = a.status_id) ticketStatus," +
                " (select replace(GROUP_CONCAT(ATTRVAL),',',' / ') category from TICKETATTRIBUTES where FIND_IN_SET(id,(a.category_id))) category, a.description, fieldType, predifinedValue " +
                " from checklist a where a.id > ? and a.client_id = ? and a.DeleteFlag = 0 ORDER BY a.id ASC LIMIT ?";
        } else if (paginationType == 'prev') {
            str = "select * from (select a.id, (select ATTRVAL from TICKETATTRIBUTES where id=a.tickettype_id) ticketType, " +
                " (select ATTRVAL from TICKETATTRIBUTES where id = a.status_id) ticketStatus," +
                " (select replace(GROUP_CONCAT(ATTRVAL),',',' / ') category from TICKETATTRIBUTES where FIND_IN_SET(id,(a.category_id))) category, a.description, fieldType, predifinedValue " +
                " from checklist a where a.id < ? and a.client_id = ? and a.DeleteFlag = 0 ORDER BY a.id desc LIMIT ?) Z ORDER BY Z.id  ASC";
        }

        con.query(str, [offset, data.client_id, Number(page_size)], function (err, done) {
            if (err) {
                util.logData(err);
                cb(err, null);
            } else {
                cb(null, done);

            }
        });
    }

    function totalData(cb) {
        var str1 = "select count(a.id) count from checklist a where a.client_id = ? and a.DeleteFlag = 0";
        con.query(str1, [data.client_id], function (err, done) {
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

function editChecklist(data,cb){
    data = new ChecklistEntity(data);
    let sql="UPDATE checklist SET `description`=?, `predifinedValue`=?, modifybyid = ?, modify_date=NOW() WHERE `id`=?";
    con.query(sql,[data.description, data.predifinedValue, data.user_id, data.id], function (err, result) {
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
function getCheckListDetails(data,cb){
    data = new ChecklistEntity(data);
    let count = 0;
    let catId = '';
    var category = [];
    const category_id = data.category_id.split(",");
    for (let i = 0; i < category_id.length; i++) {
        if (catId === '') {
            catId = category_id[i];
        } else {
            catId = catId + ',' + category_id[i];
        }
        let sql="SELECT id, description, fieldType, predifinedValue FROM `checklist` WHERE `client_id` = ? AND `status_sequence` = ? AND `category_id`=? AND `DeleteFlag` = 0";
        console.log('get checklist sql ==> ', sql);
        console.log('params ============> ', data.client_id + ' ' + data.status_sequence + ' ' + catId)
        con.query(sql,[data.client_id, data.status_sequence, catId], function (err, result) {
            if (err) {
                util.logData(err);
                cb(err, null);
            } else {
                count ++;
                if (result.length > 0) {
                    for (let j = 0; j < result.length; j++) {
                        category.push(result[j]);
                    }
                }
                if (category_id.length === count) {
                    cb(null, true, category);
                }
            }
        });
    }
}


function insertTicketWiseCheckList(data,cb){
    const checklistId = data.qna;
    let count = 0;
    for (let i = 0; i < checklistId.length; i++) {
        // checklistId[i].checklist_id=con.escape(checklistId[i].checklist_id);
        // checklistId[i].answer=con.escape(checklistId[i].answer);
        let sql = 'INSERT INTO `ticket_checklist` (`client_id`, `ticketId`, `WFCClientResultId`, `checklistId`, `answer`, `createbyid`) VALUES (?,?,?,?,?,?);';
        con.query(sql, [data.clientId, data.ticketId, data.WFCClientResultId, checklistId[i].checklist_id, checklistId[i].answer, data.user_id], function (err, result) {
            if (err) {
                util.logData(err);
                cb(err, null);
            } else {
                count++;
                if (checklistId.length === count) {
                    cb(null, true, 'Record insert successfully');
                }
            }
        });
    }
}
function getChecklistQuestion(data,cb){
    let sql ='SELECT count(id) count FROM `checklist` where client_id=?';
    con.query(sql,[data.clientId],function(err,res){
        if(err){
            cb(err,null)
        }
        else{
            console.log('result==== ' + JSON.stringify(res));
            let sql ='select a.client_id, a.answer , b.description from ticket_checklist as a join checklist as b '+
                'on a.checklistId = b.id  where a.DeleteFlag = ? and a.client_id= ? and a.ticketId=? ORDER BY a.id DESC limit ?;';
            con.query(sql,[0, data.clientId, data.ticketId, res[0].count],function(err,result){
                if(err){
                    cb(err,null)
                }
                else{
                    cb(null,true,result);
                }
            })
        }
    })
}

module.exports.getChecklistQuestion = getChecklistQuestion;
module.exports.getCheckListDetails = getCheckListDetails;
module.exports.insertTicketWiseCheckList = insertTicketWiseCheckList;
module.exports.insertChecklist = insertChecklist;
module.exports.deleteChecklist = deleteChecklist;
module.exports.getChecklist = getChecklist;
module.exports.editChecklist = editChecklist;


