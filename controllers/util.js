const config = require('./database/dbConnection');
const con = config.createMysqlConn();
var jwt = require('jsonwebtoken');
// process.env.SECRET_KEY='stupa@847admin#_qwerty';
// process.env.EXPIRY_TIME='3600';  // in second
var controller = require('inspire').abstractController;
const logger = require('inspire').logger;

function processQueryData(arrayData) {
    var jsonObj={};
    for(var i=0;i<arrayData.length;i++){
        var key=arrayData[i].name;
        var value=arrayData[i].value;
        jsonObj[key]=value;
    }
    return jsonObj;
}

function validateAPI(id,token,cb){
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
        if(err){
            console.log('------err--------------')
            console.log(err)
            cb(err,null);
        }else{
            console.log(decoded)
            if(decoded.id===id){
                cb(null,true);
            }else{
                cb(null,false);
            }
        }
    });
}

function xorEncode(str, key) {
    // console.log('key:'+key);
    let output = '';

    for (let i = 0; i < str.length;) {
        for (let j = 0; (j < key.length && i < str.length); j++, i++) {
            output += String.fromCharCode(str[i].charCodeAt(0) ^ key[j].charCodeAt(0));
        }
    }

    return output;
}
function logData(data) {
    console.log(data ,new Date());
    logger.log(data);
}

function changeDateFormat(startDate) {
    return new Date(startDate).toISOString().slice(0, 19).replace('T', ' ');
}

function callback(err,success,details){
    if(err){
        controller.setJson(JSON.stringify({"success":false,"errorMessage":"Something went wrong"}));
    }else{
        if(success) {
            controller.setJson(JSON.stringify({"success": true, "details":details}));
        }else{
            controller.setJson(JSON.stringify({"success": false, "errorMessage": details}));
        }
    }
}

function preventSqlInjection(data) {
    let arr={};
    for(key in data){
        if(data[key] !== 'string'){
            arr[key] = data[key];
        }else{
            arr[key] = con.escape(data[key]);
        }
    }
    return arr;
}


module.exports.xorEncode=xorEncode;
module.exports.callback=callback;
module.exports.changeDateFormat=changeDateFormat;
module.exports.logData=logData;
module.exports.validateAPI=validateAPI;
module.exports.processQueryData=processQueryData;
module.exports.preventSqlInjection = preventSqlInjection;
