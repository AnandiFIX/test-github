const config = require('./dbConnection');
const con = config.createMysqlConn();
// const logger = require('inspire').logger;
const util = require('../util');
var StatusEntity = require('../Entity/StatusEntity');
var async = require('async');

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

function getStatus(data, cb) {
    const val = preventSqlInjection(data);
    data = new StatusEntity(val);
    var str = 'select id, ATTRVAL name ,Attr_desc description,sequence_no seq,is_stopSlaMeter stopSlaMeter, is_command_required commandRequired from TICKETATTRIBUTES where DeleteFlag=0 and CLIENTID= ' + data.clientId + ' and ATTRID=2';
    con.query(str, function (err, result) {
        if (err) {
            util.logData(err);
            cb(err, null);
        } else {
            for (let i = 0; i < result.length; i++) {
                result[i].stopSlaMeter = stringToBool(result[i].stopSlaMeter);
            }
            cb(null, true, result);

        }
    });
}


function stringToBool(value) {
    if (value === 'true' || value === 'True' || value === 'TRUE')
        return true;
    else
        return false;
}
function getSomeStatus(data, cb) {
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
                    for (let i = 0; i < results.dataObj.length; i++) {
                        results.dataObj[i].stopSlaMeter = stringToBool(results.dataObj[i].stopSlaMeter)
                    }
                    results['nextOffset'] = nextOffset;
                    results['previousOffset'] = previousOffset;
                }
                cb(null, true, results);
            }
        });

    function dataObj(cb) {
        if (paginationType == 'next' || paginationType == '') {
            var str = 'select id, ATTRVAL name ,Attr_desc description,sequence_no seq,is_stopSlaMeter stopSlaMeter,' +
                ' is_command_required commandRequired from ' +
                ' TICKETATTRIBUTES where id > ' + offset + ' and DeleteFlag=0 and CLIENTID= ' + data.clientId +
                ' and ATTRID=2 ORDER BY id ASC LIMIT ' + page_size;
        } else if (paginationType == 'prev') {
            str = 'select * from (select id, ATTRVAL name ,Attr_desc description,sequence_no seq,is_stopSlaMeter stopSlaMeter, ' +
                ' is_command_required commandRequired from ' +
                ' TICKETATTRIBUTES where id < ' + offset + ' and DeleteFlag=0 and CLIENTID= ' + data.clientId +
                ' and ATTRID=2 ORDER BY id DESC LIMIT ' + page_size + ')z ORDER BY z.id  ASC;';
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
        var str1 = 'select count(id) count from ' +
            ' TICKETATTRIBUTES where DeleteFlag=0 and CLIENTID= ' + data.clientId + ' and ATTRID=2';
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

module.exports.getSomeStatus = getSomeStatus;
module.exports.getStatus = getStatus;
