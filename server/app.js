'use strict';
const messages = require('./controllers/messages');
const fe_configure = require('./controllers/fe_server.js');

const compress = require('koa-compress');
const logger = require('koa-logger');
const serve = require('koa-static');
const route = require('koa-route');
const koa = require('koa');
const path = require('path');
const app = koa();

// Logger
app.use(logger());

// app.use(route.get('/', messages.home));
app.use(route.get('/messages', messages.list));
app.use(route.get('/messages/:id', messages.fetch));
app.use(route.post('/messages', messages.create));
app.use(route.get('/async', messages.delay));
app.use(route.get('/promise', messages.promise));

app.use(route.get('/', fe_configure.index));

// Serve static files
app.use(serve(path.join(__dirname, '/public')));
// app.use(serve(path.join(__dirname, '/../client/dist/')));

// Compress
app.use(compress());

if (!module.parent) {
  app.listen(3000);
  console.log('listening on port 3000');
}

module.exports = app;
