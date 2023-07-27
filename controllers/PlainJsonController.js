/**
 * Example Controller to get Json
 * A controller which can be used to get Json as response
 */

var logger = require('inspire').logger;
var controller = require('inspire').abstractController;

var selfController = function () {
	logger.log("selfController constructed");
}

//Extends abstract controller
selfController.__proto__ = controller;

selfController.processRequest = function(req,res) {
	//session in already embedded
	//an example of - how we can use session in this framework
        req.session.user = "me";
	// process specific business logic
	// set the processed string to controller setJson method
	// place to use any service callback
	selfController.setJson("{\"name\":\"Ram\"}");
	selfController.process(req,res,function(err,content){
		logger.log('content -'+content);
	});
}

module.exports.getPlainJsonController = function() {
	return selfController;
};


