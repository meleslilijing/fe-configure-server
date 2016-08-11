'use strict';
const views = require('co-views');
const parse = require('co-body');
const path = require('path');

const render = views(path.join(__dirname, '/../../client/html/'), {
  map: { html: 'swig' }
})

module.exports.index = function *index(ctx) {
  this.body = yield render('index', {
    'title': '移动虚商'
  });
}
