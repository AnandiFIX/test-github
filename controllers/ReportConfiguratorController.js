var ReportConfiguratorDB = require('./database/ReportConfiguratorDB');
var logger = require('inspire').logger;
var controller = require('inspire').abstractController;
// We are using form post functionality here
var postForm = require('inspire').postForm;
var util = require('./util');
var ReportConfiguratorController = function () {
    logger.log("constructed ");
}

ReportConfiguratorController.__proto__ = controller;

ReportConfiguratorController.getColumListByTableName = function (req, res) {
    var data = util.processQueryData(req.queryParams)
    ReportConfiguratorDB.getColumListByTableName(data,function (err, success, details) {
        util.callback(err,success,details);
        ReportConfiguratorController.process(req, res, function (err, content) {
            logger.log('content -' + content);
        });
    })
};

ReportConfiguratorController.addReportConfiguratorTemplate = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        ReportConfiguratorDB.addReportConfiguratorTemplate(fields, function (err, success, details) {
            util.callback(err,success,details);
            ReportConfiguratorController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
};

ReportConfiguratorController.getReportConfiguratorTemplateList = function (req, res) {
    var data = util.processQueryData(req.queryParams)
    ReportConfiguratorDB.getReportConfiguratorTemplateList(data,function (err, success, details) {
        util.callback(err,success,details);
        ReportConfiguratorController.process(req, res, function (err, content) {
            logger.log('content -' + content);
        });
    })
};

ReportConfiguratorController.getUniqueValueByField = function (req, res) {
    var data = util.processQueryData(req.queryParams)
    ReportConfiguratorDB.getUniqueValueByField(data,function (err, success, details) {
        util.callback(err,success,details);
        ReportConfiguratorController.process(req, res, function (err, content) {
            logger.log('content -' + content);
        });
    })
};


ReportConfiguratorController.getReportTableData = function (req, res) {
    var data = util.processQueryData(req.queryParams)
    ReportConfiguratorDB.getReportTableData(data,function (err, success, details) {
        util.callback(err,success,details);
        ReportConfiguratorController.process(req, res, function (err, content) {
            logger.log('content -' + content);
        });
    })
};



ReportConfiguratorController.getSLAComplainceReport = function (req, res) {
    var data = util.processQueryData(req.queryParams)
    ReportConfiguratorDB.getSLAComplainceReport(data,function (err, success, details) {
        util.callback(err,success,details);
        ReportConfiguratorController.process(req, res, function (err, content) {
            logger.log('content -' + content);
        });
    })
};

ReportConfiguratorController.getCSATReport = function (req, res) {
    var data = util.processQueryData(req.queryParams)
    ReportConfiguratorDB.getCSATReport(data,function (err, success, details) {
        util.callback(err,success,details);
        ReportConfiguratorController.process(req, res, function (err, content) {
            logger.log('content -' + content);
        });
    })
};

ReportConfiguratorController.getEscalationReport = function (req, res) {
    var data = util.processQueryData(req.queryParams)
    ReportConfiguratorDB.getEscalationReport(data,function (err, success, details) {
        util.callback(err,success,details);
        ReportConfiguratorController.process(req, res, function (err, content) {
            logger.log('content -' + content);
        });
    })
};

ReportConfiguratorController.getProductivityReport = function (req, res) {
    var data = util.processQueryData(req.queryParams)
    ReportConfiguratorDB.getProductivityReport(data,function (err, success, details) {
        util.callback(err,success,details);
        ReportConfiguratorController.process(req, res, function (err, content) {
            logger.log('content -' + content);
        });
    })
};

ReportConfiguratorController.getProductivityTeam = function (req, res) {
    var data = util.processQueryData(req.queryParams)
    ReportConfiguratorDB.getProductivityTeam(data,function (err, success, details) {
        util.callback(err,success,details);
        ReportConfiguratorController.process(req, res, function (err, content) {
            logger.log('content -' + content);
        });
    })
};

ReportConfiguratorController.getTrendReport = function (req, res) {
    var data = util.processQueryData(req.queryParams)
    ReportConfiguratorDB.getTrendReport(data,function (err, success, details) {
        util.callback(err,success,details);
        ReportConfiguratorController.process(req, res, function (err, content) {
            logger.log('content -' + content);
        });
    })
};

ReportConfiguratorController.getHeatmapReport = function (req, res) {
    var data = util.processQueryData(req.queryParams)
    ReportConfiguratorDB.getHeatmapReport(data,function (err, success, details) {
        util.callback(err,success,details);
        ReportConfiguratorController.process(req, res, function (err, content) {
            logger.log('content -' + content);
        });
    })
};

ReportConfiguratorController.getTrendBarReport = function (req, res) {
    var data = util.processQueryData(req.queryParams)
    ReportConfiguratorDB.getTrendBarReport(data,function (err, success, details) {
        util.callback(err,success,details);
        ReportConfiguratorController.process(req, res, function (err, content) {
            logger.log('content -' + content);
        });
    })
};

ReportConfiguratorController.getReportCategory = function (req, res) {
    var data = util.processQueryData(req.queryParams)
    ReportConfiguratorDB.getReportCategory(data,function (err, success, details) {
        util.callback(err,success,details);
        ReportConfiguratorController.process(req, res, function (err, content) {
            logger.log('content -' + content);
        });
    })
};

ReportConfiguratorController.getReportStatus = function (req, res) {
    var data = util.processQueryData(req.queryParams)
    ReportConfiguratorDB.getReportStatus(data,function (err, success, details) {
        util.callback(err,success,details);
        ReportConfiguratorController.process(req, res, function (err, content) {
            logger.log('content -' + content);
        });
    })
};

ReportConfiguratorController.getReportFilters = function (req, res) {
    var data = util.processQueryData(req.queryParams)
    ReportConfiguratorDB.getReportFilters(data,function (err, success, details) {
        util.callback(err,success,details);
        ReportConfiguratorController.process(req, res, function (err, content) {
            logger.log('content -' + content);
        });
    })
};

module.exports.getReportConfiguratorController = function () {
    return ReportConfiguratorController;
};