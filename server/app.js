'use strict';
process.env.NODE_ENV = 'production';

const http = require('http');
const path = require('path');
const fs = require('fs');

const parser = require('koa-bodyparser');
const logger = require('koa-logger');

const staticServer = require('koa-static');
const model = require('./model.js'); 

const Router = require('koa-router');
const router = new Router();

const app = require('koa')();

app.use(logger());

// 初始化数据库
model.sync();

// body parse
app.use(parser());
app.use(function *(next) {
	this.body = this.request.body;
	yield next;
});

// add url-route in /controllers:
// controller是mvc结构的概念。
// router 是服务端的概念。都是同一个文件。
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

function addControllers(router) {
    var files = fs.readdirSync(__dirname + '/controllers');
    
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    }).filter((f) => {
        // 过滤部分文件
        // 过滤mockController
        return f != 'mockController.js'
    });

    for (var f of js_files) {
        console.log(`process controller: ${f}...`);
        let mapping = require(__dirname + '/controllers/' + f);
        addMapping(router, mapping);
    }
}

addControllers(router);

app.use(router.routes())

// Serve static files
app.use(staticServer(path.join(__dirname, '/public')));

// catch 404
app.use(function *(next) {
	this.throw(404, '404 Not Found');
	yield next;
});

// error Handler
app.on('error', function *(err, ctx) {
	ctx.body = yield err.message;
})

http.createServer(app.callback()).listen(3000, function() {
	console.log('koa server listening on 3000')
})

module.exports = app;
