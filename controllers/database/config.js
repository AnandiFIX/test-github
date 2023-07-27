const _ = require('lodash');

// ======local==============
// const config = require('./config.json');
// const defaultConfig = config.development;
// const environment = process.env.NODE_ENV || 'development';
// const environmentConfig = config[environment];
// const finalConfig = _.merge(defaultConfig, environmentConfig);

//============production=============
const config = require('./config.json');
const defaultConfig = config.production;
const environment = process.env.NODE_ENV || 'development';
const environmentConfig = config[environment];
const finalConfig = _.merge(defaultConfig, environmentConfig);

global.gConfig = finalConfig;


