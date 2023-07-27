var database = require('./database/FaqDB');
var logger = require('inspire').logger;
var controller = require('inspire').abstractController;
// We are using form post functionality here
var util = require('./util');
var FaqController = function () {
    logger.log("constructed ");
}
var postForm = require('inspire').postForm;

//Extends abstract controller
FaqController.__proto__ = controller;

FaqController.getFaqCategory = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getFaqCategory(data, function (err, success, details) {
        callback(err,success,details);
        FaqController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

FaqController.getFaqDetails = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getFaqDetails(data, function (err, success, details) {
        callback(err,success,details);
        FaqController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

FaqController.getFaqSearchData = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getFaqSearchData(data, function (err, success, details) {
        callback(err,success,details);
        FaqController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

FaqController.getAllFaqCategory = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAllFaqCategory(data, function (err, success, details) {
        callback(err,success,details);
        FaqController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

FaqController.insertFaqCategory = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertFaqCategory(fields, function (err, success, details) {
            callback(err, success, details);
            FaqController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};

FaqController.deleteFaqCategory = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteFaqCategory(fields, function (err, success, details) {
            callback(err, success, details);
            FaqController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};

FaqController.updateFaqCategory = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.updateFaqCategory(fields, function (err, success, details) {
            callback(err, success, details);
            FaqController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};

FaqController.getAllFaq = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAllFaq(data, function (err, success, details) {
        callback(err,success,details);
        FaqController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

FaqController.insertFaq = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertFaq(fields, function (err, success, details) {
            callback(err, success, details);
            FaqController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};

FaqController.deleteFaq = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteFaq(fields, function (err, success, details) {
            callback(err, success, details);
            FaqController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};

FaqController.updateFaq = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.updateFaq(fields, function (err, success, details) {
            callback(err, success, details);
            FaqController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};

FaqController.deleteFaqDocumentLog = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteFaqDocumentLog(fields, function (err, success, details) {
            callback(err, success, details);
            FaqController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};

FaqController.insertFaqDocumentLog = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertFaqDocumentLog(fields, function (err, success, details) {
            callback(err, success, details);
            FaqController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};

FaqController.getFaqDocumentLog = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getFaqDocumentLog(data, function (err, success, details) {
        callback(err,success,details);
        FaqController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

function callback(err, success, details) {
    if (err) {
        console.log(err);
        FaqController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
    } else {
        if (success) {
            FaqController.setJson(JSON.stringify({"success": true, "details": details}));
        } else {
            FaqController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
        }
    }
}

module.exports.getFaqController = function () {
    return FaqController;
};