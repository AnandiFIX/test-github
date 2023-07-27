var database = require('./database/StatusDB');
var logger = require('inspire').logger;
var controller = require('inspire').abstractController;
// We are using form post functionality here
var postForm = require('inspire').postForm;
var util = require('./util');
var StatusController = function () {
    logger.log("constructed ");
}

//Extends abstract controller
StatusController.__proto__ = controller;


StatusController.getStatus = function(req,res) {
    var data = util.processQueryData(req.queryParams);
    database.getStatus(data,function (err,success,details) {
        util.callback(err,success,details);
        StatusController.process(req,res,function(err,content){
            console.log('content -'+content);
        });
    })
};
StatusController.getSomeStatus = function(req,res) {
    var data = util.processQueryData(req.queryParams);
    database.getSomeStatus(data,function (err,success,details) {
        util.callback(err,success,details);
        StatusController.process(req,res,function(err,content){
            console.log('content -'+content);
        });
    })
};

module.exports.getStatusController = function () {
    return StatusController;
};
