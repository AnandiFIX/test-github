var database = require('./database/autoTicketDB');
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
var AutoTicketController = function () {
    logger.log("autoTicketController constructed");
}
var count = 0;
//Extends abstract controllers
AutoTicketController.__proto__ = controller;

AutoTicketController.insertAutoTicket = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
    	//console.log("test");

        database.insertAutoTicket(fields, function (err, success, details) {
            callback(err, success, details);
            AutoTicketController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
AutoTicketController.deleteAutoTicket=function (req,res){
	var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
    	console.log("test");

        database.deleteAutoTicket(fields, function (err, success, details) {
            callback(err, success, details);
            AutoTicketController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });

};

AutoTicketController.editAutoTicket=function (req,res){
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        console.log("test");

        database.editAutoTicket(fields, function (err, success, details) {
            callback(err, success, details);
            AutoTicketController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });

}

AutoTicketController.getAutoTicket = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAutoTicket(data, function (err, success, details) {
        callback(err, success, details);
        AutoTicketController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
AutoTicketController.getScheduleTicket = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getScheduleTicket(data, function (err, success, details) {
        callback(err, success, details);
        AutoTicketController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
function callback(err, success, details) {
    if (err) {
        console.log(err);
        AutoTicketController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
    } else {
        if (success) {
            AutoTicketController.setJson(JSON.stringify({"success": true, "details": details}));
        } else {
            AutoTicketController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
        }
    }
}

module.exports.getAutoTicketController = function () {
    return AutoTicketController;
};
