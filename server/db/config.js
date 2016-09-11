const defaultConfig = './config-default.js';
// 可设定为绝对路径，如 /opt/product/config-override.js
const mockConfig = './config-mock.js';

const fs = require('fs');

var config = null;

console.log("process.env.NODE_ENV: ", process.env.NODE_ENV);

if (process.env.NODE_ENV === 'mock') {
    console.log('Load %s ...', mockConfig);
    config = require(mockConfig);
} else {
    console.log('Load %s ...', defaultConfig);
    config = require(defaultConfig);
}

module.exports = config;