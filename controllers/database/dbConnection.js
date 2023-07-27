var config = require('./config');
var mysql = require('mysql');
function createMysqlConn(){
    let con = mysql.createPool({
        connectionLimit : global.gConfig.CONNECTION_LIMIT,
        host: global.gConfig.MYSQL_HOST,
        user: global.gConfig.USER,
        password: global.gConfig.PASSWORD,
        database: global.gConfig.DATABASE,
        multipleStatements: true
    });
    return con;
}
function createMysqlConnReport(){
    let con = mysql.createPool({
        connectionLimit : global.gConfig.CONNECTION_LIMIT,
        host: global.gConfig.SLAVE_MYSQL_HOST,
        user: global.gConfig.SLAVE_USER,
        password: global.gConfig.SLAVE_PASSWORD,
        database: global.gConfig.DATABASE,
        multipleStatements: true
    });
    return con;
}


module.exports.createMysqlConnReport = createMysqlConnReport;
module.exports.createMysqlConn = createMysqlConn;
