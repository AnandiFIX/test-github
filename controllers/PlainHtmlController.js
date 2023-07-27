/**
 * Example Controller to get Html
 * A controller which can be used to get Html as response
 */
var util=require('./util');
var database=require('./database/DataAccess');
var logger = require('inspire').logger;
var controller = require('inspire').abstractController;

var selfController = function () {
	logger.log("selfController constructed");
}

//Extends abstract controller
selfController.__proto__ = controller;

selfController.processRequest = function(req,res) {
        //req.session.user = "me";
	// process specific business logic
	// set the processed string to controller setHtml method
	// place to use any service callback
	var data=util.processQueryData(req.queryParams);
	database.checkUsers(data,function (err,details) {
          if(err){
              res.json({value:"ERROR !!!"})
          }else{
		if(details.length==0){
           		console.log("Warning!!You enter wrong data");
			selfController.setHtml("<h2>Data Incorrect</h2>");
			selfController.process(req,res,function(err,content){
			logger.log('content -'+content);});
		}
		else{
			var str=details[0].name;			
			var html='<form action="">Name: <input type="text" name="name" value=str></form>';
			console.log(details[0].name);
			selfController.setHtml(html);
			selfController.process(req,res,function(err,content){
			logger.log('content -'+content);});
		}

          }
      })

	/*selfController.setHtml("<h2>This is controller text</h2>");
	selfController.process(req,res,function(err,content){
		logger.log('content -'+content);
	});*/
}

module.exports.getPlainHtmlController = function() {
	return selfController;
};


