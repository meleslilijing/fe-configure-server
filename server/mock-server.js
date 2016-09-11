// mock server

/**
 * 因为hot reload原因。
 * 链接数据库的返回请求会有问题，
 * 因此 mock-server 使用的是静态数据。
 * 
 * 更好的做法是保留webpack的自动编译功能，但是删除自动刷新功能。   done
 * 同时使用数据库存储数据。
 * 可以使用不同的数据库。通过 process.argv的参数 或者 process.env.NODE_ENV的参数来实现。
 */
'use strict';
process.env.NODE_ENV = 'mock';

const http = require('http');
const path = require('path');
const parser = require('koa-bodyparser');
const logger = require('koa-logger');

const staticServer = require('koa-static');
const app = require('koa')();

const Router = require('koa-router');
const router = new Router();

// webpack
var webpack = require('webpack');
var webpackConfig = require('../webpack.config.dev.js');	// 添加hot-reload, 同时有source-map, 没有
var compiler = webpack(webpackConfig);

// app.use(webpackMiddleware(compiler);
app.use(require("koa-webpack-dev-middleware")(compiler, {
	noInfo: true,
	publicPath: webpackConfig.output.publicPath
}));

app.use(require("koa-webpack-hot-middleware")(compiler, {
	log: console.log,
	path: '/__webpack_hmr',
	heartbeat: 10 * 1000
}));

const model = require('./model.js');
model.sync();

app.use(parser());
app.use(function *(next) {
	this.body = this.request.body;
	yield next;
});

// mock-server.js 与 app.js 的区别在于。
// mock-server.js 的controller文件是自己写的。
// controller 是读取文件夹下的文件列表
function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log('register URL mapping: GET ', path);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log('register URL mapping: POST ', path);
        } else {
            console.log('invalid URL: ', url);
        }
    } 
}

function addMockController() {
	var js_files = [
		'pages.js',
		// 'mockController.js'
        'projects.js'
	]

	for (var f of js_files) {
        console.log(`process controller: ${f}...`);
        let mapping = require(__dirname + '/controllers/' + f);
        addMapping(router, mapping);
    }
}

addMockController(router);
app.use(router.routes())

// add static Server
app.use(staticServer(path.join(__dirname, '/public')));

// error Handler
app.on('error', function *(err, ctx) {
	ctx.body = yield err.message;
})

var port = 3001
http.createServer(app.callback()).listen(port, function() {
	console.log('koa server listening on ', port);
})
