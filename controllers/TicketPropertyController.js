var database = require('./database/TicketPropertyDB');
var logger = require('inspire').logger;
var controller = require('inspire').abstractController;
// We are using form post functionality here
var postForm = require('inspire').postForm;
var util = require('./util');
var TicketPropertyController = function () {
    logger.log("constructed ");
}

//Extends abstract controller
TicketPropertyController.__proto__ = controller;

TicketPropertyController.insertTicketProperty = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertTicketProperty(fields, function (err, success, details) {
            util.callback(err,success,details);
            TicketPropertyController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}

TicketPropertyController.getTicketProperty = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTicketProperty(data, function (err, success, details) {
        util.callback(err,success,details);
        TicketPropertyController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};




module.exports.TicketPropertyController = function () {
    return TicketPropertyController;
};