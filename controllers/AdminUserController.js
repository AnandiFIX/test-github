var database = require('./database/AdminUserDB');
var logger = require('inspire').logger;
var controller = require('inspire').abstractController;
// We are using form post functionality here
var postForm = require('inspire').postForm;
var util = require('./util');
var AdminUserController = function () {
    logger.log("constructed ");
}

//Extends abstract controller
AdminUserController.__proto__ = controller;

AdminUserController.getUserClientWise = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getUserClientWise(data, function (err, success, details) {
        util.callback(err,success,details);
        AdminUserController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
}

AdminUserController.insertUser = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertUserDB(fields, function (err, success, details) {
            util.callback(err,success,details);
            AdminUserController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}

AdminUserController.editUserMst = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.editUserMst(fields, function (err, success, details) {
            util.callback(err,success,details);
            AdminUserController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
};

AdminUserController.deleteUserFrmAdmin = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteUserFrmAdmin(fields, function (err, success, details) {
            util.callback(err,success,details);
            AdminUserController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
};
AdminUserController.getUserByClient = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getUserByClient(data, function (err, success, details) {
        util.callback(err,success,details);
        AdminUserController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

module.exports.AdminUserController = function () {
    return AdminUserController;
};
