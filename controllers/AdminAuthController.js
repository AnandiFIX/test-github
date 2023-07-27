var database = require('./database/AdminAuthDB');
var logger = require('inspire').logger;
var controller = require('inspire').abstractController;
// We are using form post functionality here
var postForm = require('inspire').postForm;
var util = require('./util');
var AdminAuthController = function () {
    logger.log("constructed ");
}

//Extends abstract controller
AdminAuthController.__proto__ = controller;


AdminAuthController.getAdminUserAuthorization = function (req, res) {
    let data = util.processQueryData(req.queryParams);
    database.getAdminUserAuthorization(data, function (err, success, details) {
        util.callback(err,success,details);
        AdminAuthController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

AdminAuthController.getAdminUserAuth = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAdminUserAuth(data, function (err, success, details) {
        util.callback(err,success,details);
        AdminAuthController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
}

AdminAuthController.setAdminUserAuth = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        console.log(JSON.stringify(fields));
        database.setAdminUserAuth(fields.data, function (err, success, details) {
            util.callback(err,success,details);
            AdminAuthController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
};


AdminAuthController.deleteAdminUserAuth = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteAdminUserAuth(fields, function (err, success, details) {
            util.callback(err,success,details);
            AdminAuthController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}


module.exports.getAdminAuthController = function () {
    return AdminAuthController;
};