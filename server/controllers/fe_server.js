'use strict';
const views = require('co-views');
const parse = require('co-body');

const render = views(__dirname + '/../views', {
  map: { html: 'swig' }
})

module.exports.index = function *home(ctx) {
  this.body = yield render('index', {
    'title': '移动虚商'
  });
}
