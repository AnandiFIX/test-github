var database = require('./database/DocumentDB');
var logger = require('inspire').logger;
var controller = require('inspire').abstractController;
var postForm = require('inspire').postForm;
var util = require('./util');
var DocumentController = function () {
    logger.log("constructed ");
}

//Extends abstract controller
DocumentController.__proto__ = controller;

DocumentController.uploadDocument = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.uploadDocument(fields, function (err, success, details) {
            util.callback(err,success,details);
            DocumentController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
};
DocumentController.getDataByCategory = function(req,res) {
    var data = util.processQueryData(req.queryParams);
    database.getDataByCategory(data,function (err,success,details) {
        util.callback(err,success,details)
        DocumentController.process(req,res,function(err,content){
            console.log('content -'+content);
        });
    })
};
DocumentController.getDataByEmail = function(req,res) {
    var data = util.processQueryData(req.queryParams);
    database.getDataByEmail(data,function (err,success,details) {
        util.callback(err,success,details)
        DocumentController.process(req,res,function(err,content){
            console.log('content -'+content);
        });
    })
};
DocumentController.getDataByDate = function(req,res) {
    var data = util.processQueryData(req.queryParams);
    database.getDataByDate(data,function (err,success,details) {
        util.callback(err,success,details)
        DocumentController.process(req,res,function(err,content){
            console.log('content -'+content);
        });
    })
};
DocumentController.getDocumentDetails = function(req,res) {
    var data = util.processQueryData(req.queryParams);
    database.getDocumentDetails(data,function (err,success,details) {
        util.callback(err,success,details)
        DocumentController.process(req,res,function(err,content){
            console.log('content -'+content);
        });
    })
};
DocumentController.getActionsByDocuId = function(req,res) {
    var data = util.processQueryData(req.queryParams);
    database.getActionsByDocuId(data,function (err,success,details) {
        util.callback(err,success,details)
        DocumentController.process(req,res,function(err,content){
            console.log('content -'+content);
        });
    })
};
DocumentController.getDocuActions = function(req,res) {
    var data = util.processQueryData(req.queryParams);
    database.getDocuActions(data,function (err,success,details) {
        util.callback(err,success,details);
        DocumentController.process(req,res,function(err,content){
            console.log('content -'+content);
        });
    })
};
DocumentController.getDataByText = function(req,res) {
    var data = util.processQueryData(req.queryParams);
    database.getDataByText(data,function (err,success,details) {
        util.callback(err,success,details);
        DocumentController.process(req,res,function(err,content){
            console.log('content -'+content);
        });
    })
};
DocumentController.getAttachmentByDocuId = function(req,res) {
    var data = util.processQueryData(req.queryParams);
    database.getAttachmentByDocuId(data,function (err,success,details) {
        util.callback(err,success,details);
        DocumentController.process(req,res,function(err,content){
            console.log('content -'+content);
        });
    })
};
DocumentController.updateDocument = function(req,res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.updateDocument(fields, function (err, success, details) {
            util.callback(err,success,details);
            DocumentController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
};

DocumentController.addDocuComment = function(req,res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.addDocuComment(fields, function (err, success, details) {
            util.callback(err,success,details);
            DocumentController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
};
DocumentController.getComments = function(req,res) {
    var data = util.processQueryData(req.queryParams);
    database.getComments(data,function (err,success,details) {
        util.callback(err,success,details);
        DocumentController.process(req,res,function(err,content){
            console.log('content -'+content);
        });
    })
};

DocumentController.searchDocuId = function(req,res) {
    var data = util.processQueryData(req.queryParams);
    database.searchDocuId(data,function (err,success,details) {
        util.callback(err,success,details);
        DocumentController.process(req,res,function(err,content){
            console.log('content -'+content);
        });
    })
};
DocumentController.getGroupsByDocument = function(req,res) {
    var data = util.processQueryData(req.queryParams);
    database.getGroupsByDocument(data,function (err,success,details) {
        util.callback(err,success,details);
        DocumentController.process(req,res,function(err,content){
            console.log('content -'+content);
        });
    })
};
DocumentController.getActionsByDocument = function(req,res) {
    var data = util.processQueryData(req.queryParams);
    database.getActionsByDocument(data,function (err,success,details) {
        util.callback(err,success,details);
        DocumentController.process(req,res,function(err,content){
            console.log('content -'+content);
        });
    })
};
DocumentController.addUserActionDocumentWise = function(req,res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.addUserActionDocumentWise(fields, function (err, success, details) {
            util.callback(err,success,details);
            DocumentController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
};
DocumentController.deleteActionDocumentWise = function(req,res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteActionDocumentWise(fields, function (err, success, details) {
            util.callback(err,success,details);
            DocumentController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
};
DocumentController.deleteDocument = function(req,res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteDocument(fields, function (err, success, details) {
            util.callback(err,success,details);
            DocumentController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
};
DocumentController.autoSearch = function(req,res) {
    var data = util.processQueryData(req.queryParams);
    database.autoSearch(data,function (err,success,details) {
        util.callback(err,success,details);
        DocumentController.process(req,res,function(err,content){
            console.log('content -'+content);
        });
    })
};
module.exports.getDocumentController = function () {
    return DocumentController;
};
