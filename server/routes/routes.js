const path = require('path');
const views = require('co-views');

const projectListController = require('../controllers/projectList.js');
const Router = require('koa-router');

const rootRouter = new Router();

const render = views(path.join(__dirname, '/../../client/html/'), {
    map: { html: 'swig' }
});

rootRouter.get('/', function *() {
    this.body = yield render('index');
});

rootRouter.get('/projectList', projectListController.index);

rootRouter.get('/projectList/list', projectListController.list);

rootRouter.get('/projectList/get', projectListController.get);

rootRouter.get('/projectList/set', projectListController.set);

rootRouter.post('/projectList/add', projectListController.add);

module.exports = rootRouter;
