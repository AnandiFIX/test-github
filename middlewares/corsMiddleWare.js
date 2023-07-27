var logger = require('inspire').logger;

var corsFunction = function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization,Auth');
    res.setHeader('Access-Control-Expose-Headers', 'Autho');
    res.setHeader('Cache-Control', "no-cache,no-store");
    console.log('method >>>>>>>>>>>>>>>>>', req.method)
    if (req.method === 'OPTIONS') {
        res.end();
    } else {
        next();
    }
};


//module.exports.firstFunction = firstFunction;

module.exports = function (req, res, next) {
    return corsFunction(req, res, next);
}
