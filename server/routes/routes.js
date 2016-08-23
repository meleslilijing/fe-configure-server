const Router = require('koa-router');
const path = require('path');
const views = require('co-views');
const db = require('../db/db.js');

const render = require('react-dom/server');

const rootRouter = new Router();
// const render = views(path.join(__dirname, '/../../client/html/'), {
//     map: { html: 'swig' }
// });

rootRouter.get('/', function *() {
    // this.body = yield render('index');
    this.body = render(path.join(__dirname, '/../../client/src/index.js'));
});

rootRouter.get('/project_list', function *() {
    this.body = yield render('project_list');
});

rootRouter.get('/project_list/test', function *() {
    this.body = yield render('test');
});







// 返回项目的当前项目列表
// 包括每个项目的信息
rootRouter.get('/projectList/list', function *() {
    this.body = yield {
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
});

// 获取项目当前版本
// @params name
rootRouter.get('/projectList/get', function *() {
    this.body = yield {
        name: 'main-home',
        version: '12345678',
        timeampt: +new Date()
    };
});

// 设置项目当前版本
// @params name
// @params version
rootRouter.get('/projectList/set', function *() {
    this.body = yield {
        rtnCode: 0,
        rtnMsg: 'ok'
    };
});



// 添加项目版本
// @params name
// @params version
rootRouter.post('/projectList/add', function *() {
    var request = this.request;
    var query = request.query;

    var name = query['name'];
    var version = query['version'];

    var rows = yield db.insertVersion(name, version)

    this.body = yield {
        rtnCode: 0,
        rtnMsg: 'ok'
    }
});

// 添加随机版本
rootRouter.post('/projectList/random', function *() {
    var rows = yield db.createRandomVersion();
    this.body = yield {
        rtnCode: '0',
        rtnMsg: 'ok',
        rows: rows
    }
});

module.exports = rootRouter;
