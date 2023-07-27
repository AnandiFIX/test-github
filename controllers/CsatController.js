var database = require('./database/CsatDB');
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
var CsatController = function () {
    logger.log("checklistcontroller constructed");

}

var count = 0;
//Extends abstract controllers
CsatController.__proto__ = controller;


CsatController.insertCsatRating = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertCsatRating(fields, function (err, success, details) {
            callback(err, success, details);
            CsatController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
CsatController.deleteCsatRating=function (req,res){
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteCsatRating(fields, function (err, success, details) {
            callback(err, success, details);
            CsatController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });

}

CsatController.getCsatRating = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getCsatRating(data, function (err, success, details) {
        callback(err, success, details);
        CsatController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

CsatController.editCsatRating=function (req,res){
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        console.log("test");

        database.editCsatRating(fields, function (err, success, details) {
            callback(err, success, details);
            CsatController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
}

CsatController.modifyCsatQuestion=function (req,res){
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.modifyCsatQuestion(fields, function (err, success, details) {
            callback(err, success, details);
            CsatController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });

}

CsatController.deleteCsatQuestion=function (req,res){
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteCsatQuestion(fields, function (err, success, details) {
            callback(err, success, details);
            CsatController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });

}

CsatController.insertCsatQuestion = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertCsatQuestion(fields, function (err, success, details) {
            callback(err, success, details);
            CsatController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};

CsatController.getCsatQuestionList = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getCsatQuestionList(data, function (err, success, details) {
        callback(err, success, details);
        CsatController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

// ------------------------------------------
CsatController.getCsatRatingList = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getCsatRatingList(data, function (err, success, details) {
        callback(err, success, details);
        CsatController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

CsatController.getCsatQuestion = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getCsatQuestion(data, function (err, success, details) {
        callback(err, success, details);
        CsatController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};


function callback(err, success, details) {
    if (err) {
        console.log(err);
        CsatController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
    } else {
        if (success) {
            CsatController.setJson(JSON.stringify({"success": true, "details": details}));
        } else {
            CsatController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
        }
    }
}
module.exports.getCsatController = function () {
    return CsatController;
};