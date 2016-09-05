const Router = require('koa-router');
const path = require('path');
const views = require('co-views');
const db = require('../db/db.js');

const rootRouter = new Router();

// 查询所有项目的版本列表
rootRouter.get('/project_list/list', function *() {
    var versions = yield db.queryProjectVersions()
    var projectsTable = yield db.projectsTable();
    var result = {};

    versions.forEach((item) => {
        var name = item['name'];
        var version = item['version'];

        if(!result[name]) {
            result[name] = {
                currentVersion: '',
                versions: []
            };

            // 查询获取当前版本currentVersion
            result[name]['currentVersion'] = (function() {
                var result;

                for(var i = 0; i < projectsTable.length; i++ ) {
                    var item = projectsTable[i]

                    var currentVersion = item['currentVersion'];

                    if(name === item['name']) {
                        result = currentVersion;
                        break;
                    }
                }

                return result || null;

            }());
        }

        result[name]['versions'].push(version);
    })

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

    var rows = yield db.getProjectVersion(name);
    var version = rows[0]['currentVersion'] || '';

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

    var project = yield db.queryProjectName(name);
    if(project.length === 0) {
        this.body = {
            rtnCode: -1,
            rtnMsg: '项目'+name+'不存在'
        }
    }

    yield db.setVersion(name, version)
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

    var oldProjectName =yield db.queryProjectName(name);
    if(oldProjectName.length > 0) {
        this.body = {
            rtnCode: -1,
            rtnMsg: '项目'+name+'已存在'
        }
        return
    }

    yield db.addProject(name, curVersion);
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

    // 查询是否存在该项目
    var project = yield db.queryProjectName(name);
    if(project.length === 0) {
        this.body = {
            rtnCode: -1,
            rtnMsg: '项目不存在'
        }
        return;
    }

    yield db.addVersion(name, version);

    this.body = {
        rtnCode: 0,
        rtnMsg: 'ok'
    };
});

module.exports = rootRouter;
