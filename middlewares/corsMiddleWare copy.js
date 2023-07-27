var url = require("url");
const DataAccess = require('../controllers/database/DataAccess');
const NodeCache = require('node-cache');
const dbConnectionCache = new NodeCache();

var inspire = require('inspire');
var postForm = require('inspire').postForm;

var corsFunction = function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization,Auth');
    res.setHeader('Access-Control-Expose-Headers', 'Autho');
    res.setHeader('Cache-Control', "no-cache,no-store");

    if (req.method === 'OPTIONS') {
        res.end();
    } else {
        const updateFile = '/updateFile';
        const tokenGenerate = '/generateToken';
        const tokenValiadation = '/tokenValidation';
        const getAllTicketDetailsExtended = '/getAllTicketDetailsExtended';
        const encryptData = '/encryptData';
        const decryptData = '/decryptData';
        const getLoginClientList = '/getLoginClientList';

        console.log('INSIDE corsFunction..........\n' + req.url + '\n');

        if (req.method === 'GET') {

            console.log('global.gConfig.GlobalMYSql_Master_Conenction == >>> ' + global.gConfig.GlobalMYSql_Master_Conenction);

            const queryParam = url.parse(req.url, true).query;

            console.log('queryParam == >>> ' + JSON.stringify(queryParam));

            if (queryParam.mapping_client_config_id === undefined || queryParam.mapping_client_config_id === null
                || queryParam.mapping_client_config_id === NaN || queryParam.mapping_client_config_id === 0) {

                if (queryParam.mapping_client_code_config == undefined || queryParam.mapping_client_code_config == null
                    || queryParam.mapping_client_code_config == NaN || queryParam.mapping_client_code_config == '') {

                    if (req.url.search(tokenGenerate) !== -1
                        || req.url.search(getAllTicketDetailsExtended) !== -1
                        || req.url.search(encryptData) !== -1
                        || req.url.search(decryptData) !== -1) {
                        global.gConfig.GlobalClientId = queryParam.clientId; //clientId
                        DataAccess.getDBConnectionCLientWise_Master({ mapping_client_config_id: global.gConfig.GlobalClientId }
                            , function (err, success, details) {
                                if (err) {
                                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                                    res.end();
                                } else {
                                    if (success) {
                                        global.gConfig.GlobalMYSql_Master_Conenction = details[0].MasterCon;
                                        global.gConfig.GlobalMYSql_Slave_Conenction = details[1].SLAVECONN;
                                        dbConnectionCache.set("MasterCOnn", "HELLO......");
                                        console.log('Setting Connection == >>> ');
                                        next();
                                    } else {
                                        res.writeHead(400, { 'Content-Type': 'text/plain' });
                                        res.end();
                                    }
                                }
                            });
                    } else {
                        res.writeHead(400, { 'Content-Type': 'text/plain' });
                        res.end();
                    }
                } else {
                    global.gConfig.GlobalClientCode = queryParam.mapping_client_code_config;

                    DataAccess.getDBConnectionCLientWise_Master({ mapping_client_code_config: global.gConfig.GlobalClientCode }
                        , function (err, success, details) {
                            if (err) {
                                res.writeHead(400, { 'Content-Type': 'text/plain' });
                                res.end();
                            } else {
                                if (success) {
                                    global.gConfig.GlobalMYSql_Master_Conenction = details[0].MasterCon;
                                    global.gConfig.GlobalMYSql_Slave_Conenction = details[1].SLAVECONN;
                                    dbConnectionCache.set("MasterCOnn", details);
                                    console.log('Setting Connection == >>> ');
                                    next();
                                } else {
                                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                                    res.end();
                                }
                            }
                        });
                }
            } else {
                global.gConfig.GlobalClientId = queryParam.mapping_client_config_id;
                DataAccess.getDBConnectionCLientWise_Master({ mapping_client_config_id: global.gConfig.GlobalClientId }
                    , function (err, success, details) {
                        if (err) {
                            res.writeHead(400, { 'Content-Type': 'text/plain' });
                            res.end();
                        } else {
                            if (success) {
                                global.gConfig.GlobalMYSql_Master_Conenction = details[0].MasterCon;
                                global.gConfig.GlobalMYSql_Slave_Conenction = details[1].SLAVECONN;
                                dbConnectionCache.set("MasterCOnn", "HELLO......");
                                console.log('Setting Connection == >>> ');
                                next();
                            } else {
                                res.writeHead(400, { 'Content-Type': 'text/plain' });
                                res.end();
                            }
                        }
                    });
            }

        } else if (req.method === 'POST') {

            var pf = new postForm(req, res, __dirname + '/../upload');

            pf.on('post', function (req, res, fields, files) {

                console.log('fields == >>> ' + JSON.stringify(fields));

                queryParam = fields;

                //global.gConfig.GlobalClientCode = fields.mapping_client_code_config; global.gConfig.GlobalClientId = fields.mapping_client_config_id;
                if (queryParam.mapping_client_config_id === undefined || queryParam.mapping_client_config_id === null
                    || queryParam.mapping_client_config_id === NaN || queryParam.mapping_client_config_id === 0) {

                    if (queryParam.mapping_client_code_config == undefined || queryParam.mapping_client_code_config == null
                        || queryParam.mapping_client_code_config == NaN || queryParam.mapping_client_code_config == '') {

                        if (req.url.search(tokenValiadation) !== -1 || req.url.search(updateFile) !== -1
                            || req.url.search(getLoginClientList) !== -1) {
                            global.gConfig.GlobalClientId = queryParam.clientId; //clientId
                            DataAccess.getDBConnectionCLientWise_Master({ mapping_client_config_id: global.gConfig.GlobalClientId }
                                , function (err, success, details) {
                                    if (err) {
                                        res.writeHead(400, { 'Content-Type': 'text/plain' });
                                        res.end();
                                    } else {
                                        if (success) {
                                            global.gConfig.GlobalMYSql_Master_Conenction = details[0].MasterCon;
                                            global.gConfig.GlobalMYSql_Slave_Conenction = details[1].SLAVECONN;
                                            dbConnectionCache.set("MasterCOnn", "HELLO......");
                                            console.log('Setting Connection == >>> ');
                                            next();
                                        } else {
                                            res.writeHead(400, { 'Content-Type': 'text/plain' });
                                            res.end();
                                        }
                                    }
                                });
                        } else {
                            res.writeHead(400, { 'Content-Type': 'text/plain' });
                            res.end();
                        }
                    } else {
                        global.gConfig.GlobalClientCode = queryParam.mapping_client_code_config;

                        DataAccess.getDBConnectionCLientWise_Master({ mapping_client_code_config: global.gConfig.GlobalClientCode }
                            , function (err, success, details) {
                                if (err) {
                                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                                    res.end();
                                } else {
                                    if (success) {
                                        global.gConfig.GlobalMYSql_Master_Conenction = details[0].MasterCon;
                                        global.gConfig.GlobalMYSql_Slave_Conenction = details[1].SLAVECONN;
                                        dbConnectionCache.set("MasterCOnn", details);
                                        console.log('Setting Connection == >>> ');
                                        next();
                                    } else {
                                        res.writeHead(400, { 'Content-Type': 'text/plain' });
                                        res.end();
                                    }
                                }
                            });
                    }
                } else {
                    global.gConfig.GlobalClientId = queryParam.mapping_client_config_id;
                    DataAccess.getDBConnectionCLientWise_Master({ mapping_client_config_id: global.gConfig.GlobalClientId }
                        , function (err, success, details) {
                            if (err) {
                                res.writeHead(400, { 'Content-Type': 'text/plain' });
                                res.end();
                            } else {
                                if (success) {
                                    global.gConfig.GlobalMYSql_Master_Conenction = details[0].MasterCon;
                                    global.gConfig.GlobalMYSql_Slave_Conenction = details[1].SLAVECONN;
                                    dbConnectionCache.set("MasterCOnn", "HELLO......");
                                    console.log('Setting Connection == >>> ');
                                    next();
                                } else {
                                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                                    res.end();
                                }
                            }
                        });
                }


            })
        }

    }
};



//module.exports.firstFunction = firstFunction;

module.exports = function (req, res, next) {
    return corsFunction(req, res, next);
}
