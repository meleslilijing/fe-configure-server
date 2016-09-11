const Router = require('koa-router');
const path = require('path');
const views = require('co-views');
const db = require('../db/db.js');

const rootRouter = new Router();
const render = views(path.join(__dirname, '../views'), {
    map: { html: 'swig' }
});

module.exports = {
    'GET /project_list/list': function* () {
        this.body = yield {
            "data": [
                {
                    "project_name": "main_home",
                    "id": 1,
                    "createdAt": 1473404365454,
                    "updatedAt": 2016,
                    "branch": "master",
                    "current_version": "test123"
                }
            ]
        }
    },
    'GET /project_list/query_version': function* () {
        var name =  this.body.name;
        var branch = this.body.branch;

        if(!name || !branch) {
            this.throw(400, '项目名称，项目分支不能为空');
        }

        this.body = yield {
            "rtnCode": 0,
            "rtnMsg": "ok", 
            "data": { 
                "versionUrl": "http:/localhost:3000/main_home/master/test123.js" 
            }
        }
    },
    'POST /project_list/insert_project': function* () {
        var name =  this.body.name;
        var branch = this.body.branch;

        if(!name || !branch) {
            this.throw(400, '项目名称，项目分支不能为空');
        }

        this.body = {
            rtnCode: 0,
            rtnMsg: 'ok'
        }
    },
    'POST /project_list/insert_version': function* () {
        this.body = {
            rtnCode: 0,
            rtnMsg: 'ok'
        }
    }
};