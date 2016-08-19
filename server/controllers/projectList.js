'use strict';
const views = require('co-views');
const parse = require('co-body');
const path = require('path');
const db = require('../db/db.js');

const render = views(path.join(__dirname, '/../../client/html/'), {
  map: { html: 'swig' }
});

// 首页
module.exports.index = function *(ctx) {
    this.body = yield render('index');
};

// 返回项目的当前项目列表
// 包括每个项目的信息
module.exports.list = function *(ctx) {
    this.response.body = yield {
        rtnCode: 0,
        rtnMessage: 'ok',
        data: [
            {
                id: 0,
                name: 'main-home',
                nameText: '移动端产品站',
                historyVersions: [1, 2, 3],
                currentVersion: 'xxxxxxx'
            },
            {
                id: 1,
                name: 'boss-online',
                nameText: '移动端网厅',
                historyVersions: [4, 5, 6],
                currentVersionIndex: 6
            }
        ]
    };
};

// 获取项目当前版本
// @params name
module.exports.get = function *(ctx) {
    this.response.type = 'json';
    this.body = yield {
        name: 'main-home',
        version: '12345678',
        timeampt: +new Date()
    };
};

// 设置项目当前版本
// @params name
// @params version
module.exports.set = function *(ctx) {
    this.body = yield {
        rtnCode: 0,
        rtnMsg: 'ok'
    };
};

// 添加项目版本
// @params name
// @params version
module.exports.add = function *(ctx) {
    var self = this;
    var DB_ERROR_CODE = 1;

    var request = this.request;
    var query = request.query;

    var name = query['name'];
    var version = query['version'];

    var rows = yield db.insertVersion(name, version);
    this.body = yield {
        rtnCode: 0,
        rtnMsg: 'ok'
    }

    // yield db.insertVersion(name, version)
    //     .then((rows) => {
    //         self.body = {
    //             rtnCode: 0,
    //             rtnMsg: 'ok'
    //         };
    //     })
    //     .catch((error) => {
    //         var errMsg = error.message || '数据库连接出错: ' + error;
    //         self.body = {
    //             rtnCode: DB_ERROR_CODE,
    //             rtnMsg: errMsg
    //         };
    //     })
};
