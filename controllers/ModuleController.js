var database = require('./database/moduleDB');
var logger = require('inspire').logger;
var controller = require('inspire').abstractController;
// We are using form post functionality here
var postForm = require('inspire').postForm;
var util = require('./util');
var ModuleController = function () {
    logger.log("constructed ");
}

//Extends abstract controller
ModuleController.__proto__ = controller;

ModuleController.getModule = function (req, res) {
    var data = util.processQueryData(req.queryParams)
    database.allModulesDB(function (err, success, details) {
        if (err) {
            console.log(err);
            ModuleController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                ModuleController.setJson(JSON.stringify({"success": true, "modules": details}));
            } else {
                ModuleController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        ModuleController.process(req, res, function (err, content) {
            logger.log('content -' + content);
        });
    })
};
ModuleController.insertModule = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertModuleDB(fields, function (err, success, details) {
            if (err) {
                ModuleController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            }
            else {
                if (success) {
                    ModuleController.setJson(JSON.stringify({"success": true, "moduleId": details}));
                } else {
                    ModuleController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            ModuleController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
};
ModuleController.deletePlatformModule = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deletePlatformModule(fields, function (err, success, details) {
            callback(err,success,details);
            ModuleController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}
ModuleController.editModuleMst = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.editModuleMst(fields, function (err, success, details) {
            callback(err,success,details);
            ModuleController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
};
ModuleController.getSomeModules = function (req, res) {
    var data = util.processQueryData(req.queryParams)
    database.getSomeModules(data, function (err, success, details) {
        callback(err,success,details);
        ModuleController.process(req, res, function (err, content) {
            logger.log('content -' + content);
        });
    })
};

function callback(err,success,details){
    if(err){
        console.log(err);
        ModuleController.setJson(JSON.stringify({"success":false,"errorMessage":"Something went wrong"}));
    }else{
        if(success) {
            ModuleController.setJson(JSON.stringify({"success": true, "details":details}));
        }else{
            ModuleController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
        }
    }
}

module.exports.getModuleController = function () {
    return ModuleController;
};
