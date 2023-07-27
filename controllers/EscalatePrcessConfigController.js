var database = require('./database/EscalatePrcessConfigDB');
var logger = require('inspire').logger;
var controller = require('inspire').abstractController;
// We are using form post functionality here
var postForm = require('inspire').postForm;
var jwt = require('jsonwebtoken');
var util = require('./util');
var config = require('./database/config');
var dbConn = require('./database/dbConnection');
var con = dbConn.createMysqlConn();
var AWS = require('aws-sdk');
var fs = require("fs");

var bucketName = global.gConfig.BUCKET_NAME;
var docu = require('./database/DocumentDB');
var EscalatePrcessConfigController = function () {
    logger.log("checklistcontroller constructed");

}

var count = 0;
//Extends abstract controllers
EscalatePrcessConfigController.__proto__ = controller;


EscalatePrcessConfigController.insertEscalatePrcessConfig = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertEscalatePrcessConfig(fields, function (err, success, details) {
            callback(err, success, details);
            EscalatePrcessConfigController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
EscalatePrcessConfigController.deleteEscalatePrcessConfig=function (req,res){
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteEscalatePrcessConfig(fields, function (err, success, details) {
            callback(err, success, details);
            EscalatePrcessConfigController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });

}

EscalatePrcessConfigController.getEscalatePrcessConfig = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getEscalatePrcessConfig(data, function (err, success, details) {
        callback(err, success, details);
        EscalatePrcessConfigController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

function callback(err, success, details) {
    if (err) {
        console.log(err);
        EscalatePrcessConfigController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
    } else {
        if (success) {
            EscalatePrcessConfigController.setJson(JSON.stringify({"success": true, "details": details}));
        } else {
            EscalatePrcessConfigController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
        }
    }
}
module.exports.getEscalatePrcessConfigController = function () {
    return EscalatePrcessConfigController;
};