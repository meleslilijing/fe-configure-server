const Projects = require('../models/Projects.js');
const Versions = require('../models/Versions.js');
const path = require('path');

function modelToObject(model, keys) {
    var keys = keys || [];
    var obj = {};

    keys.forEach((key) => {
        obj[key] = model[key];
    })

    return obj
}

module.exports = {
    // 查询所有项目的版本列表
    'GET /project_list/list': function *() {
    
        try {
            var projects = yield Projects.findAll();

            var data = projects.map(function(version) {
                return modelToObject(version, ['project_name', 'branch', 'current_version'])
            })

            for(var i = 0; i < data.length; i++) {
                var item = data[i];
                item['versions'] = [];

                var project_name = item['project_name']
                var branch = item['branch']

                var versions = yield Versions.findAll({
                    where: {
                        project_name: project_name,
                        branch: branch
                    }
                })

                versions.forEach(function(version) {
                    item['versions'].push( version['version'] );
                })
            }
        } catch(e) {
            this.throw(e);
        }

        this.body = {
            rtnCode: 0,
            rtnMsg: 'ok',
            data: data
        }
    },
    // 获取项目当前版本
    'GET /project_list/query_version': function *() {

        var name = this.request.query['name'];
        var branch = this.request.query['branch'];

        if(!name || !branch) {
            this.throw(400, '项目名称, branch不能为空');
            return;
        }
        
        try {
            const version = yield Projects.findOne({
                where: {
                    project_name: name,
                    branch: branch
                }
            });

            var data = modelToObject(version, ['current_version']);

            const versionUrl = path.join('http://localhost:3000', name, branch, data['current_version'])+'.js';

            this.body = {
                rtnCode: 0,
                rtnMsg: 'ok',
                data: {
                    versionUrl: versionUrl
                }
            }
        } catch(e) {
            console.log(e)
            this.throw(e)
        }
    },
    // 设置项目当前版本
    // @params branch
    // @params name 
    // @params version 
    'POST /project_list/set_version': function *() {
        var self = this;

        var name = this.body.name;
        var branch =  this.body.branch;
        var version =  this.body.version;

        if(!name || !branch || !version) {
            this.throw(400, '项目名称，项目分支, 版本号不能为空');
        }

        try {
                var task = yield Projects.update({
                    current_version: version
                }, 
                {
                    where: {
                        project_name: name,
                        branch: branch
                    }
                })
                .then(function() {
                    self.body = {
                        rtnCode: 0,
                        rtnMsg: 'ok'
                    }
                })
        } catch(error) {
            console.log(e);
            this.throw(e);
        }
    },
    // 添加项目
    'POST /project_list/insert_project': function*() {
        /**
         * curl -X POST --data "name=main_home&branch=master" localhost:3000/project_list/insert_project
         */
        var name =  this.body.name;
        var branch = this.body.branch;

        if(!name || !branch) {
            this.throw(400, '项目名称，项目分支不能为空');
        }

        try {
            var project = yield Projects.create({
                project_name: name, 
                branch: branch,
                current_version: 'NULL'
            });

            this.body = {
                rtnCode: 0,
                rtnMsg: 'ok'
            }
        } catch(e) {
            console.log(e);
            this.throw(e);
        }
    },
    // 为某项目添加一个版本
    // 发布新fe项目时调用
    // @params branch
    // @params name 
    // @params version 
    'POST /project_list/insert_version': function *() {
        /**
         * curl -X POST --data "name=main_home&branch=release&version=test_1" localhost:3000/project_list/insert_version
         */

        /**
         * 查看Verison table 是否有该项目，没有则添加项目，有结束
         * 查看Project table 是否有该项目(分支相同)， 有则更新项目，没有则用newVersion创建该项目
         */

        var name = this.body.name;
        var branch = this.body.branch;
        var newVersion = this.body.version;
        
        if(!name || !branch || !newVersion) {
            this.throw(400, '项目名称, 项目分支, 版本号不能为空');
        }

        try {
            var oldVersion = yield Versions.findOne({
                where: {
                    project_name: name,
                    branch: branch,
                    version: newVersion
                }
            })

            // 分支已存在
            if(oldVersion) {
                var msg = [name, branch, newVersion, 'exist already.'].join(' ');
                throw new Error(msg);
            }

            yield Versions.create({
                project_name: name,
                branch: branch,
                version: newVersion
            })

            var project = yield Projects.findOne({
                where: {
                    project_name: name,
                    branch: branch
                }
            })

            /**
             *  TODO： 对Project Version表的 CRUD单独写func进行封装
             */ 

            if(!project) {
                // 项目不存在, 添加一行数据，current_version为newVersion
                yield Projects.create({
                    project_name: name,
                    branch: master,
                    current_version: newVersion
                })
            }
            else {
                // 项目存在，更新current_version
                project.current_version = newVersion;
                project.save();
            }
        } catch (e) {
            console.log(e);
            this.throw(e.toString());
            return;
        }

        this.body = {
            rtnCode: 0,
            rtnMsg: 'ok'
        }
     
    }
}