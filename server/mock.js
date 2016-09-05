'use strict';
const http = require('http');
const path = require('path');
const parser = require('koa-bodyparser');
const logger = require('koa-logger');

const staticServer = require('koa-static');
const koa = require('koa');
const pagesRouter = require('./routes/pages.js');
const mockRouter = require('./mock/mock.js');
const mock = koa();

// 开发模式 node mock.js dev
var webpack = require('webpack');
var webpackConfig = require('../webpack.config.dev.js');
var compiler = webpack(webpackConfig);

// mock.use(webpackMiddleware(compiler);
mock.use(require("koa-webpack-dev-middleware")(compiler, {
	// noInfo: true,
	publicPath: webpackConfig.output.publicPath
}));
mock.use(require("koa-webpack-hot-middleware")(compiler, {
	log: console.log,
	path: '/__webpack_hmr',
	heartbeat: 10 * 1000
}));

// body parse
mock.use(parser());
mock.use(function *(next) {
	this.body = this.request.body;
	yield next;
});

mock.use(pagesRouter.routes());
mock.use(mockRouter.routes());

// Serve static files
mock.use(staticServer(path.join(__dirname, '/public')));

mock.on('error', function(err, ctx) {
	console.log(err);
})

if (!module.parent) {
	mock.listen(8080);
	console.log("Mock server listening on 8080")
}
