var database = require('./database/ChecklistDB');
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
var ChecklistController = function () {
    logger.log("checklistcontroller constructed");

}

var count = 0;
//Extends abstract controllers
ChecklistController.__proto__ = controller;


ChecklistController.insertChecklist = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertChecklist(fields, function (err, success, details) {
            callback(err, success, details);
            ChecklistController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
ChecklistController.deleteChecklist=function (req,res){
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteChecklist(fields, function (err, success, details) {
            callback(err, success, details);
            ChecklistController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });

}

ChecklistController.getChecklist = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getChecklist(data, function (err, success, details) {
        callback(err, success, details);
        ChecklistController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

ChecklistController.editChecklist=function (req,res){
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        console.log("test");

        database.editChecklist(fields, function (err, success, details) {
            callback(err, success, details);
            ChecklistController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });

}
ChecklistController.getCheckListDetails = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getCheckListDetails(data, function (err, success, details) {
        callback(err, success, details);
        ChecklistController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

ChecklistController.insertTicketWiseCheckList = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertTicketWiseCheckList(fields, function (err, success, details) {
            callback(err, success, details);
            ChecklistController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
ChecklistController.getChecklistQuestion = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    util.logData(data);
    database.getChecklistQuestion(data, function (err, success, details) {
        callback(err, success, details);
        ChecklistController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
function callback(err, success, details) {
    if (err) {
        console.log(err);
        ChecklistController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
    } else {
        if (success) {
            ChecklistController.setJson(JSON.stringify({"success": true, "details": details}));
        } else {
            ChecklistController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
        }
    }
}
module.exports.getChecklistController = function () {
    return ChecklistController;
};