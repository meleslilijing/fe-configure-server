'use strict';
const messages = require('./controllers/messages');
const path = require('path');
const compress = require('koa-compress');
const logger = require('koa-logger');
// const bunyan = require('bunyan');
// const log = bunyan.createLogger({
//     name: 'myapp',
//     streams: [
//         {
//             level: 'info',
//             stream: path.join(__dirname, './log/info.log')
//         }
//     ]
// });

const serve = require('koa-static');
const koa = require('koa');
const router = require('koa-router');
const rootRouter = require('./routes/routes.js');
const app = koa();

// Logger
app.use(logger());

// app.use(function *(next) {
// 	log.info()
// 	yield next;
// })

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
