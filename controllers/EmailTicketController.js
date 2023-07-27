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

var EmailTicketDB = require('./database/EmailTicketDB');

var bucketName = global.gConfig.BUCKET_NAME;
var docu = require('./database/DocumentDB');
var EmailTicketController = function () {
    logger.log("EmailTicketController constructed");
}
var count = 0;
//Extends abstract controllers
EmailTicketController.__proto__ = controller;

EmailTicketController.getEmailTicketSenderType = function (req, res) {
    var data = util.processQueryData(req.queryParams)
    EmailTicketDB.getEmailTicketSenderType(data,function (err, success, details) {
        util.callback(err,success,details);
        EmailTicketController.process(req, res, function (err, content) {
            logger.log('content -' + content);
        });
    })
};

EmailTicketController.insertEmailTicketKeyword= function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        EmailTicketDB.insertEmailTicketKeyword(fields, function (err, success, details) {
            util.callback(err,success,details);
            EmailTicketController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
};

EmailTicketController.allEmailTicketKeyword = function (req, res) {
    var data = util.processQueryData(req.queryParams)
    EmailTicketDB.allEmailTicketKeyword(data, function (err, success, details) {
        util.callback(err,success,details);
        console.log('re=', details);
        EmailTicketController.process(req, res, function (err, content) {
            logger.log('content -' + content);
        });
    })
};

EmailTicketController.editEmailTicketKeyword= function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        EmailTicketDB.editEmailTicketKeyword(fields, function (err, success, details) {
            util.callback(err,success,details);
            EmailTicketController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
};

EmailTicketController.deleteEmailTicketKeyword= function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        EmailTicketDB.deleteEmailTicketKeyword(fields, function (err, success, details) {
            util.callback(err,success,details);
            EmailTicketController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
};

EmailTicketController.getEmailTicketServiceUser = function (req, res) {
    var data = util.processQueryData(req.queryParams)
    EmailTicketDB.getEmailTicketServiceUser(data,function (err, success, details) {
        util.callback(err,success,details);
        EmailTicketController.process(req, res, function (err, content) {
            logger.log('content -' + content);
        });
    })
};

EmailTicketController.getEmailTicketFieldsCatWise = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    EmailTicketDB.getEmailTicketFieldsCatWise(data, function (err, success, details) {
        util.callback(err, success, details);
        EmailTicketController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

EmailTicketController.getEmailTicketAttributesParentWiseWithPriority = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    EmailTicketDB.getEmailTicketAttributesParentWiseWithPriority(data, function (err, success, details) {
        // console.log(details)
        util.callback(err, success, details);
        EmailTicketController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

EmailTicketController.getEmailTicketCreateLoadingDtls = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    // console.log('data----' + JSON.stringify(data));
    EmailTicketDB.getEmailTicketCreateLoadingDtls(data, function (err, success, details) {
        // if (err) {
        //     console.log(err);
        //     EmailTicketController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        // } else {
        //     if (success) {
        //         EmailTicketController.setJson(JSON.stringify({"success": true, "details": details}));
        //     } else {
        //         EmailTicketController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
        //     }
        // }
        util.callback(err, success, details)
        EmailTicketController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

EmailTicketController.getEmailTicketBusinessPriorityTicketTypeWise = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    EmailTicketDB.getEmailTicketBusinessPriorityTicketTypeWise(data, function (err, success, details) {
        util.callback(err, success, details)
        EmailTicketController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

EmailTicketController.insertEmailFeedback= function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        EmailTicketDB.insertEmailFeedback(fields, function (err, success, details) {
            util.callback(err,success,details);
            EmailTicketController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
};

EmailTicketController.AddEmailAttr= function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        EmailTicketDB.AddEmailAttr(fields, function (err, success, details) {
            util.callback(err,success,details);
            EmailTicketController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
};

EmailTicketController.deleteEmailAttribute= function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        EmailTicketDB.deleteEmailAttribute(fields, function (err, success, details) {
            util.callback(err,success,details);
            EmailTicketController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
};


EmailTicketController.getEmailAttrMaster = function (req, res) {
    var data = util.processQueryData(req.queryParams)
    EmailTicketDB.getEmailAttrMaster(data, function (err, success, details) {
        util.callback(err,success,details);
        console.log('re=', details);
        EmailTicketController.process(req, res, function (err, content) {
            logger.log('content -' + content);
        });
    })
};



module.exports.getEmailTicketController = function () {
    return EmailTicketController;
};
