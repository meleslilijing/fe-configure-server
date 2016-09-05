const Router = require('koa-router');
const path = require('path');
const views = require('co-views');
const db = require('../db/db.js');

const rootRouter = new Router();
const render = views(path.join(__dirname, '../views'), {
    map: { html: 'swig' }
});

// 查询所有项目的版本列表
rootRouter.get('/project_list/list', function *() {
    const result = {
        test1: {
            currentVersion: 'test-01',
            versions: [
                'test-01',
                'test-02',
                'test-03',
                'test-04',
                'test-05'
            ]
        },
        'test-foo': {
            currentVersion: 'test-01',
            versions: [
                'test-01',
                'test-02',
                'test-03',
                'test-04',
                'test-05'
            ]
        },
        'test-bar': {
            currentVersion: 'test-01',
            versions: [
                'test-01',
                'test-02',
                'test-03',
                'test-04',
                'test-05'
            ]
        }
    }

    this.body = yield {
        rtnCode: 0,
        rtnMsg:'ok',
        data: result
    };
});

// 获取项目当前版本
// @params name
rootRouter.get('/project_list/get_version', function *() {

    var name = this.request.query['name'];
    if(!name) {
        this.body = yield {
            rtnCode: -1,
            rtnMsg: '项目名称不能为空。'
        }
        return;
    }

    const version = 'get_version/test-version'

    this.body = yield {
        rtnCode: 0,
        rtnMsg: 'ok',
        data: {
            currentVersion: version
        }
    };

});

// 设置项目当前版本
// @params name
// @params version
rootRouter.post('/project_list/set_version', function *() {

    var name = this.body['name'];
    var version = this.body['version'];

    if(!name) {
        this.body = yield {
            rtnCode: -1,
            rtnMsg: '项目名称name不能为空。'
        }
    }
    if(!version) {
        this.body = yield {
            rtnCode: -1,
            rtnMsg: 'version 不能为空。'
        }
    }

    this.body = yield {
        rtnCode: 0,
        rtnMsg: 'ok'
    }
});

// 添加项目
rootRouter.post('/project_list/add_project', function *() {
    var self = this;

    var name = this.body['name'];
    var curVersion = this.body['currentVersion'];

    if(!name) {
        this.body = {
            rtnCode: -1,
            rtnMsg: '项目名称name不能为空。'
        }
        return
    }

    this.body = yield {
        rtnCode: 0,
        rtnMsg: 'ok'
    }
})

// 为一个项目添加版本
// @params name
// @params version
rootRouter.post('/project_list/add_version', function *() {
    var self = this;

    var name = this.body['name'];
    var version = this.body['version'];

    if(!name) {
        this.body = {
            rtnCode: -1,
            rtnMsg: 'name 参数不为空'
        }
        return;
    }

    if(!version) {
        this.body = {
            rtnCode: -1,
            rtnMsg: 'version 参数不为空'
        }
        return;
    }

    this.body = {
        rtnCode: 0,
        rtnMsg: 'ok'
    };
});

module.exports = rootRouter;
