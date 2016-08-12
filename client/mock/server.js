'use strict';

var http = require('http');
var path = require('path');
var util = require('util');
var url = require('url');

var express = require('express');

var webpack = require('webpack');
var webpackCfg = require(path.join(__dirname, '../../webpack.dev.config.js'));
var compiler = webpack(webpackCfg);
var devMiddleware = require('webpack-dev-middleware');
var hotMiddleware = require('webpack-hot-middleware');

var app = express();
var apis = require('./apis');

var clientSourceDir = path.join(__dirname, '../src');

// logger
app.use(require('morgan')('short'));

app.use(devMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackCfg.output.publicPath
}));

console.log('webpackCfg.output.publicPath:', path.dirname(webpackCfg.output.publicPath));

app.use(hotMiddleware(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
}));

// api
app.use('/', apis);

// route pages
app.get('/*', function(req, res, next) {
  res.sendFile(path.join(clientSourceDir, '../template/'+req.path + '.html'));
  next();
});

// static
app.get('/*', function(req, res) {
  var pathname = url.parse(req.url).pathname;
  var filename = path.join(clientSourceDir, pathname);

  res.sendFile(filename);
});

http.createServer(app).listen(3001, function() {
  var url = util.format('http://%s:%d', 'localhost', 3001);
  console.log('Listening at %s', url);
});
