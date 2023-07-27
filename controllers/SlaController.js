var database = require('./database/slaDAO');
var logger = require('inspire').logger;
var controller = require('inspire').abstractController;
var postForm = require('inspire').postForm;
var util = require('./util');
var MethodController = function () {
    logger.log("constructed ");
}

//Extends abstract controller
MethodController.__proto__ = controller;

MethodController.getSLAClientWiseDetails = function(req,res) {
    var data = util.processQueryData(req.queryParams);
    database.getSLAClientWiseDetails(data,function (err,success,details) {
        callback(err,success,details)
        MethodController.process(req,res,function(err,content){
            logger.log('content -'+content);
        });
    })
};

MethodController.insertSLAClientWiseDetails = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertSLAClientWiseDetails(fields, function (err, success, details) {
            callback(err,success,details);
            MethodController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};

MethodController.updateSLAClientWiseDetails = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.updateSLAClientWiseDetails(fields, function (err, success, details) {
            callback(err,success,details);
            MethodController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};

MethodController.deleteSLAClientWiseDetails = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteSLAClientWiseDetails(fields, function (err, success, details) {
            callback(err,success,details);
            MethodController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};

MethodController.getSLAClientWiseDetailsBySupGrp = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getSLAClientWiseDetailsBySupGrp(data,function (err,success,details) {
        callback(err,success,details)
        MethodController.process(req,res,function(err,content){
            logger.log('content -'+content);
        });
    })
};

MethodController.getClientWiseSlaClient = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getClientWiseSlaClient(data,function (err,success,details) {
        callback(err,success,details)
        MethodController.process(req,res,function(err,content){
            logger.log('content -'+content);
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
