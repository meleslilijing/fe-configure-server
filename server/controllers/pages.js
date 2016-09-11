const path = require('path');
// const Router = require('koa-router');
const views = require('co-views');

// const pagesRouter = new Router();

const render = views(path.join(__dirname, '../views'), {
    map: { html: 'swig' }
});

// // 首页
// pagesRouter.get('/', function *() {
//     this.response.type = 'text/html';
//     this.body = yield render('index');
// });

// pagesRouter.redirect('/index', '/');

// // 项目列表页
// pagesRouter.get('/project_list', function *() {
//     this.response.type = 'text/html';
//     this.body = yield render('project_list');
// });

// // 项目版本测试
// pagesRouter.get('/project_test', function *() {
//     this.response.type = 'text/html';
//     this.body = yield render('project_test');
// });

// pagesRouter.get('/log', function *() {
//     this.type = 'html';
//     this.body = yield render('log');
// })

// // 项目列表测试页
// pagesRouter.get('/project_list/test', function *() {
//     this.response.type = 'text/html';
//     this.body = yield render('test');
// });

// module.exports = pagesRouter;


module.exports = {
    'GET /': function *() {
        this.response.type = 'text/html';
        this.body = yield render('index');
    },
    'GET /index': function *() {
        this.response.type = 'text/html';
        this.body = yield render('index');
    },
    // 项目列表页
    'GET /project_list': function *() {
        this.response.type = 'text/html';
        this.body = yield render('project_list');
    },
    // 项目版本测试
    'GET /project_test': function *() {
        this.response.type = 'text/html';
        this.body = yield render('project_test');
    },
    // 日志页
    'GET /log': function *() {
        this.type = 'html';
        this.body = yield render('log');
    },
    // 项目列表测试页
    'GET /project_list/test': function *() {
        this.response.type = 'text/html';
        this.body = yield render('test');
    }
    
}