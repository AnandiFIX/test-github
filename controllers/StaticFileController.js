/**
 * Example Controller to get Static File
 * A controller which can be used to get Static File as response
 */

var logger = require('inspire').logger;
var controller = require('inspire').abstractController;

var selfController = function () {
	logger.log("selfController constructed");
}

//Extends abstract controller
selfController.__proto__ = controller;

selfController.processRequest = function(req,res) {
	// process specific business logic
	// set the processed string to controller setJson method
	// place to use any service callback
	console.log("inside static");
    selfController.process(req,res,function(err,content){
		logger.log('content -'+content);
	});
}


module.exports.getStaticFileController = function() {
	return selfController;
};


