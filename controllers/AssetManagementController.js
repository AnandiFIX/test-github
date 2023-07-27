var AssetManagementMasterDB = require('./database/AssetManagementMasterDB');
var AssetManagementColumnDB = require('./database/AssetManagementColumnDB');
var AssetManagementValueDB = require('./database/AssetManagementValueDB');
var AssetDescriptionDB = require('./database/AssetDescription');
var AssetValidationDB =require('./database/AssetValidationDB');
var AssetReportDB = require('./database/AssetReportDB');
var logger = require('inspire').logger;
var controller = require('inspire').abstractController;
// We are using form post functionality here
var postForm = require('inspire').postForm;
var util = require('./util');
var AssetManagementController = function () {
    logger.log("constructed ");
}

//Extends abstract controller
AssetManagementController.__proto__ = controller;

AssetManagementController.getAssetManagementMaster = function (req, res) {
    var data = util.processQueryData(req.queryParams)
    AssetManagementMasterDB.allAssetManagementMaster(data,function (err, success, details) {
        util.callback(err,success,details);
        AssetManagementController.process(req, res, function (err, content) {
            logger.log('content -' + content);
        });
    })
};
//createUsrActionMapping
AssetManagementController.insertAssetManagementMaster = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        AssetManagementMasterDB.insertAssetManagementMaster(fields, function (err, success, details) {
            util.callback(err,success,details);
            AssetManagementController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
};



AssetManagementController.deleteAssetManagementMaster = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        AssetManagementMasterDB.deleteAssetManagementMaster(fields, function (err, success, details) {
            util.callback(err,success,details);
            AssetManagementController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}

AssetManagementController.editAssetManagementMaster = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        AssetManagementMasterDB.editAssetManagementMaster(fields, function (err, success, details) {
            util.callback(err,success,details);
            AssetManagementController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}


AssetManagementController.getAssetManagementColumn = function (req, res) {
    var data = util.processQueryData(req.queryParams)
    AssetManagementColumnDB.allAssetManagementColumn(data,function (err, success, details) {
        util.callback(err,success,details);
        AssetManagementController.process(req, res, function (err, content) {
            logger.log('content -' + content);
        });
    })
};

AssetManagementController.insertAssetManagementColumn = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        AssetManagementColumnDB.insertAssetManagementColumn(fields, function (err, success, details) {
            util.callback(err,success,details);
            AssetManagementController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
};


AssetManagementController.deleteAssetManagementColumn = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        AssetManagementColumnDB.deleteAssetManagementColumn(fields, function (err, success, details) {
            util.callback(err,success,details);
            AssetManagementController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}

AssetManagementController.editAssetManagementColumn = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        AssetManagementColumnDB.editAssetManagementColumn(fields, function (err, success, details) {
            util.callback(err,success,details);
            AssetManagementController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}

AssetManagementController.getAssetManagementValue = function (req, res) {
    var data = util.processQueryData(req.queryParams)
    AssetManagementValueDB.allAssetManagementValue(data,function (err, success, details) {
        util.callback(err,success,details);
        AssetManagementController.process(req, res, function (err, content) {
            logger.log('content -' + content);
        });
    })
};

AssetManagementController.insertAssetManagementValue = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        AssetManagementValueDB.insertAssetManagementValue(fields, function (err, success, details) {
            util.callback(err,success,details);
            AssetManagementController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
};

AssetManagementController.insertAssetManagementAllValue = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        AssetManagementValueDB.insertAssetManagementAllValue(fields, function (err, success, details) {
            util.callback(err,success,details);
            AssetManagementController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
};


AssetManagementController.deleteAssetManagementValue = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        AssetManagementValueDB.deleteAssetManagementValue(fields, function (err, success, details) {
            util.callback(err,success,details);
            AssetManagementController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}

AssetManagementController.editAssetManagementValue = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        AssetManagementValueDB.editAssetManagementValue(fields, function (err, success, details) {
            util.callback(err,success,details);
            AssetManagementController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}
// ============================Asset description=============================
AssetManagementController.getAssetDescription = function (req, res) {
    var data = util.processQueryData(req.queryParams)
    AssetDescriptionDB.allAssetDescription(data,function (err, success, details) {
        util.callback(err,success,details);
        console.log('re=', details);
        AssetManagementController.process(req, res, function (err, content) {
            logger.log('content -' + content);
        });
    })
};

AssetManagementController.insertAssetDescription = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        AssetDescriptionDB.insertAssetDescription(fields, function (err, success, details) {
            util.callback(err,success,details);
            AssetManagementController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
};


AssetManagementController.deleteAssetDescription = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        AssetDescriptionDB.deleteAssetDescription(fields, function (err, success, details) {
            util.callback(err,success,details);
            AssetManagementController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}

AssetManagementController.editAssetDescription = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        AssetDescriptionDB.editAssetDescription(fields, function (err, success, details) {
            util.callback(err,success,details);
            AssetManagementController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}

AssetManagementController.getAssetColumnByMaster = function (req, res) {
    var data = util.processQueryData(req.queryParams)
    AssetManagementValueDB.getAssetColumnByMaster(data, function (err, success, details) {
        util.callback(err,success,details);
        AssetManagementController.process(req, res, function (err, content) {
            logger.log('content -' + content);
        });
    })
};


AssetManagementController.getAssetDetailsByMaster = function (req, res) {
    var data = util.processQueryData(req.queryParams)
    AssetManagementValueDB.getAssetDetailsByMaster(data, function (err, success, details) {
        util.callback(err,success,details);
        console.log('re=', details);
        AssetManagementController.process(req, res, function (err, content) {
            logger.log('content -' + content);
        });
    })
};
//Added By Subhasis
AssetManagementController.getNewAssetDetailsByMaster = function (req, res) {
    var data = util.processQueryData(req.queryParams)
    AssetManagementValueDB.getNewAssetDetailsByMaster(data, function (err, success, details) {
        util.callback(err,success,details);
        console.log('re=', details);
        AssetManagementController.process(req, res, function (err, content) {
            logger.log('content -' + content);
        });
    })
};

AssetManagementController.getAssetMasterByTicket = function (req, res) {
    var data = util.processQueryData(req.queryParams)
    AssetManagementValueDB.getAssetMasterByTicket(data, function (err, success, details) {
        util.callback(err,success,details);
        AssetManagementController.process(req, res, function (err, content) {
            logger.log('content -' + content);
        });
    })
};

//Added By Subhasis
AssetManagementController.getAssetManagementDataTable = function (req, res) {
    var data = util.processQueryData(req.queryParams)
    AssetManagementValueDB.getAssetManagementDataTable(data, function (err, success, details) {
        util.callback(err,success,details);
        AssetManagementController.process(req, res, function (err, content) {
            logger.log('content -' + content);
        });
    })
};


AssetManagementController.getAssetManagementData = function (req, res) {
    var data = util.processQueryData(req.queryParams)
    AssetManagementValueDB.getAssetManagementData(data, function (err, success, details) {
        util.callback(err,success,details);
        AssetManagementController.process(req, res, function (err, content) {
            logger.log('content -' + content);
        });
    })
};

AssetManagementController.searchAssetManagementData = function (req, res) {
    var data = util.processQueryData(req.queryParams)
    AssetManagementValueDB.searchAssetManagementData(data, function (err, success, details) {
        util.callback(err,success,details);
        AssetManagementController.process(req, res, function (err, content) {
            logger.log('content -' + content);
        });
    })
};

AssetManagementController.getTicketWiseAssetData = function (req, res) {
    var data = util.processQueryData(req.queryParams)
    AssetManagementValueDB.getTicketWiseAssetData(data, function (err, success, details) {
        util.callback(err,success,details);
        AssetManagementController.process(req, res, function (err, content) {
            logger.log('content -' + content);
        });
    })
};
AssetManagementController.deleteTicketAssetData = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        AssetManagementValueDB.deleteTicketAssetData(fields, function (err, success, details) {
            util.callback(err,success,details);
            AssetManagementController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
};
AssetManagementController.editAssetValue = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        AssetManagementValueDB.editAssetValue(fields, function (err, success, details) {
            util.callback(err,success,details);
            AssetManagementController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}
AssetManagementController.maintainAssetManagementData = function (req, res) {
    var data = util.processQueryData(req.queryParams)
    AssetManagementValueDB.maintainAssetManagementData(data, function (err, success, details) {
        util.callback(err,success,details);
        console.log('re=', details);
        AssetManagementController.process(req, res, function (err, content) {
            logger.log('content -' + content);
        });
    })
};
AssetManagementController.getSomeAssetManagementMaster = function (req, res) {
    var data = util.processQueryData(req.queryParams)
    AssetManagementMasterDB.getSomeAssetManagementMaster(data,function (err, success, details) {
        util.callback(err,success,details);
        AssetManagementController.process(req, res, function (err, content) {
            logger.log('content -' + content);
        });
    })
};
AssetManagementController.getAssetReportDataTable = function (req, res) {
    var data = util.processQueryData(req.queryParams)
    AssetReportDB.getAssetReportDataTable(data, function (err, success, details) {
        util.callback(err,success,details);
        console.log('re=', details);
        AssetManagementController.process(req, res, function (err, content) {
            logger.log('content -' + content);
        });
    })
};

// Asset Validation
AssetManagementController.insertaddAssetValidation = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        AssetValidationDB.insertaddAssetValidation(fields, function (err, success, details) {
            util.callback(err,success,details);
            AssetManagementController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
};

AssetManagementController.allAssetValidation = function (req, res) {
    var data = util.processQueryData(req.queryParams)
    AssetValidationDB.allAssetValidation(data, function (err, success, details) {
        util.callback(err,success,details);
        console.log('re=', details);
        AssetManagementController.process(req, res, function (err, content) {
            logger.log('content -' + content);
        });
    })
};

AssetManagementController.editAssetValidation = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        AssetValidationDB.editAssetValidation(fields, function (err, success, details) {
            util.callback(err,success,details);
            AssetManagementController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
}

AssetManagementController.deleteAssetValidation = function (req, res) {
    var pf = new postForm(req, res, __dirname + '/../upload');
    pf.on('post', function (req, res, fields, files) {
        AssetValidationDB.deleteAssetValidation(fields, function (err, success, details) {
            util.callback(err,success,details);
            AssetManagementController.process(req, res, function (err, content) {
                logger.log('content -' + content);
            });
        })
    });
};
AssetManagementController.getAssetColumnByMasterForValue = function (req, res) {
    var data = util.processQueryData(req.queryParams)
    AssetManagementValueDB.getAssetColumnByMasterForValue(data, function (err, success, details) {
        util.callback(err,success,details);
        AssetManagementController.process(req, res, function (err, content) {
            logger.log('content -' + content);
        });
    })
};
AssetManagementController.getAssetByTicket = function (req, res) {
    var data = util.processQueryData(req.queryParams)
    AssetManagementValueDB.getAssetByTicket(data,function (err, success, details) {
        util.callback(err,success,details);
        AssetManagementController.process(req, res, function (err, content) {
            logger.log('content -' + content);
        });
    })
};
module.exports.getAssetManagementController = function () {
    return AssetManagementController;
};
