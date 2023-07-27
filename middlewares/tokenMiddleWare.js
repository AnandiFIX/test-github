var jwt = require('jsonwebtoken');
const database = require('../controllers/database/DataAccess');
var config = require('../controllers/database/config');
var util = require('../controllers/util');
var url = require("url");
var inspire = require('inspire');
var postForm = require('inspire').postForm;
// Need for routing functionality
var route = inspire.route;

route.getRequestInterceptor().on('beforeProcessRequest', function(req,res) {
    // We can use this event after request processing
    //Guaranteed Asynchronous Functionality

    if (req.method !== 'OPTIONS') {
        // console.log(req.url);
        // console.log('----------------------------')
        if (req.url === '/updateFile' || req.url === '/login' || req.url === '/healthCheck' || req.url === '/loginlt' || req.url.search('/generateToken') > -1 || req.url === '/tokenValidation') {
            console.log('inside token')
            // next();
            route.executeController(req,res);
        }
        else {
            let token = req.headers.authorization;
            // let id = req.headers.auth;
            let id;
            if (req.method === 'GET') {
                // console.log('----------------GET---------->');
                const queryParam = url.parse(req.url, true).query;
                if (queryParam.user_id) {
                    id = queryParam.user_id;
                } else {
                    id = undefined;
                }
                tokenChecking();
            }
            // console.log(req);
            if (req.method === 'POST') {
                // console.log('----------------POST---------->');

                var pf = new postForm(req, res, __dirname + '/../upload');
                pf.on('post', function (req, res, fields, files) {
                    // var data = JSON.parse(body);
                    //     req.isParsed=true;
                        // console.log(' ===========data received-------------')
                        if (fields.user_id) {
                            id = fields.user_id;
                        } else {
                            id = undefined;
                        }
                        req.fields=fields;
                        req.files=files;
                        tokenChecking();
                })

            }

            function tokenChecking() {
                // util.logData('---------entry--------'+req.url);
                // console.log(token, typeof token);
                if (!token || !id) {
                    console.log("inside if : ", req.url, token, id);
                    res.writeHead(400, {'Content-Type': 'text/plain'});
                    if (!res.finished) {
                        console.log('sending back...');
                        res.end();
                    }
                } else {
                    // console.log("inside if : ", req.url);
                    const decodedId = jwt.decode(token);
                    if (decodedId.id === Number(id)) {
                        jwt.verify(token, global.gConfig.JWT_SECRET_TOKEN, function (err, decoded) {
                            if (err) {
                                util.logData(err);
                                if (err.name === 'TokenExpiredError') {
                                    database.getApiTime({id: decodedId.id}, function (err,success, second_time) {
                                        if (err) {
                                            util.logData('\n Error In GetApiTime');
                                            util.logData(err);
                                        } else {
                                            util.logData('\nToken Expired:Last Time Gap:'+second_time);
                                            const exp_time = global.gConfig.JWT_EXPIRY_TIME;
                                            console.log(typeof exp_time)
                                            if (Number(second_time) > exp_time) {
                                                util.logData('\nIdle User');
                                                console.log(req.url, token, id)
                                                if (!res.finished) {
                                                    res.writeHead(400, {'Content-Type': 'text/plain'});
                                                    res.end();
                                                }
                                            } else {
                                                util.logData('\nRefresh Token');
                                                const token = jwt.sign({id: decodedId.id}, global.gConfig.JWT_SECRET_TOKEN, {expiresIn: exp_time});
                                                console.log(req.url);
                                                if (!res.finished) {
                                                    res.setHeader('Autho', token);
                                                    //next();
                                                    route.executeController(req,res)
                                                }
                                            }

                                        }
                                    })
                                } else {
                                    util.logData('\nToken Error');
                                    if (!res.finished) {
                                        res.writeHead(400, {'Content-Type': 'text/plain'});
                                        res.end();
                                    }
                                }
                            } else {
                                if (decoded.id === Number(id)) {
                                    // console.log("OK");
                                    util.logData('\nValid Request');
                                    database.insertApiTime({id: decodedId.id}, function (err) {
                                        if (err) {
                                            util.logData('error !')
                                        } else {
                                            // util.logData('Insert Api Time');
                                        }
                                    });
                                    //next();
                                    route.executeController(req,res)
                                } else {
                                    util.logData('\nId Mismatched1');
                                    if (!res.finished) {
                                        res.writeHead(400, {'Content-Type': 'text/plain'});
                                        res.end();
                                    }
                                }
                            }
                        });
                    } else {
                        util.logData('\nId Mismatched2 : ');
                        if (!res.finished) {
                            res.writeHead(400, {'Content-Type': 'text/plain'});
                            res.end();
                        }
                    }
                }
                // }
            }
        }

    }
});

var tokenFunction = function (req, res, next) {


};


module.exports = function (req, res, next) {
    return tokenFunction(req, res, next);
};
