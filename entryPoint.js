var inspire = require('inspire');

// Need for routing functionality
var route = inspire.route;

route.useMiddlewareFunc(false);
//Need for logging functionality
var logger = inspire.logger;

//If we want to middlewares
var corsMiddle = require('./middlewares/corsMiddleWare');
// var tokenMiddle = require('./middlewares/tokenMiddleWare');

inspire.setStaticport('9000');

route.use(corsMiddle);
// route.use(tokenMiddle);
/**
 * routing collection is aquired and send to route for request processing 	
 */
var routeCollection = require('./routeWay').getRouteCollection().routeCollection;

route.setRouteCollection(routeCollection);

/**
 * Last step - start the server
 */
inspire.spawn("0.0.0.0","9005");

console.log("Congratulations!!!Your Server has started");
logger.log('server started');


