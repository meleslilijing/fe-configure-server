'use strict';
const messages = require('./controllers/messages');

const compress = require('koa-compress');
const logger = require('koa-logger');
const serve = require('koa-static');
const koa = require('koa');
const path = require('path');
const router = require('koa-router');
const rootRouter = require('./routes/routes.js');
const app = koa();

// Logger
app.use(logger());

app.use(rootRouter.routes());

// Serve static files
// app.use(serve(path.join(__dirname, '/public')));
app.use(serve(path.join(__dirname, '/../client/dist/')));

// Compress
app.use(compress());

if (!module.parent) {
  app.listen(3000);
  console.log('listening on port 3000');
}

module.exports = app;
