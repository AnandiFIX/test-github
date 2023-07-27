var database = require('./database/TicketTypeDB');
var logger = require('inspire').logger;
var controller = require('inspire').abstractController;
// We are using form post functionality here
var postForm = require('inspire').postForm;
var util = require('./util');
var TicketTypeController = function () {
    logger.log("constructed ");
}

//Extends abstract controller
TicketTypeController.__proto__ = controller;

TicketTypeController.getTicketType = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTicketType(data, function (err, success, details) {
        util.callback(err,success,details);
        TicketTypeController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
TicketTypeController.getTicketTypeForTicketCreation = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTicketTypeForTicketCreation(data, function (err, success, details) {
        util.callback(err,success,details);
        TicketTypeController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

TicketTypeController.insertTicketAttributesClientWise = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertTicketAttributesClientWise(fields, function (err, success, details) {
            util.callback(err,success,details);
            TicketTypeController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
}


TicketTypeController.deleteTicketAttributesClientWise = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteTicketAttributesClientWise(fields, function (err, success, details) {
            util.callback(err,success,details);
            TicketTypeController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
}

TicketTypeController.updateTicketCategory = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        // console.log('fields--'+JSON.stringify(fields))
        database.updateTicketCategory(fields, function (err, success, details) {
            util.callback(err,success,details);
            TicketTypeController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};

TicketTypeController.getSomeTicketType = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getSomeTicketType(data, function (err, success, details) {
        util.callback(err,success,details);
        TicketTypeController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
TicketTypeController.getTicketTypeForTicketCreation_LNT = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTicketTypeForTicketCreation_LNT(data, function (err, success, details) {
        util.callback(err,success,details);
        TicketTypeController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

TicketTypeController.updateTicketAttributesClientWise = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.updateTicketAttributesClientWise(fields, function (err, success, details) {
            util.callback(err,success,details);
            TicketTypeController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
}

module.exports.getTicketTypeController = function () {
    return TicketTypeController;
};
