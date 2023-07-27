var database = require('./database/DataAccess');
var logger = require('inspire').logger;
var controller = require('inspire').abstractController;

var util = require('./util');

var postForm = require('inspire').postForm;
var MethodController = function () {
    logger.log("MethodController constructed");
}

var count = 0;
//Extends abstract controllers
MethodController.__proto__ = controller;

MethodController.getClient = function (req, res) {
    database.allClientsDB(function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "clients": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getClientDetails = function (req, res) {
    database.getClientDetails(function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "clients": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};


// MethodController.getModule = function (req, res) {
//     var data = util.processQueryData(req.queryParams)
//     database.allModulesDB(function (err, success, details) {
//         if (err) {
//             console.log(err);
//             MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
//         } else {
//             if (success) {
//                 MethodController.setJson(JSON.stringify({"success": true, "modules": details}));
//             } else {
//                 MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
//             }
//         }
//         MethodController.process(req, res, function (err, content) {
//             console.log('content -' + content);
//         });
//     })
// };

MethodController.getRole = function (req, res) {
    database.allRolesDB(function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "roles": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getUrlKey = function (req, res) {
    database.allUrlKeyDB(function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "urls": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getModulesByClientId = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.allModulesByClientIdDB(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "modules": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getUrlByModuleClient = function (req, res) {
    var data = util.processQueryData(req.queryParams);

    database.allUrlByModuleClientDB(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "url": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getMappedModule = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.allMappedModuleDB(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "modules": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getMappedRoleWithClient = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getMappedRoleWithClient(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "roles": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getUsers = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.allUserCreationListDB(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "users": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getModuleUrl = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getModuleUrl(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "urls": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
}
MethodController.getMappedURL = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getMappedURL(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "urls": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
}
// MethodController.getRoleForClient = function (req, res) {
//     database.getMappedURL(function (err, success, details) {
//         if (err) {
//             console.log(err);
//             MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
//         } else {
//             if (success) {
//                 MethodController.setJson(JSON.stringify({"success": true, "roles": details}));
//             } else {
//                 MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
//             }
//         }
//         MethodController.process(req, res, function (err, content) {
//             console.log('content -' + content);
//         });
//     })
// }


MethodController.getUserRolesMap = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getUserRolesMap(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "usrRoleMap": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
}
MethodController.getModuleRolesMapping = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getModuleRolesMapping(data, function (err, success, details) {
        if (err) {
            util.logData(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "moduleRoleMap": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            util.logData('content -' + content);
        });
    })
}
MethodController.getActions = function (req, res) {
    database.getActions(function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "actions": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
}
MethodController.getUserdetails = function (req, res) {
    console.log('inside getUserdetails')
    var data = util.processQueryData(req.queryParams);
    database.getUserdetails(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
}
MethodController.getUsrActionMapping = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getUsrActionMapping(data, function (err, success, details) {
        if (err) {
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));

        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "usrAction": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            util.logData('content -' + content);
        });
    })
}
MethodController.getUserAuthorization = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getUserAuthorization(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
}

MethodController.getUserByRole = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getUserByRole(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
}
MethodController.getMappedModuleUserClient = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getMappedModuleUserClient(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            util.logData('content -' + content);
        });
    })
}
MethodController.getAdminModule = function (req, res) {
    console.log('inside getadmin');
    database.getAdminModule(function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));

        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }

        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
}
MethodController.getDynamicMenuDtls = function (req, res) {

    let data = util.processQueryData(req.queryParams);
    database.getDynamicMenuDtls(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));

        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }

        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
}


MethodController.getVendorMst = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getVendorMst(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            util.logData('content -' + content);
        });
    })
};

MethodController.getClientVendorUserMapping = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getClientVendorUserMapping(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getSupportGroupVendorMapping = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getSupportGroupVendorMapping(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            util.logData('content -' + content);
        });
    })
};

MethodController.getSupportGroupSPOC = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getSupportGroupSPOC(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));

        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }

        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getSupportGroupUserMapping = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getSupportGroupUserMapping(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getSupportGrpLevel = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getSupportGrpLevel(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));

        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }

        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getSupportGroupByClientId = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getSupportGroupByClientId(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getUserWiseActions = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getUserWiseActions(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));

        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }

        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getRoleUserActionMap = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    util.logData('controller data============' + data);
    database.getRoleUserActionMap(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getTicketProperty = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTicketProperty(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));

        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }

        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getMenuDtlsClientWise = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getMenuDtlsClientWise(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));

        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }

        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getMenuCompleteDtlsClientWise = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getMenuCompleteDtlsClientWise(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
}
// MethodController.getRoleUserActionMapping = function (req, res) {
//     var data = util.processQueryData(req.queryParams);
//     database.getRoleUserActionMapping(data, function (err, success, details) {
//         if (err) {
//             console.log(err);
//             MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
//
//         } else {
//             if (success) {
//                 MethodController.setJson(JSON.stringify({"success": true, "actionDtls": details}));
//             } else {
//                 MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
//             }
//
//         }
//         MethodController.process(req, res, function (err, content) {
//             console.log('content -' + content);
//         });
//     })
// }
MethodController.getAttributesHeaderMstClientWise = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAttributesHeaderMstClientWise(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));

        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }

        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
}
MethodController.getTicketAttributesClientWise = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTicketAttributesClientWise(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
}
MethodController.getTicketAttrClientAttributesWise = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTicketAttrClientAttributesWise(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
}

MethodController.getTicketAttrClientAttributesWise_chr = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTicketAttrClientAttributesWise_chr(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
}


MethodController.getBusinessImpact = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getBusinessImpact(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getBusinessPriorityImpactUrgencyBasis = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getBusinessPriorityImpactUrgencyBasis(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getBusinessUrgency = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getBusinessUrgency(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getMappingWithTicketAttrSuppGrp = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getMappingWithTicketAttrSuppGrp(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getSupportGroupByVendor = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getSupportGroupByVendor(data, function (err, success, details) {
        if (err) {
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getSLADetails = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getSLADetails(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getBusinessMatrix = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getBusinessMatrix(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getMetadataTable = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getMetadataTable(data, function (err, success, details) {
        if (err) {
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getTableWiseActions = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTableWiseActions(data, function (err, success, details) {
        if (err) {
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getTableActionMap = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTableActionMap(data, function (err, success, details) {
        if (err) {
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};


MethodController.getFieldByTable = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getFieldByTable(data, function (err, success, details) {
        if (err) {
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getTableFieldWiseActions = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTableFieldWiseActions(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getTableFieldActionMap = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTableFieldActionMap(data, function (err, success, details) {
        if (err) {
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getTableUrlMap = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTableUrlMap(data, function (err, success, details) {
        if (err) {
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getUrlByTable = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getUrlByTable(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getTableUserWiseActions = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTableUserWiseActions(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getTableUserActionMap = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTableUserActionMap(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getTableFieldUserWiseActions = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTableFieldUserWiseActions(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getTableFieldUserActionMap = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTableFieldUserActionMap(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getWorkFlow = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getWorkFlow(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));

        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }

        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getWorkFlowComponent = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getWorkFlowComponent(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));

        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }

        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getWorkFlowComponentDetails = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getWorkFlowComponentDetails(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));

        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }

        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getWFCClient = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getWFCClient(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));

        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }

        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getWFCClientByClientId = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getWFCClientByClientId(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));

        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }

        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.searchZone = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.searchZone(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));

        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }

        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getComponentsByworkflowId = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getComponentsByworkflowId(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));

        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }

        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getTicketCreateLoadingDtls = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    // console.log('data----' + JSON.stringify(data));
    database.getTicketCreateLoadingDtls(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getAttributesParentWise = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    console.log('data----' + JSON.stringify(data));
    database.getAttributesParentWise(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getBusinessPriority = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getBusinessPriority(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getLastLevelCategory = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getLastLevelCategory(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                console.log(details);
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getSupportGroupByCategory = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getSupportGroupByCategory(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                console.log(details);
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getSupportGroupByCategory1 = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getSupportGroupByCategory1(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                console.log(details);
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getUserByGroup = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getUserByGroup(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getUserByGroup1 = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getUserByGroup1(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                console.log(details);
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getTicketByMe = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTicketByMe(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getStatus = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getStatus(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getMappedTicketType = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getMappedTicketType(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getMappedStatus = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getMappedStatus(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getNextAssigneeDtls = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getNextAssigneeDtls(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getTicketCategoryDetails = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTicketCategoryDetails(data, function (err, success, details) {
        // console.log(JSON.stringify(details));
        callback(err, success, details);
        // if(err){
        //     console.log(err);
        //     MethodController.setJson(JSON.stringify({"success":false,"errorMessage":"Something went wrong"}));
        // }else{
        //     if(success) {
        //         MethodController.setJson(JSON.stringify({"success": true, "details":details}));
        //     }else{
        //         MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
        //     }
        // }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};


MethodController.getTicketCategoryDetails_SSC = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTicketCategoryDetails_SSC(data, function (err, success, details) {
        // console.log(JSON.stringify(details));
        callback(err, success, details);
        // if(err){
        //     console.log(err);
        //     MethodController.setJson(JSON.stringify({"success":false,"errorMessage":"Something went wrong"}));
        // }else{
        //     if(success) {
        //         MethodController.setJson(JSON.stringify({"success": true, "details":details}));
        //     }else{
        //         MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
        //     }
        // }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getCategoryListSupportGroupWiseForParentId = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getCategoryListSupportGroupWiseForParentId(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};


MethodController.getMyForwardedTicketsInGroup = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getMyForwardedTicketsInGroup(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getMyForwardedTickets = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getMyForwardedTickets(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getCloseTicketInMyGroup = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getCloseTicketInMyGroup(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getMyCloseTicket = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getMyCloseTicket(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getOpenTicketInMyGroup = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getOpenTicketInMyGroup(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getAssignedByMe = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAssignedByMe(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getStatusForClient = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getStatusForClient(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getUserClientWiseNotAssignInGrp = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getUserClientWiseNotAssignInGrp(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getCommentsByTicketId = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getCommentsByTicketId(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getLogsTicketWise = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getLogsTicketWise(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getSolutionsTicketWise = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getSolutionsTicketWise(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getAttachmentTicketWise = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAttachmentTicketWise(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getSupportGrpWithoutVendor = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getSupportGrpWithoutVendor(data, function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "details": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getUserWithOrWithoutVendorMapping = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getUserWithOrWithoutVendorMapping(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getAdditionalFuncTicketTypeWise = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAdditionalFuncTicketTypeWise(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getAdditionalFuncTicketTypeUserWise = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAdditionalFuncTicketTypeUserWise(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getAdditionalFunc = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAdditionalFunc(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getFirstLevelCategory = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getFirstLevelCategory(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getDynamicMenuTicketTypeWise = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getDynamicMenuTicketTypeWise(data, function (err, success, details) {
        console.log(JSON.stringify(details));
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getDynamicTabActionTicketTypeWise = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getDynamicTabActionTicketTypeWise(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getWorkflowType = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getWorkflowType(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getTicketExtandMstTbl = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTicketExtandMstTbl(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getBackwardWorkFlowType = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getBackwardWorkFlowType(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getUrlByClient = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getUrlByClient(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getUnmappedLeafMenu = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getUnmappedLeafMenu(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getRemainingUrlDtls = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getRemainingUrlDtls(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getAllClients = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAllClients(function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getTicketExtandDtlsTicketNFieldWise = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTicketExtandDtlsTicketNFieldWise(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getTicketExtandDtlsTicketWise = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTicketExtandDtlsTicketWise(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getTicketFieldsCatWise = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTicketFieldsCatWise(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getAddionalFieldWithValue = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAddionalFieldWithValue(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getCSatFormDtls = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getCSatFormDtls(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getTicketEscalationDtlsSupportGrpWise = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTicketEscalationDtlsSupportGrpWise(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getTicketIdConfigure = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTicketIdConfigure(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getClientWiseSupportGroupList = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getClientWiseSupportGroupList(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getMappedModuleUserClientCWise = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getMappedModuleUserClientCWise(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getModuleRolesMappingClientWise = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getModuleRolesMappingClientWise(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getTicketPriorityConfiguration = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTicketPriorityConfiguration(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getPriorityMapping = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getPriorityMapping(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getPriorityCategoryWise = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getPriorityCategoryWise(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getSlaRecalculationMstForm = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getSlaRecalculationMstForm(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getMenuDtlsAllClientWise = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getMenuDtlsAllClientWise(data, function (err, success, details) {
        console.log(details)
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getAttributesParentWiseWithPriority = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAttributesParentWiseWithPriority(data, function (err, success, details) {
        // console.log(details)
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getUsrActionMappingWithClientId = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getUsrActionMappingWithClientId(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getRoleUserActionMapWithClientId = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getRoleUserActionMapWithClientId(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getAttributesHeaderMstClientTicketTypeWise = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAttributesHeaderMstClientTicketTypeWise(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getRoleWiseActions = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getRoleWiseActions(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getDynamicTabTicketTypeWise = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getDynamicTabTicketTypeWise(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getDynamicActionTicketTypeWise = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getDynamicActionTicketTypeWise(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getCategoryByTicketId = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getCategoryByTicketId(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getFirstLevelCategoryByTicket = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getFirstLevelCategoryByTicket(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getBusinessPriorityTicketTypeWise = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getBusinessPriorityTicketTypeWise(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getWFCClientBackward = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getWFCClientBackward(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getAttributesHeaderMstClientWiseWithTicket = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAttributesHeaderMstClientWiseWithTicket(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getIncidentTicketDetails = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getIncidentTicketDetails(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getAllIncidentTicketDetails = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAllIncidentTicketDetails(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getIncidentTicketDetailsProblemWise = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getIncidentTicketDetailsProblemWise(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getMappedIncidentTicketDetails = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getMappedIncidentTicketDetails(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.healthCheck = function (req, res) {
    MethodController.setJson(JSON.stringify({"success": true}));
    MethodController.process(req, res, function (err, content) {
        console.log('content -' + content);
    });
};
MethodController.getTicketById = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTicketById(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getSubTicketType = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getSubTicketType(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getDocuTicketDetails = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getDocuTicketDetails(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getUsersByMultiGroup = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getUsersByMultiGroup(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getUsersByMultiGroup = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getUsersByMultiGroup(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getSlaCompletionPercentage = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getSlaCompletionPercentage(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getSalReport = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getSalReport(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getSomeVendorMst = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getSomeVendorMst(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            util.logData('content -' + content);
        });
    })
};


MethodController.getAttributesHeaderMstClientWise = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAttributesHeaderMstClientWise(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getClientDetails = function (req, res) {
    var data = util.processQueryData(req.queryParams)
    database.getClientDetails(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getUsers = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.allUserCreationListDB(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getApiTime = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getApiTime(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getRSDBData = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getRSDBData(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getCategoryByTicketTypeNDynamicLevel = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getCategoryByTicketTypeNDynamicLevel(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getLoginClientList = function (req, res) {
    database.getLoginClientList(function (err, success, details) {
        if (err) {
            console.log(err);
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
        } else {
            if (success) {
                MethodController.setJson(JSON.stringify({"success": true, "clients": details}));
            } else {
                MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
            }
        }
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.generateToken = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.generateToken(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getAttributesHeaderMstTicketTypewise = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAttributesHeaderMstTicketTypewise(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getLNTEmployeeDtls = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getLNTEmployeeDtls(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getWFCGeneratedDetails = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getWFCGeneratedDetails(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getTicketDetailForRSDB = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTicketDetailForRSDB(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getTicketCreateLoadingDtls_lnt = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTicketCreateLoadingDtls_lnt(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getWorkFlowWithPagination = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getWorkFlowWithPagination(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getUserDetailsByLoginId = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getUserDetailsByLoginId(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.searchTicket = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.searchTicket(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            //logger.log('content -' + content);
        });
    });
};
MethodController.getRequesterInfo = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getRequesterInfo(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            //logger.log('content -' + content);
        });
    });
};
MethodController.getStatusClientSSC = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getStatusClientSSC(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            //logger.log('content -' + content);
        });
    });
};
MethodController.getPriorityForLTSSC = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getPriorityForLTSSC(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            //logger.log('content -' + content);
        });
    });
};
MethodController.getOpenTicketInMyCategoryGroup = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getOpenTicketInMyCategoryGroup(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getLastCommentByTicketId = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getLastCommentByTicketId(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getCloseTicketInMyCategoryGroup = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getCloseTicketInMyCategoryGroup(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getDashBoardDtls = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getDashBoardDtls(data, function (err, success, details) {
        console.log('\nsending dashboard data................');
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getFollowupUserLt = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getFollowupUserLt(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.checkIsLead = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.checkIsLead(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

// =========================================
MethodController.getStatusByTicketTypeLt = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getStatusByTicketTypeLt(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getSupportGroupByTicketTypeLt = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getSupportGroupByTicketTypeLt(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getMailTemplateLt = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getMailTemplateLt(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getFollowupLt = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getFollowupLt(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getDynamicMenuTicketDtls = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getDynamicMenuTicketDtls(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getDashBoardDtlsForTeamLead = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getDashBoardDtlsForTeamLead(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getDashBoardDtlsForLeader = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getDashBoardDtlsForLeader(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getAllLevelOneUser = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAllLevelOneUser(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getEscalateDetails = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getEscalateDetails(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getEscalateDetails = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getEscalateDetails(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getEscalationSupportGroup = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getEscalationSupportGroup(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.checkOfflineNotificationData = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.checkOfflineNotificationData(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.checkOfflineDashNotification = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.checkOfflineDashNotification(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getCategoryListSupportGroupWise = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getCategoryListSupportGroupWise(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getChatBotSearchTicket = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getChatBotSearchTicket(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getStatusByTicketTypeIncidentLt = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getStatusByTicketTypeIncidentLt(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.passwordEncryption = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.passwordEncryption(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.encryptData = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    const encryptId = database.encryptData(data.value);
    MethodController.setJson(JSON.stringify({"success": true, "details": encryptId}));
    MethodController.process(req, res, function (err, content) {
    });
};
MethodController.decryptData = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    const decryptId = database.decryptData(data.value);
    MethodController.setJson(JSON.stringify({"success": true, "details": decryptId}));
    MethodController.process(req, res, function (err, content) {
    });
};
MethodController.getTicketCreateLoadingDtlsForSearch = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTicketCreateLoadingDtlsForSearch(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getUrlList = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getUrlList(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getClientSpecificUrl = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getClientSpecificUrl(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getDistinctUrlKey = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getDistinctUrlKey(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getSscReport = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getSscReport(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getPSDetails = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getPSDetails(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getSscReportList = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getSscReportList(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getMappedLeafMenu = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getMappedLeafMenu(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getStatusByTicketTypeForIncident = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getStatusByTicketTypeForIncident(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getFunctionalityByClient = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getFunctionalityByClient(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getFunctionalityDetails = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getFunctionalityDetails(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getDashBoardDtls_new = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getDashBoardDtls_new(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getTempSscReport = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTempSscReport(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getCsatRatingList = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getCsatRatingList(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getCsatQuestion = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getCsatQuestion(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getChildTicketById = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getChildTicketById(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getParentTicketById = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getParentTicketById(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getAssetIdByTicket = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAssetIdByTicket(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getAllLevelOneAndLevelTwoUser = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAllLevelOneAndLevelTwoUser(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getCreateTicketData = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getCreateTicketData(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getDashboardCategory = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getDashboardCategory(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getCreateTicketDataWithGroup = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getCreateTicketDataWithGroup(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getTicketCreateLoadingDtlsWithGroup = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTicketCreateLoadingDtlsWithGroup(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getSelectedDashboardCategory = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getSelectedDashboardCategory(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    });
};
MethodController.getTicketAutoClosureTime = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTicketAutoClosureTime(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getMultipleAttributesParentWiseForLnTCHR = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getMultipleAttributesParentWiseForLnTCHR(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getCategoryByGroupForLnTCHR = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getCategoryByGroupForLnTCHR(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getTicketFunc = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTicketFunc(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getDynamicTotCountMenuTicketDtls = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getDynamicTotCountMenuTicketDtls(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getTicketCategoryDetailsWithGroup = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTicketCategoryDetailsWithGroup(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

// ==========================================
MethodController.getTicketActivityMst = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTicketActivityMst(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getTicketActivityNoficationMst = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTicketActivityNoficationMst(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getFileUploadLogs = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getFileUploadLogs(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getEscalationWorkflow = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getEscalationWorkflow(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getPriorityClientWise = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getPriorityClientWise(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.searchUserDetails = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.searchUserDetails(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getLatestWFCRId = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getLatestWFCRId(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getAdditionalFieldTypeList = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAdditionalFieldTypeList(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getTicketByPlannedDateTime = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTicketByPlannedDateTime(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getTicketByIdMinimal = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTicketByIdMinimal(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getPlannedDateTimeByTicketId = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getPlannedDateTimeByTicketId(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};


MethodController.getUserByGroupCHR = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getUserByGroupCHR(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getUserByGroup1CHR = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getUserByGroup1CHR(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getSupportGroupUserMappingCategoryWise = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getSupportGroupUserMappingCategoryWise(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getSupportGroupLevelWise = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getSupportGroupLevelWise(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getTicketStatusForCHRselfAssign = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTicketStatusForCHRselfAssign(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getTicketCreateLoadingDtls_lntchr = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTicketCreateLoadingDtls_lntchr(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getTicketCategoryDetails_lntchr = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTicketCategoryDetails_lntchr(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getUserGroupRoleDetails = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getUserGroupRoleDetails(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.searchAllUser = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.searchAllUser(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getCategoryGroupMapping = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getCategoryGroupMapping(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getCatfromUrl = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getCatfromUrl(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getTicketCreateLoadingDtls_citapps = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTicketCreateLoadingDtls_citapps(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getSupportGroupNotMapInCatagory = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getSupportGroupNotMapInCatagory(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getLntChrEndUser = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getLntChrEndUser(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getAttrHeader = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAttrHeader(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getstatusSeqData = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getstatusSeqData(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getSubClient = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getSubClient(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.checkSupportGroupManagerialView = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.checkSupportGroupManagerialView(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getSlaCalculation = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getSlaCalculation(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getSlaCalculationDoneByList = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getSlaCalculationDoneByList(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getClietSpecificUrl = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getClietSpecificUrl(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getTicketDetail = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTicketDetail(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getSupportGroupSpecificUrl = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getSupportGroupSpecificUrl(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getUrlBySupportGroup = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getUrlBySupportGroup(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getActiveCategoryDetails = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getActiveCategoryDetails(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

// ==================

MethodController.searchAllRoles = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.searchAllRoles(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};


MethodController.searchAllSupportGroup = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.searchAllSupportGroup(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};


MethodController.searchAllRoleActionMap = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.searchAllRoleActionMap(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.searchAllModuleRoleMap = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.searchAllModuleRoleMap(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.searchAllMapRoleWithUser = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.searchAllMapRoleWithUser(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};


MethodController.searchAllModuleRoleUserMap = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.searchAllModuleRoleUserMap(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};


MethodController.searchAllMapUserWithSupportGroup = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.searchAllMapUserWithSupportGroup(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.searchAllRoleUserActionMap = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.searchAllRoleUserActionMap(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.searchAllSupportGroupSlaClient = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.searchAllSupportGroupSlaClient(data,function (err,success,details) {
        callback(err,success,details)
        MethodController.process(req,res,function(err,content){
            logger.log('content -'+content);
        });
    })
};

MethodController.searchAllCategorySlaMap = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.searchAllCategorySlaMap(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.searchAllLevelOfCategories = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.searchAllLevelOfCategories(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
}

MethodController.searchAllCategory = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.searchAllCategory(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
}

MethodController.searchAllMapClientWithCategoryLevel = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.searchAllMapClientWithCategoryLevel(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.searchAllMapCategoryWithGroup = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.searchAllMapCategoryWithGroup(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.searchAllReportFields = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.searchAllReportFields(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.searchAllViewTicketMenuConfiguration = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.searchAllViewTicketMenuConfiguration(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.searchAllBusinessImpact = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.searchAllBusinessImpact(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.searchAllBusinessUrgency = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.searchAllBusinessUrgency(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.searchAllPriority = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.searchAllPriority(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.searchAllSlaClient = function(req,res) {
    var data = util.processQueryData(req.queryParams);
    database.searchAllSlaClient(data,function (err,success,details) {
        callback(err,success,details)
        MethodController.process(req,res,function(err,content){
            logger.log('content -'+content);
        });
    })
};

MethodController.searchAllStatus = function(req,res) {
    var data = util.processQueryData(req.queryParams);
    database.searchAllStatus(data,function (err,success,details) {
        callback(err,success,details);
        MethodController.process(req,res,function(err,content){
            console.log('content -'+content);
        });
    })
};

MethodController.searchAllBusinessMatrix = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.searchAllBusinessMatrix(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.searchAllEscalation = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.searchAllEscalation(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.searchAllFollowUp = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.searchAllFollowUp(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.searchAllFileUploadLogs = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.searchAllFileUploadLogs(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getTicketDetailsById = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTicketDetailsById(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getAnyTicketById = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAnyTicketById(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};


MethodController.getNotifiationMaster = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getNotifiationMaster(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};


MethodController.getCategoryReportUserWise = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getCategoryReportUserWise(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.searchUserDetailsByPsNo = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.searchUserDetailsByPsNo(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};


MethodController.searchAnalystByPsNo = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.searchAnalystByPsNo(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.searchAllClient = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.searchAllClient(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.searchAllModule = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.searchAllModule(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};


MethodController.searchAllCreateMenu = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.searchAllCreateMenu(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.searchAllTicketCheckList = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.searchAllTicketCheckList(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.searchAllModulePageUrlMapping = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.searchAllModulePageUrlMapping(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.searchAllModulePageUrlMappingStupa = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.searchAllModulePageUrlMappingStupa(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.searchAllRoleMapping = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.searchAllRoleMapping(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.searchAllClientAdminRoleMapping = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.searchAllClientAdminRoleMapping(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.searchAllTicketStatusFlow = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.searchAllTicketStatusFlow(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.searchAllEscalateMaster = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.searchAllEscalateMaster(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.searchAllRoleUserActionMapping = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.searchAllRoleUserActionMapping(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.searchAllSupportGroupHolidays = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.searchAllSupportGroupHolidays(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

// ==============export to excel=======================
MethodController.getAllRoleData = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAllRoleData(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getAllSupportGroupData = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAllSupportGroupData(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getAllBusinessImpact = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAllBusinessImpact(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getAllBusinessUrgency = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAllBusinessUrgency(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getAllPriority = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAllPriority(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getAllMapCategoryWithGroup = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAllMapCategoryWithGroup(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getAllReportFields = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAllReportFields(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getAllViewTicketMenuConfiguration = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAllViewTicketMenuConfiguration(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getAllLevelOfCategories = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAllLevelOfCategories(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getAllCategory = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAllCategory(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getAllMapClientWithCategoryLevel = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAllMapClientWithCategoryLevel(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getAllModuleRoleUserMap = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAllModuleRoleUserMap(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getAllSlaClient = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAllSlaClient(data,function (err,success,details) {
        callback(err,success,details)
        MethodController.process(req,res,function(err,content){
            logger.log('content -'+content);
        });
    })
};
MethodController.getAllBusinessMatrix = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAllBusinessMatrix(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getAllStatus = function(req,res) {
    var data = util.processQueryData(req.queryParams);
    database.getAllStatus(data,function (err,success,details) {
        util.callback(err,success,details);
        MethodController.process(req,res,function(err,content){
            console.log('content -'+content);
        });
    })
};
MethodController.getAllFollowUp = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAllFollowUp(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getAllFileUploadLogs = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAllFileUploadLogs(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getAllTicketCheckList = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAllTicketCheckList(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getAllEscalateMaster = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAllEscalateMaster(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getAllEscalateMaster = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAllEscalateMaster(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getAllTicketStatusFlow = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAllTicketStatusFlow(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};


MethodController.getAllSupportGroup = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAllSupportGroup(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getAllSupportGroupHolidays = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAllSupportGroupHolidays(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getAllModuleRoleMap = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAllModuleRoleMap(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getAllEscalation = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAllEscalation(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getAllMapUserWithSupportGroup = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAllMapUserWithSupportGroup(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};




// =====
MethodController.getAllUserandSupportGroup = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAllUserandSupportGroup(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getAllCategoryandSupportGroup = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAllCategoryandSupportGroup(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getAllModulePageUrl = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAllModulePageUrl(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getAllMenus = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAllMenus(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getAllUrlWithMenus = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAllUrlWithMenus(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.searchAllPlatformUserAuth = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.searchAllPlatformUserAuth(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getAllClientStatus = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAllClientStatus(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.searchAllClientStatus = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.searchAllClientStatus(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getAllClientSpecificUrl = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAllClientSpecificUrl(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.searchAllClientSpecificUrl = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.searchAllClientSpecificUrl(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.searchAllMenuConfiguration = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.searchAllMenuConfiguration(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};


MethodController.searchAllModuleUserRoleMapping = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.searchAllModuleUserRoleMapping(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getAllForwardWorkflow = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAllForwardWorkflow(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getAllBackwardWorkflow = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAllBackwardWorkflow(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getAllModulePageUrlMapping = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAllModulePageUrlMapping(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.searchSupportGroupUserMappingCategoryWise = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.searchSupportGroupUserMappingCategoryWise(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getCountQuery = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getCountQuery(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getSubClientType = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getSubClientType(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getTileCountConfig = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTileCountConfig(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getSupportGroupByClientIdOrMasterClientId = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getSupportGroupByClientIdOrMasterClientId(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getTicketCategoryDetailsDynamic = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTicketCategoryDetailsDynamic(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getIncidentTicketTypeId = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getIncidentTicketTypeId(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getDynamicMenuTicketDtls_new = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getDynamicMenuTicketDtls_new(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getDynamicTotCountMenuTicketDtls_new = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getDynamicTotCountMenuTicketDtls_new(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getAllSupportGroupUserMap = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAllSupportGroupUserMap(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getCategoryReportSupportGroupWise = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getCategoryReportSupportGroupWise(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getUserSupportGroup = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getUserSupportGroup(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

// =====================

MethodController.getAllTicketDetails = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAllTicketDetails(data, function (err, success, details) {
        //console.log("\n\n ----OUTPUT getAllTicketDetails---"+JSON.stringify(details));
        //MethodController.setXml(details);
	callback(err, success, details);        
MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getSlaViolationMaster = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getSlaViolationMaster(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getSupportGroupCount = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getSupportGroupCount(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getBRAIOurl = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getBRAIOurl(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getallBraioMapping = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getallBraioMapping(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getLastLevelCategoryByTicketType = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getLastLevelCategoryByTicketType(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getAllTicketDetailsExtended = function (req, res) {
    var data = util.processQueryData(req.queryParams);
//    database.getAllTicketDetailsExtended(data, function (err, success, details) {
      database.getAllTicketDetailsExtended_withoutSLA(data, function (err, success, details) {  
      callback(err, success, details);
	//MethodController.setXml(details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getUserDetailsByLoginIdDecrypt = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getUserDetailsByLoginIdDecrypt(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};
MethodController.getTicketsStatusWise = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTicketsStatusWise(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getResolutionTime = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getResolutionTime(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getCategoryIc = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getCategoryIc(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};


MethodController.getCategoryLevel = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getCategoryLevel(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getAttributesParentWiseWithPriorityBasedOnSpGrp = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAttributesParentWiseWithPriorityBasedOnSpGrp(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};



MethodController.getAllUsersByLevel = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getAllUsersByLevel(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getApproverEnduserMaster = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getApproverEnduserMaster(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getMappedChildTicketDetails = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getMappedChildTicketDetails(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.checkAllChildInCloseStatus = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.checkAllChildInCloseStatus(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getTktWrkFlowDtl = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTktWrkFlowDtl(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};


MethodController.getTktAdditionalPermission = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getTktAdditionalPermission(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getBHODDetaisl = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getBHODDetaisl(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};




MethodController.getoptimizedreportTicketDetailsReportByids = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getoptimizedreportTicketDetailsReportByids(data, function (err, success, details) {
        callback(err, success, details);
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getUserTicketCount = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getUserTicketCount(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.getNextStatus = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.getNextStatus(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};

MethodController.custome_parent_child_attr_byId = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    database.custome_parent_child_attr_byId(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};


MethodController.getSupportGroupByLevelWise = function (req, res) {
console.log("inside of getSupportGroupByLevelWise +++++++++++++++++++++++++++++++++");
    var data = util.processQueryData(req.queryParams);
    database.getSupportGroupByLevelWise(data, function (err, success, details) {
        callback(err, success, details)
        MethodController.process(req, res, function (err, content) {
            console.log('content -' + content);
        });
    })
};





function callback(err, success, details) {
    // console.log(" details : "+JSON.stringify(details))
    if (err) {
        // console.log(err);
        MethodController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
    } else {
        if (success) {
            MethodController.setJson(JSON.stringify({"success": true, "details": details}));
        } else {
            MethodController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
        }
    }
}





module.exports.getMethodController = function () {
    return MethodController;
};


