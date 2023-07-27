/**
 * Example Controller to get Static File
 * A controller which can be used to get Static File as response
 */
var roleDatabase = require('./database/roleDB');
var database = require('./database/DataAccess');
var logger = require('inspire').logger;
var controller = require('inspire').abstractController;
// We are using form post functionality here
var postForm = require('inspire').postForm;
var jwt = require('jsonwebtoken');
var util = require('./util');
var config = require('./database/config');

var RoleController = function () {
    logger.log("RoleController constructed ");
}

//Extends abstract controller
RoleController.__proto__ = controller;

RoleController.insertUserRole = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        roleDatabase.insertUserRoleDB(fields, function (err, success, details) {
            if (err) {
                RoleController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));

            }
            else {
                if (success) {
                    RoleController.setJson(JSON.stringify({"success": true, "roleId": details}));
                } else {
                    RoleController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            RoleController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}

RoleController.deleteUserRoleDB = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        roleDatabase.deleteUserRoleDB(fields, function (err, success, details) {
            if (err) {
                RoleController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            }
            else {
                if (success) {
                    RoleController.setJson(JSON.stringify({"success": true, "id": details}));
                } else {
                    RoleController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            RoleController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}

RoleController.editRoleMst = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        roleDatabase.editRoleMst(fields, function (err, success, details) {
            if (err) {
                RoleController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            }
            else {
                if (success) {
                    RoleController.setJson(JSON.stringify({"success": true,}));
                } else {
                    RoleController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            RoleController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}

RoleController.getUserdetails = function (req, res) {
    console.log('inside getUserdetails');
    var data = util.processQueryData(req.queryParams);
    console.log('#######################', data);
    database.getUserdetails(data, function (err, success, details) {
        if (err) {
            console.log(err);
            RoleController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                RoleController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                RoleController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        RoleController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
}

RoleController.getRoleClientWise = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    roleDatabase.getRoleClientWise(data, function (err, success, details) {
        if (err) {
            console.log(err);
            RoleController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                RoleController.setJson(JSON.stringify({"success": true, "roles": details}));
            } else {
                RoleController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        RoleController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
}
RoleController.getSomeRoleClientWise = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    roleDatabase.getSomeRoleClientWise(data, function (err, success, details) {
        if (err) {
            console.log(err);
            RoleController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                RoleController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                RoleController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        RoleController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
RoleController.getAllRoles = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    roleDatabase.getAllRoles(data, function (err, success, details) {
        callback(err, success, details);
        RoleController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
function callback(err, success, details) {
    if (err) {
        console.log(err);
        RoleController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
    } else {
        if (success) {
            RoleController.setJson(JSON.stringify({"success": true, "details": details}));
        } else {
            RoleController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
        }
    }
}

module.exports.getRoleController = function () {
    return RoleController;
};
