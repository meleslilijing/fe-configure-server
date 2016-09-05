'use strict';
const http = require('http');
const path = require('path');
const messages = require('./controllers/messages');
const compress = require('koa-compress');
const parser = require('koa-bodyparser');
const logger = require('koa-logger');

const staticServer = require('koa-static');
const koa = require('koa');
const pagesRouter = require('./routes/pages.js');
const rootRouter = require('./routes/routes.js');
const app = koa();

app.use(logger());

// body parse
app.use(parser());
app.use(function *(next) {
	this.body = this.request.body;
	yield next;
});

app.use(pagesRouter.routes());
app.use(rootRouter.routes());

// Serve static files
app.use(staticServer(path.join(__dirname, '/public')));

// Compress
app.use(compress());

// catch 404
app.use(function *(next) {
	this.throw(404, '404 Not Found');
	yield next;
});

// error Handler
app.on('error', function *(err, ctx) {
	ctx.body = yield err.message;
})

module.exports = app;
