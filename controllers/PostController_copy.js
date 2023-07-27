/**
 * Example Controller to get Static File
 * A controller which can be used to get Static File as response
 */
var database = require('./database/DataAccess');
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
var PostController = function () {
    logger.log("constructed ");
};

const s3 = new AWS.S3({
    accessKeyId: global.gConfig.ACCESS_KEY_ID,
    secretAccessKey: global.gConfig.SECRET_ACCESS_KEY,
    region:'ap-south-1'
});

//Extends abstract controller
PostController.__proto__ = controller;

PostController.insertClient = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        console.log(JSON.stringify(fields));
        database.insertClientDB(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, "clientId": details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}

// PostController.insertUrlKey = function (req, res) {
//     var pf = new postForm(req, res, __dirname + '/../upload');
//     pf.on('post', function (req, res, fields, files) {
//         database.insertUrlKeyDB(fields, function (err, success, details) {
//             if (err) {
//                 PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
//             } else {
//                 if (success) {
//                     PostController.setJson(JSON.stringify({"success": true, "urlId": details}));
//                 } else {
//                     PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
//                 }
//             }
//             PostController.process(req, res, function (err, content) {
//                 logger.log('content -' + content);
//             });
//         })
//     });
// }
//
// PostController.insertModule = function (req, res) {
//     var pf = new postForm(req, res, __dirname + '/../upload');
//     pf.on('post', function (req, res, fields, files) {
//         database.insertModuleDB(fields, function (err, success, details) {
//             if (err) {
//                 PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
//             }
//             else {
//                 if (success) {
//                     PostController.setJson(JSON.stringify({"success": true, "moduleId": details}));
//                 } else {
//                     PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
//                 }
//             }
//             PostController.process(req, res, function (err, content) {
//                 logger.log('content -' + content);
//             });
//         })
//     });
// }

PostController.insertUserRole = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertUserRoleDB(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));

            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, "roleId": details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}

PostController.insertClientUserRole = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertClientUserRoleDB(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, "id": details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }

            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}

PostController.insertUser = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertUserDB(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));

            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, "userId": details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }

            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}

PostController.insertRoleUser = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertRoleUserDB(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"Message": "Error"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"Message": details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}

PostController.insertModuleClient = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertModuleClientDB(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, "id": details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}

PostController.insertModuleUrlMap = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertModuleUrlMapDB(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"Message": "Error"}));

            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"Message": details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}

PostController.insertModuleClientUserRoleMap = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertModuleClientUserRoleMapDB(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"Message": "Error"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"Message": details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}

PostController.insertModuleClientUserMap = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertModuleClientUserMapDB(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"Message": "Error"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"Message": details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}

PostController.insertVendor = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertVendorDB(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"Message": "Error"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"Message": details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}

PostController.getUrl = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.allUrlDB(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"Message": "Error"}));

            } else {
                if (success) {
                    PostController.setJson(JSON.stringify(details));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
};
PostController.login = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.login(fields, function (err, success, content) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    console.log(global.gConfig.JWT_EXPIRY_TIME, typeof global.gConfig.JWT_EXPIRY_TIME);
                    const token = jwt.sign({id: content.id}, global.gConfig.JWT_SECRET_TOKEN, {expiresIn: global.gConfig.JWT_EXPIRY_TIME});
                    content.token = token;
                    PostController.setJson(JSON.stringify({"success": true, "details": content}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": content}));
                }

            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}
PostController.insertUserRoleMapping = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertUserRoleMapping(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));

            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, "id": details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }

            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
};
PostController.mapModuleRole = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.mapModuleRole(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, "details": details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }

            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
};
PostController.createUsrActionMapping = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.createUsrActionMapping(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, "id": details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}
PostController.setAdminUserAuth = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        console.log(JSON.stringify(fields));
        database.setAdminUserAuth(fields.data, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true,}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
};
// PostController.deletePlatformModule = function (req, res) {
//     var pf = new postForm(req, res, __dirname + '/../upload');
//     pf.on('post', function (req, res, fields, files) {
//         database.deletePlatformModule(fields, function (err, success, details) {
//             if (err) {
//                 PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
//             }
//             else {
//                 if (success) {
//                     PostController.setJson(JSON.stringify({"success": true, "id": details}));
//                 } else {
//                     PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
//                 }
//             }
//             PostController.process(req, res, function (err, content) {
//                 logger.log('content -' + content);
//             });
//         })
//     });
// }
PostController.deleteUserRoleDB = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteUserRoleDB(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, "id": details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}
PostController.deleteUrl = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteUrl(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, "id": details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}
PostController.deleteUserFrmAdmin = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteUserFrmAdmin(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, "id": details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}
PostController.deleteClient = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteClient(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, "id": details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}
PostController.deleteMapModuleWithClient = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteMapModuleWithClient(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, "id": details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}
PostController.deleteClientUserRole = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteClientUserRole(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, "id": details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}

PostController.deleteUrlUserWise = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteUrlUserWise(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, "id": details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}
PostController.deleteUsrActionMapping = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteUsrActionMapping(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, "id": details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}
PostController.deleteClientUserRoleMapping = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteClientUserRoleMapping(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, "id": details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}
PostController.deleteMapModuleRole = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteMapModuleRole(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, "id": details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}
/*******************************------------------------Update--------------------------******************************/
// PostController.editModuleMst = function (req, res) {
//     var pf = new postForm(req, res, __dirname + '/../upload');
//     pf.on('post', function (req, res, fields, files) {
//         database.editModuleMst(fields, function (err, success, details) {
//             if (err) {
//                 PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
//             }
//             else {
//                 if (success) {
//                     PostController.setJson(JSON.stringify({"success": true,}));
//                 } else {
//                     PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
//                 }
//             }
//             PostController.process(req, res, function (err, content) {
//                 logger.log('content -' + content);
//             });
//         })
//     });
// }
PostController.editRoleMst = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.editRoleMst(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true,}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}
PostController.editUrlMst = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.editUrlMst(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true,}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}
PostController.editUserMst = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.editUserMst(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true,}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}
PostController.mapModuleUserClient = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.mapModuleUserClient(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, id: details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}
PostController.deleteModuleUserClient = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteModuleUserClient(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}
PostController.deleteAdminUserAuth = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteAdminUserAuth(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}
PostController.insertVendorMst = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertVendorMst(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));

            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, "vendorId": details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}
PostController.deleteVendorMst = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteVendorMst(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));

            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
};
PostController.updateVendorMst = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.updateVendorMst(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));

            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
};
PostController.insertClientVendorUserMapping = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertClientVendorUserMapping(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, "id": details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
};
PostController.deleteClientVendorUserMapping = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteClientVendorUserMapping(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));

            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, "vendorId": details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
};
PostController.insertSupportGrpLevel = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertSupportGrpLevel(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));

            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, "id": details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }

            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}
PostController.insertSupportGroupVendorMapping = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertSupportGroupVendorMapping(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, "id": details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}
PostController.insertSupportGroupSPOC = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertSupportGroupSPOC(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, "id": details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}
PostController.insertSupportGroupUserMapping = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertSupportGroupUserMapping(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, "id": details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}
PostController.deleteSupportGrpLevel = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteSupportGrpLevel(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, "suppGrpLev": details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}
PostController.deleteSupportGroupVendorMapping = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteSupportGroupVendorMapping(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, "suppGrpVendor": details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}
PostController.deleteSupportGroupSPOC = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteSupportGroupSPOC(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, "suppGrpSpoc": details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}

PostController.deleteSupportGroupUserMapping = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteSupportGroupUserMapping(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, "suppGrpVendor": details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}
PostController.mapRoleUserAction = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.mapRoleUserAction(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
};
PostController.insertTicketProperty = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertTicketProperty(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, id: details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}
PostController.deleteRoleUserAction = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteRoleUserAction(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, id: details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}
PostController.insertMenuDtlsClientWise = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertMenuDtlsClientWise(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));

            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, "id": details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
};
PostController.updateMenuDtlsWithUrlClientWise = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.updateMenuDtlsWithUrlClientWise(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, "id": details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}
PostController.insertAttributesHeaderMstClientWise = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertAttributesHeaderMstClientWise(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, id: details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}
PostController.deleteAttributesHeaderMstClientWise = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteAttributesHeaderMstClientWise(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}

PostController.updateAttributesHeaderMstClientWise = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.updateAttributesHeaderMstClientWise(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}
// PostController.insertTicketAttributesClientWise = function (req, res) {
//     var pf = new postForm(req, res, __dirname + '/../upload');
//     pf.on('post', function (req, res, fields, files) {
//         database.insertTicketAttributesClientWise(fields, function (err, success, details) {
//             if (err) {
//                 PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
//             }
//             else {
//                 if (success) {
//                     PostController.setJson(JSON.stringify({"success": true, id: details}));
//                 } else {
//                     PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
//                 }
//             }
//             PostController.process(req, res, function (err, content) {
//                 logger.log('content -' + content);
//             });
//         });
//     });
// }
PostController.deleteTicketAttributesClientWise = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteTicketAttributesClientWise(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, id: details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
}
PostController.insertBusinessImpact = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertBusinessImpact(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, id: details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
}
PostController.insertBusinessPriority = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertBusinessPriority(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, id: details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
}
PostController.insertBusinessUrgency = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertBusinessUrgency(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, id: details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
}
PostController.deleteBusinessImpact = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteBusinessImpact(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, id: details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
}
PostController.deleteBusinessPriority = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteBusinessPriority(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, id: details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
}
PostController.deleteBusinessUrgency = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteBusinessUrgency(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, id: details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
}
PostController.updateBusinessImpact = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.updateBusinessImpact(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, id: details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
}
PostController.updateBusinessPriority = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.updateBusinessPriority(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, id: details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
}
PostController.updateBusinessUrgency = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.updateBusinessUrgency(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, id: details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
}
PostController.insertMappingWithTicketAttrSuppGrp = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertMappingWithTicketAttrSuppGrp(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, id: details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
}
PostController.deleteMappingWithTicketAttrSuppGrp = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteMappingWithTicketAttrSuppGrp(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, id: details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
}
PostController.insertSLADetails = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertSLADetails(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, id: details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
}
PostController.deleteSLADetails = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteSLADetails(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, id: details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
}
PostController.updateSLADetails = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.updateSLADetails(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, id: details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
}
PostController.deleteBusinessMatrix = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteBusinessMatrix(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, id: details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
}

PostController.insertBusinessMatrix = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertBusinessMatrix(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, id: details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
}
PostController.updateSupportGrpLevel = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.updateSupportGrpLevel(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, id: details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
}
PostController.mapTableAction = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.mapTableAction(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
}

PostController.deleteTableAction = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteTableAction(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
}
PostController.mapTableFieldAction = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.mapTableFieldAction(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
PostController.deleteTableFieldAction = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteTableFieldAction(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
}
PostController.mapTableUrl = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.mapTableUrl(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, id: details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
}
PostController.deleteTableUrl = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteTableUrl(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, id: details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
}
PostController.mapTableUserAction = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.mapTableUserAction(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, id: details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
PostController.deleteTableUserAction = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteTableUserAction(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, id: details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
PostController.mapTableFieldUserAction = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.mapTableFieldUserAction(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, id: details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
PostController.deleteTableFieldUserAction = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteTableFieldUserAction(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, id: details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
PostController.insertWorkFlow = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertWorkFlow(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, id: details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
}
PostController.updateWorkFlow = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.updateWorkFlow(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, id: details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
}
PostController.deleteWorkFlow = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteWorkFlow(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, id: details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
}
PostController.insertWorkFlowComponent = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertWorkFlowComponent(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, id: details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
}
PostController.deleteWorkFlowComponent = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteWorkFlowComponent(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, id: details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
}
PostController.insertWorkFlowComponentDetails = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertWorkFlowComponentDetails(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, id: details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
}
PostController.deleteWorkFlowComponentDetails = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteWorkFlowComponentDetails(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, id: details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
}
PostController.insertWFCClient = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertWFCClient(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, id: details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
}
PostController.deleteWFCClient = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteWFCClient(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, id: details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
PostController.createTicket = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        console.log('fields--' + JSON.stringify(fields))
        database.createTicket(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, id: details.id, ticketId: details.ticket_id}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
PostController.updateTicketCategory = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        // console.log('fields--'+JSON.stringify(fields))
        database.updateTicketCategory(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, id: details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
PostController.updateForwardedTicket = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        // console.log('fields--'+JSON.stringify(fields))
        database.updateForwardedTicket(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, id: details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
PostController.submitFeedbackTicketWise = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.submitFeedbackTicketWise(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, id: details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
PostController.updateTicketStatus = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.updateTicketStatus(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true, id: details}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
PostController.updateTicketStatusWithClose = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.updateTicketStatusWithClose(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
PostController.submitSolutionsTicketWise = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.submitSolutionsTicketWise(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
PostController.updateFile = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        // console.log(files);
        console.log(fields);
        if (!fields.error) {
            con.query('select upload_path from CLIENT where id=?', [fields.clientId], function (err, details) {
                if (err) {
                    PostController.setJson(JSON.stringify({
                        "success": false,
                        "errorMessage": "Something Went Wrong"
                    }));
                    PostController.process(req, res, function (err, content) {
                        logger.log('content -' + content);
                    });
                } else {
                    if (details.length > 0 && details[0].upload_path !== null) {
                        const code = details[0].upload_path;
                        // console.log(JSON.stringify(files))
                        var pos = files.file.path.lastIndexOf('/');
                        var folder_path = files.file.path.substring(0, pos + 1);
                        let key;
                        if (fields.type === 'asset') {
                            key = code + '/asset/' + files.newname
                        } else {
                            key = code + '/ticket/' + files.newname
                        }
                        const params = {
                            Bucket: bucketName,
                            Key: key,
                            ACL: 'public-read',
                            Body: fs.readFileSync(folder_path + files.newname)
                        };
                        // console.log(key);
                        s3.putObject(params, function (err, data) {
                            if (err) {
                                console.log("Error: ", err);
                            } else {
                                // console.log('----------------------------')
                                fs.unlink(folder_path + files.newname, (err) => {
                                    if (err) logger.logInfo(err);
                                });
                                console.log(data);
                                if (fields.type === 'asset') {
                                    fields.fileName = files.newname;
                                    console.log(fields);
                                }
                                PostController.setJson(JSON.stringify({
                                    "success": true,
                                    fileName: files.file.name,
                                    changedName: files.newname
                                }));
                                PostController.process(req, res, function (err, content) {
                                    logger.log('content -' + content);
                                });
                            }
                        });
                        if (fields.docuId) {
                            fields.attachmentPath = [{originalName: files.file.name, fileName: files.newname}];
                            docu.addAttachment(fields, function (err, success, details) {
                                if (err) {
                                    logger.log(err);
                                    // PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
                                } else {
                                    if (success) {
                                        console.log({
                                            "success": true,
                                            fileName: files.file.name,
                                            changedName: files.newname
                                        })
                                        // PostController.setJson(JSON.stringify({"success": true,fileName:files.file.name}));
                                    } else {
                                        console.log({"success": false, "errorMessage": details})
                                        // PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                                    }
                                }
                            });
                        }
                    } else {
                        PostController.setJson(JSON.stringify({
                            "success": false,
                            "errorMessage": "Your Client is not configured for file upload path. Please contact with iFix support team."
                        }));
                        PostController.process(req, res, function (err, content) {
                            logger.log('content -' + content);
                        });
                    }
                }
            })
        } else {
            PostController.setJson(JSON.stringify({"success": false, "errorMessage": fields.message}));
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        }
    });
};
PostController.updateTicket = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.updateTicket(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};

PostController.submitAttachmentTicketWise = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.submitAttachmentTicketWise(fields, function (err, success, details) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    PostController.setJson(JSON.stringify({"success": true}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                }
            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
PostController.insertAdditionalFuncTicketTypeUserWise = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertAdditionalFuncTicketTypeUserWise(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
PostController.insertWFCClientBackWard = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertWFCClientBackWard(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
PostController.deleteTicketExtandMstTbl = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteTicketExtandMstTbl(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};

PostController.insertTicketExtandMstTbl = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertTicketExtandMstTbl(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
PostController.deleteDynamicTabActionTicketTypeWise = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteDynamicTabActionTicketTypeWise(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
PostController.getRoleUserActionMapping = function (req, res) {
    console.log('--------------------getRoleUserActionMapping--------------------')
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        console.log('----inside-getRoleUserActionMapping----' + JSON.stringify(fields));
        database.getRoleUserActionMapping(fields, function (err, success, details) {

            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
PostController.mapNewUrlToModule = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.mapNewUrlToModule(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
PostController.getUrlSequence = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.getUrlSequence(fields, function (err, success, details) {
            console.log("--------->" + JSON.stringify(details))
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
PostController.updateMenuDtls = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.updateMenuDtls(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
PostController.updateAdditionalFieldTicketWise = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.updateAdditionalFieldTicketWise(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
PostController.insertCSatFormDtls = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertCSatFormDtls(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
PostController.updateCSatFormDtls = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.updateCSatFormDtls(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
PostController.deleteCSatFormDtls = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteCSatFormDtls(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
PostController.insertTicketEscalationDtlsSupportGrpWise = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertTicketEscalationDtlsSupportGrpWise(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
PostController.insertTicketIdConfigure = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertTicketIdConfigure(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
PostController.insertTicketPriorityConfiguration = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertTicketPriorityConfiguration(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
PostController.updateTicketPriorityConfiguration = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.updateTicketPriorityConfiguration(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
PostController.deleteTicketPriorityConfiguration = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteTicketPriorityConfiguration(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
PostController.updateReOpenTicket = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.updateReOpenTicket(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
PostController.insertSlaRecalculationMstForm = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertSlaRecalculationMstForm(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};

PostController.mapRoleAction = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.mapRoleAction(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
};
PostController.insertAssetIds = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertAssetIds(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
};
PostController.deleteBackwardWorkFlow = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteBackwardWorkFlow(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
PostController.escalationByCreatorAfterResolve = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.escalationByCreatorAfterResolve(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
PostController.approveProblemTicket = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.approveProblemTicket(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
PostController.changeTicketStatus = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.changeTicketStatus(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};

PostController.deleteNewIncidentInProblem = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteNewIncidentInProblem(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
PostController.forwardProblemTicketAfterChangesToApprover = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.forwardProblemTicketAfterChangesToApprover(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
PostController.addNewIncidentInProblem = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.addNewIncidentInProblem(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
PostController.insertApiTime = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertApiTime(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};

PostController.loginlt = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.loginlt(fields, function (err, success, content) {
            if (err) {
                PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
            } else {
                if (success) {
                    // console.log(global.gConfig.JWT_EXPIRY_TIME, typeof global.gConfig.JWT_EXPIRY_TIME);
                    // const token = jwt.sign({id: content.id}, global.gConfig.JWT_SECRET_TOKEN, {expiresIn: global.gConfig.JWT_EXPIRY_TIME});
                    // content.token = token;
                    PostController.setJson(JSON.stringify({"success": true, "details": content}));
                } else {
                    PostController.setJson(JSON.stringify({"success": false, "errorMessage": content}));
                }

            }
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
};
PostController.tokenValidation = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.tokenValidation(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
PostController.insertWFCGeneratedFor = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertWFCGeneratedFor(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
PostController.insertLNTEmployeeDtls = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertLNTEmployeeDtls(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
PostController.submitUserReplyFotTicketIfo = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.submitUserReplyFotTicketIfo(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};
PostController.insertUserSession = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertUserSession(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};
// ==================================
PostController.insertMailTemplateLt = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertMailTemplateLt(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};

PostController.deleteMailTemplateLt = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteMailTemplateLt(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};

PostController.addFollowupLt = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.addFollowupLt(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};

PostController.deleteFollowUpLt = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteFollowUpLt(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};

PostController.updateFollowupLt = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.updateFollowupLt(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        });
    });
};
PostController.insertEscalation = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertEscalation(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};

PostController.deleteEscalation = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteEscalation(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};
PostController.deleteEscalationSupportGroup = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteEscalationSupportGroup(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};

PostController.updateEscalationSupportGroup = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.updateEscalationSupportGroup(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};
PostController.insertEscalationSupportGroup = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertEscalationSupportGroup(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};
PostController.updateOfflineNotificationData = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.updateOfflineNotificationData(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};
PostController.AdvancesearchTicket = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.AdvancesearchTicket(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};

PostController.searchTicketById = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.searchTicketById(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};
PostController.addClientSpecificUrl = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.addClientSpecificUrl(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};

PostController.deleteClientSpecificUrl = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteClientSpecificUrl(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};
PostController.AdvancesearchForIncidentTicket = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.AdvancesearchForIncidentTicket(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};
PostController.mapClientWiseFunctionality = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.mapClientWiseFunctionality(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};
PostController.deleteFunctionalityDetails = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteFunctionalityDetails(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};
PostController.testQuery = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.testQuery(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};
PostController.insertChildTicket = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertChildTicket(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};
PostController.AdvancesearchTicketForCit = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.AdvancesearchTicketForCit(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};
PostController.searchTicketByIdForCit = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.searchTicketByIdForCit(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};
PostController.deleteChildTicket = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteChildTicket(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        })
    });
};
PostController.updateAdditionalFieldValue = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.updateAdditionalFieldValue(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        })
    });
};
PostController.insertDashboard = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertDashboardDB(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};
PostController.insertTicketAutoClosureTime = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertTicketAutoClosureTime(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};
PostController.updateTicketAutoClosureTime = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.updateTicketAutoClosureTime(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};
PostController.deleteTicketFunc = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteTicketFunc(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};
PostController.updateTicketFunc = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.updateTicketFunc(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};
PostController.insertTicketFunc = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertTicketFunc(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};

PostController.updateTicketNotificationMst = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.updateTicketNotificationMst(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};

// ===========================
PostController.insertTicketActivityNoficationMst = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertTicketActivityNoficationMst(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};
PostController.deleteTicketActivityNoficationMst = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteTicketActivityNoficationMst(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};

PostController.updateTicketMenuConfig = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.updateTicketMenuConfig(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};

PostController.PasswordChange = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.PasswordChange(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};

PostController.updateTicketMenu = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.updateTicketMenu(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};

PostController.insertEscalationWorkflow = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertEscalationWorkflow(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};

PostController.deleteEscalationWorkflow = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteEscalationWorkflow(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};

PostController.generateTempSscReport = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.generateTempSscReport(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};

PostController.generateSscReport = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.generateSscReport(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};
PostController.mapPsnoWithGroup = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.mapPsnoWithGroup(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};

PostController.addStatusSeq = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.addStatusSeq(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};

PostController.deleteStatusSeq = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteStatusSeq(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};

PostController.insertMappingCategoryWithSupportGrp = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertMappingCategoryWithSupportGrp(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};

PostController.insertSupportGroupWiseWorkingHour = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertSupportGroupWiseWorkingHour(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};

PostController.calculateSupportGroupWorkingHour = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.calculateSupportGroupWorkingHour(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};

PostController.insertSlaCalculation = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertSlaCalculation(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};


PostController.deleteSlaCalculation = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteSlaCalculation(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};

PostController.uploadFaq = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        console.log(JSON.stringify(files));
        // console.log(fields);
        if (!fields.error) {
            con.query('select upload_path from faq_upload_path where client_id=?', [fields.clientId], function (err, details) {
                if (err) {
                    PostController.setJson(JSON.stringify({
                        "success": false,
                        "errorMessage": "Something Went Wrong"
                    }));
                    PostController.process(req, res, function (err, content) {
                        logger.log('content -' + content);
                    });
                } else {
                    if (details.length > 0 && details[0].upload_path !== null) {
                        const code = details[0].upload_path;
                        console.log('folder path====' + JSON.stringify(files));
                        console.log('code====' + JSON.stringify(code));
                        var pos = files.file.path.lastIndexOf('/');
                        var folder_path = files.file.path.substring(0, pos + 1);
                        let key;
                        // if (fields.type === 'asset') {
                        //     key = code + '/asset/' + files.newname
                        // } else {
                        //     key = code + '/ticket/' + files.newname
                        // }
                        key = code + '/' + files.newname;
                        const params = {
                            Bucket: bucketName,
                            Key: key,
                            ACL: 'public-read',
                            Body: fs.readFileSync(folder_path + files.newname)
                        };
                        console.log('key====' + key);
                        s3.putObject(params, function (err, data) {
                            if (err) {
                                console.log("Error: ", err);
                            } else {
                                // console.log('----------------------------')
                                fs.unlink(folder_path + files.newname, (err) => {
                                    if (err) logger.logInfo(err);
                                });
                                console.log('data=====' + JSON.stringify(data));
                                // if (fields.type === 'asset') {
                                //     fields.fileName = files.newname;
                                //     console.log(fields);
                                // }
                                PostController.setJson(JSON.stringify({
                                    "success": true,
                                    fileName: files.file.name,
                                    changedName: files.newname,
                                    uploadPath: code
                                }));
                                PostController.process(req, res, function (err, content) {
                                    logger.log('content -' + content);
                                });
                            }
                        });
                        if (fields.docuId) {
                            fields.attachmentPath = [{originalName: files.file.name, fileName: files.newname}];
                            docu.addAttachment(fields, function (err, success, details) {
                                if (err) {
                                    logger.log(err);
                                    // PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
                                } else {
                                    if (success) {
                                        console.log({
                                            "success": true,
                                            fileName: files.file.name,
                                            changedName: files.newname,
                                            uploadPath: code
                                        })
                                        // PostController.setJson(JSON.stringify({"success": true,fileName:files.file.name}));
                                    } else {
                                        console.log({"success": false, "errorMessage": details})
                                        // PostController.setJson(JSON.stringify({"success": false, "errorMessage": details}));
                                    }
                                }
                            });
                        }
                    } else {
                        PostController.setJson(JSON.stringify({
                            "success": false,
                            "errorMessage": "Your Client is not configured for file upload path. Please contact with iFix support team."
                        }));
                        PostController.process(req, res, function (err, content) {
                            logger.log('content -' + content);
                        });
                    }
                }
            })
        } else {
            PostController.setJson(JSON.stringify({"success": false, "errorMessage": fields.message}));
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        }
    });
};



PostController.addSupportGroupSpecificUrl = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.addSupportGroupSpecificUrl(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};

PostController.addNotification = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.addNotification(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};

PostController.deleteNotification = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteNotification(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};

PostController.searchTicketByIdForChr = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.searchTicketByIdForChr(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};

PostController.updateClient = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.updateClient(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};

PostController.updateFlowStatus = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.updateFlowStatus(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};
PostController.deleteSupportGroupSpecificUrl = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteSupportGroupSpecificUrl(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};
PostController.AdvancesearchIncidentTicket = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.AdvancesearchIncidentTicket(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};

// ========================
PostController.insertEmailConfig = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertEmailConfig(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};
PostController.insertSedularConfig = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertSedularConfig(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};
PostController.deleteSedularConfig = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteSedularConfig(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};

PostController.updateSlaViolationMaster = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.updateSlaViolationMaster(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};
PostController.downloadFile = function (req, res) {
    var data = util.processQueryData(req.queryParams);
    con.query('select upload_path from CLIENT where id=?', [data.clientId], function (err, details) {
        if (err) {
            PostController.setJson(JSON.stringify({
                "success": false,
                "errorMessage": "Something Went Wrong"
            }));
            PostController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        } else {
            if (details.length > 0 && details[0].upload_path !== null) {
                const code = details[0].upload_path;
                // console.log(JSON.stringify(files))
                let key;
                if (data.type === 'asset') {
                    key = code + '/asset/' + data.newname
                }else if (data.type === 'report') {
                    key = code + '/report/' + data.newname
                } else {
                    key = code + '/ticket/' + data.newname
                }
                const options = {
                    Bucket: bucketName,
                    Key: key,
                };
                s3.getSignedUrl('getObject', options, (err, data) => {
                    if (err) {
                        console.log(err);
                        return res.end();
                    }

                    PostController.setJson(JSON.stringify({"success": true,value:data}));
                    PostController.process(req, res, function (err, content) {
                        logger.log('content -' + content);
                    });
                });

            } else {
                PostController.setJson(JSON.stringify({
                    "success": false,
                    "errorMessage": "Your Client is not configured for file upload path. Please contact with iFix support team."
                }));
                PostController.process(req, res, function (err, content) {
                    logger.log('content -' + content);
                });
            }
        }
    })
};
PostController.deleteBraioMapping = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteBraioMapping(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};
PostController.insertBraioMapping = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertBraioMapping(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};
PostController.updateBraioMapping = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.updateBraioMapping(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};
PostController.deleteDashboardCat = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteDashboardCat(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};
PostController.insertDashboardCat = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertDashboardCat(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};
PostController.deleteAllDashboardCat = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteAllDashboardCat(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};
PostController.changeUserPassword = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.changeUserPassword(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};
PostController.searchCitDataForExport = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.searchCitDataForExport(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};

PostController.searchSscDataForExport = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.searchSscDataForExport(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};

PostController.AdvancesearchTicketForChr = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.AdvancesearchTicketForChr(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};

PostController.searchAllChrDataForExport = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.searchAllChrDataForExport(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};


PostController.updateMailTemplateLt = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.updateMailTemplateLt(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};



PostController.addApproverEnduserMaster = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.addApproverEnduserMaster(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};

PostController.deleteApproverEnduserMaster = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.deleteApproverEnduserMaster(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};

PostController.insertTktAdditionalPermission = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.insertTktAdditionalPermission(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};

PostController.updateTktAdditionalPermission = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.updateTktAdditionalPermission(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};

PostController.updateIncdntTcktStusForProbWthClose = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.updateIncdntTcktStusForProbWthClose(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};


PostController.changeIncidentTicketStatusForProblem = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        database.changeIncidentTicketStatusForProblem(fields, function (err, success, details) {
            callback(err, success, details);
            PostController.process(req, res, function (err, content) {
                //logger.log('content -' + content);
            });
        });
    });
};


function callback(err, success, details) {
    if (err) {
        console.log(err);
        PostController.setJson(JSON.stringify({"success": false, "errorMessage": "Something went wrong"}));
    } else {
        if (success) {
            PostController.setJson(JSON.stringify({"success": true, "details": details}));
        } else {
            PostController.setJson(JSON.stringify({"Gsuccess": false, "errorMessage": details}));
        }
    }
}

module.exports.getPostController = function () {
    return PostController;
};
