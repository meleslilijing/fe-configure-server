// const Router = require('koa-router');
// const path = require('path');
// const views = require('co-views');
// const db = require('../db/db.js');

// const rootRouter = new Router();

// // 查询所有项目的版本列表
// rootRouter.get('/project_list/list', function *() {
//     var versions = yield db.queryProjectVersions()
//     var projectsTable = yield db.projectsTable();
//     var result = {};

//     console.log('versions: ', versions)
//     console.log('projectsTable: ', projectsTable)




//     // versions.forEach((item) => {
//     //     var name = item['name'];
//     //     var version = item['version'];
//     //     var branch = item['branch'];

//     //     if(!result[name]) {
//     //         result[name] = {
//     //             currentVersion: '',
//     //             branch: branch || 'no branch',
//     //             versions: []
//     //         };

//     //         // 查询获取当前版本currentVersion
//     //         result[name]['currentVersion'] = (function() {
//     //             var result;

//     //             for(var i = 0; i < projectsTable.length; i++ ) {
//     //                 var item = projectsTable[i]

//     //                 var currentVersion = item['currentVersion'];

//     //                 if(name === item['name']) {
//     //                     result = currentVersion;
//     //                     break;
//     //                 }
//     //             }

//     //             return result || null;

//     //         }());
//     //     }

//     //     result[name]['versions'].push(version);
//     // })

//     this.body = yield {
//         rtnCode: 0,
//         rtnMsg:'ok',
//         data: result
//     };
// });

// // 获取项目当前版本
// // @params name
// // @params branch
// // return 项目完成cdn地址
// rootRouter.get('/project_list/query_version', function *() {

//     var CDN_URL = 'http://localhost:3000';

//     var name = this.request.query['name'];
//     var branch = this.request.query['branch'];

//     if(!name) {
//         this.body = yield {
//             rtnCode: -1,
//             rtnMsg: '项目名称不能为空。'
//         }
//         return;
//     }

//     var rows = yield db.getProjectVersion(name);
//     var version = rows[0]['currentVersion'] || '';

//     // CDN_URL  CDN域名
//     // name     项目名称
//     // branch   分支名 / 环境
//     // version  当前项目版本
//     const versionUrl = path.join(CDN_URL, name, branch, version)+'.js';

//     this.body = yield {
//         rtnCode: 0,
//         rtnMsg: 'ok',
//         data: {
//             versionUrl: versionUrl
//         }
//     };

// });

// // 设置项目当前版本
// // @params name
// // @params version
// rootRouter.post('/project_list/set_version', function *() {

//     var name = this.body['name'];
//     var version = this.body['version'];

//     if(!name) {
//         this.body = yield {
//             rtnCode: -1,
//             rtnMsg: '项目名称name不能为空。'
//         }
//     }
//     if(!version) {
//         this.body = yield {
//             rtnCode: -1,
//             rtnMsg: 'version 不能为空。'
//         }
//     }

//     var project = yield db.queryProjectName(name);
//     if(project.length === 0) {
//         this.body = {
//             rtnCode: -1,
//             rtnMsg: '项目'+name+'不存在'
//         }
//     }

//     yield db.setVersion(name, version)
//     this.body = yield {
//         rtnCode: 0,
//         rtnMsg: 'ok'
//     }
// });

// // 添加项目
// rootRouter.post('/project_list/add_project', function *() {
//     var self = this;

//     var name = this.body['name'];
//     var curVersion = this.body['currentVersion'];

//     if(!name) {
//         this.body = {
//             rtnCode: -1,
//             rtnMsg: '项目名称name不能为空。'
//         }
//         return
//     }

//     var oldProjectName =yield db.queryProjectName(name);
//     if(oldProjectName.length > 0) {
//         this.body = {
//             rtnCode: -1,
//             rtnMsg: '项目'+name+'已存在'
//         }
//         return
//     }

//     yield db.addProject(name, curVersion);
//     this.body = yield {
//         rtnCode: 0,
//         rtnMsg: 'ok'
//     }
// })

// // 为一个项目添加版本
// // @params name
// // @params version
// rootRouter.post('/project_list/add_version', function *() {
//     var self = this;

//     var name = this.body['name'];
//     var version = this.body['version'];

//     if(!name) {
//         this.body = {
//             rtnCode: -1,
//             rtnMsg: 'name 参数不为空'
//         }
//         return;
//     }

//     if(!version) {
//         this.body = {
//             rtnCode: -1,
//             rtnMsg: 'version 参数不为空'
//         }
//         return;
//     }

//     // 查询是否存在该项目
//     var project = yield db.queryProjectName(name);
//     if(project.length === 0) {
//         this.body = {
//             rtnCode: -1,
//             rtnMsg: '项目不存在'
//         }
//         return;
//     }

//     yield db.addVersion(name, version);

//     this.body = {
//         rtnCode: 0,
//         rtnMsg: 'ok'
//     };
// });

// module.exports = rootRouter;

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
        /**
         * 全表查询，和查询多次表
         */
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

            console.log('versions: ', versions)

            versions.forEach(function(version) {
                item['versions'].push( version['version'] );
            })
        }

        // console.log("/project_list/list data: ", data);

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

            // console.log('version: ', version[0]);

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
                rtnMsg: '添加项目' + name + ', branch: ' + branch + ', current_version: NULL'
            }
        } catch(e) {
            console.log(e);
            this.throw(e);
        }
    },
    // 为某项目添加一个版本
    // 发布新fe项目时调用
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

            console.log('oldVersion: ', oldVersion)
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

        this.body = 'ok'
     
    }
}