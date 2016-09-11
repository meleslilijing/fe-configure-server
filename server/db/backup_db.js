var options = {
    host: 'localhost',
    port: '3306',
    database: 'fe_config',
    user: 'root',
    password: '123456',
    connectionLimit: 5,
    supportBigNumbers: true,
    bigNumberStrings: true
};

var mysql = require('mysql2');
var pool = mysql.createPool(options);

function execQuery(sql, values, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            console.log('db error: ');
            console.log(err);
            callback(new Error('DB: 获取数据库链接异常'));
        } else {
            // rows为查询结果
            var querys = connection.query(sql, values, function(err, rows) {
                // release
                try {
                    connection.release(function(error) {
                        if (error) {
                            callback(new Error('DB: 关闭数据库连接异常！'));
                        }
                    });

                } catch (error) {
                    callback(error);
                }

                // selector
                if (err) {
                    callback(new Error('DB: SQL语句执行错误-' + err))
                } else {
                    callback(null, rows)
                }
            }); // endof connection.query
        } // endof if
    });
}

// 返回projects表
module.exports.projectsTable = function() {
    var sql = 'SELECT * FROM projects';
    return new Promise((resolve, reject) => {
        execQuery(sql, function(error, rows) {
            if(error) reject(error);
            resolve(rows);
        })
    })
}

// 查询项目
module.exports.queryProjectName = function(name) {
    var sql = 'SELECT name FROM projects WHERE name=?;';
    var values = [name];

    return new Promise((resolve, reject) => {
        execQuery(sql, values, function(error, rows) {
            if(error) reject(error);
            resolve(rows);
        })
    })

}

// 添加项目
module.exports.addProject = function(name, defaultVersion) {
    var defaultVersion = defaultVersion || null;

    var sql = 'INSERT INTO projects (name, currentVersion) VALUES (?, ?);';
    var values = [name, defaultVersion];

    return new Promise(function(resolve, reject) {
        execQuery(sql, values, function(error, rows) {
            if(error) {
                reject(error);
            }
            else {
                resolve(rows);
            }
        })
    })
}

// 添加某项目的版本
module.exports.addVersion = function(name, version, timestamp) {
    var timestamp = +new Date;

    var sqls = [
        'INSERT INTO versions (name, version, timestamp) VALUES (?, ?, ?);',
        'UPDATE projects SET currentVersion=?, timestamp=? WHERE name=?;'
    ];

    var values = [
        [name, version, timestamp],
        [version, timestamp, name]
    ]

    return new Promise(function(resolve, reject) {
        execQuery(sqls[0], values[0], function(error1, rows1) {
            execQuery(sqls[1], values[1], function(error2, rows2) {
                var error = error2 || error1;
                if(error) {
                    reject(error)
                }
                else {
                    var rows = rows2 || rows1;
                    resolve(rows)
                }
            })
        })
    }); // endof promise

}

// 查询所有项目版本列表
module.exports.queryProjectVersions = function() {
    var sql = 'SELECT name, version FROM versions'

    return new Promise(function(resolve, reject) {
        execQuery(sql, function(error, rows) {
            if(error) {
                reject(error);
            }
            else {
                resolve(rows);
            }
        })
    });
}

// TODO POST-man测试后不生效
// 设置某项目的版本
module.exports.setVersion = function(name, version) {
    var timestamp = +new Date;
    var sql = 'UPDATE projects SET currentVersion=?, timestamp=? WHERE name=?;';
    var values = [version, timestamp, name];

    return new Promise(function(resolve, reject) {
        execQuery(sql, values, function(error, rows) {
            if(error) {
                resolve(error);
            }
            else {
                resolve(rows);
            }
        })
    });
}

// 获取项目当前版本
module.exports.getProjectVersion = function(name) {
    var sql = 'SELECT currentVersion FROM projects WHERE name=?;';
    var values = [name];

    return new Promise(function(resolve, reject) {
        execQuery(sql, values, function(error, rows) {
            if(error) {
                reject(error);
            }
            else {
                resolve(rows);
            }
        })
    })
}

// module.exports.createRandomVersion = function() {
//    var random = function() {
//         var result = parseInt(Math.random()*1000);
//         (result < 1000) && (result = '0' + result);
//         return result;
//     };

//     var testVersion = 'testVersion' + random();
//     var timestamp = +new Date;
//     var sqls = [
//         `INSERT INTO versions (name, version) VALUES (testProject, ${testVersion});`,
//         `UPDATE projectList set vurrentVersion=${testVersion}, timestamp=${timestamp} where name=testProject`
//     ];

//     return new Promise(function(resolve, reject) {
//         execQuery(sqls[0], function(error, rows) {
//             execQuery(sqls[1], function(error2, rows2) {
//                 var err = error2 || error;
//                 if(err) {
//                     reject(err);
//                 }
//                 else {
//                     resolve(rows2 || rows);
//                 }
//             })
//         });
//     })
// }
