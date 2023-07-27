var database = require('./database/holidayDAO');
var logger = require('inspire').logger;
var controller = require('inspire').abstractController;
var postForm = require('inspire').postForm;
var util = require('./util');
var MethodController = function () {
    logger.log("constructed ");
}

//Extends abstract controller
MethodController.__proto__ = controller;

MethodController.insertHoliday = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertHoliday(fields, function (err, success, details) {
            callback(err,success,details);
            MethodController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
MethodController.getHoliday = function(req,res) {
    var data = util.processQueryData(req.queryParams);
    database.getHoliday(data,function (err,success,details) {
        callback(err,success,details)
        MethodController.process(req,res,function(err,content){
            console.log('content -'+content);
        });
    })
};
MethodController.updateHoliday = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.updateHoliday(fields, function (err, success, details) {
            callback(err,success,details);
            MethodController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};

MethodController.updateHolidayDateVal = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.updateHolidayDateVal(fields, function (err, success, details) {
            callback(err,success,details);
            MethodController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
MethodController.deleteHolidayDateVal = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteHolidayDateVal(fields, function (err, success, details) {
            callback(err,success,details);
            MethodController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};

MethodController.getHolidayBySupGrp = function(req,res) {
    var data = util.processQueryData(req.queryParams);
    database.getHolidayBySupGrp(data,function (err,success,details) {
        callback(err,success,details)
        MethodController.process(req,res,function(err,content){
            console.log('content -'+content);
        });
    })
};

function callback(err,success,details){
    if(err){
        console.log(err);
        MethodController.setJson(JSON.stringify({"success":false,"errorMessage":"Something went wrong"}));
    }else{
        if(success) {
            MethodController.setJson(JSON.stringify({"success": true, "details":details}));
        }else{
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
        }
    }
}
module.exports.getMethodController = function () {
    return MethodController;
};
