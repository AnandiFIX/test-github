const config = require('./dbConnection');
const con = config.createMysqlConn();
// const logger = require('inspire').logger;
const async = require('async');
const util = require('../util');
var AssetReportEntity = require('../Entity/AssetReportEntity');

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

function getAssetReportDataTable(data, cb){
    console.log(data);
    const val=util.preventSqlInjection(data);
    console.log(val);
    data= new AssetReportEntity(val);
    console.log(data);
    var str = "select ar.id, ar.filename, ar.reporttype, ar.createbyid, ar.CLIENTID, DATE_FORMAT(ar.createdate, '%Y-%m-%d %H:%i:%s') createdate from asset_report ar where ar.CLIENTID = "+data.clientId +" order by ar.id desc";
    con.query(str, function (err, done, fields) {
        if (err) {
            util.logData('---Error from getAssetReportDataTable inside getAssetReportDB.js----');
            util.logData(err);
            cb(err, null);
        } else {
            cb(null, true, done);
        }
    });
}


module.exports.getAssetReportDataTable = getAssetReportDataTable;