var database = require('./database/UrlCreationDB');
var logger = require('inspire').logger;
var controller = require('inspire').abstractController;
// We are using form post functionality here
var postForm = require('inspire').postForm;
var util = require('./util');
var UrlCreationController = function () {
    logger.log("constructed ");
}

//Extends abstract controller
UrlCreationController.__proto__ = controller;

UrlCreationController.insertUrlKey = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertUrlKeyDB(fields, function (err, success, details) {
            util.callback(err,success,details);
            UrlCreationController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}

UrlCreationController.getUrlByClient = function(req,res) {
    var data = util.processQueryData(req.queryParams);
    database.getUrlByClient(data,function (err,success,details) {
        util.callback(err,success,details);
        UrlCreationController.process(req,res,function(err,content){
            console.log('content -'+content);
        });
    })
};

UrlCreationController.deleteUrl = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteUrl(fields, function (err, success, details) {
            util.callback(err,success,details);
            UrlCreationController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}

UrlCreationController.editUrlMst = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.editUrlMst(fields, function (err, success, details) {
            util.callback(err,success,details);
            UrlCreationController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}


module.exports.UrlCreationController = function () {
    return UrlCreationController;
};
