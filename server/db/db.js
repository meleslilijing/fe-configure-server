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

module.exports.insertVersion = function(name, version) {
    return new Promise(function(resolve, reject) {
        var sql = 'INSERT INTO versionHistory (name, version) VALUES (?, ?);';
        var value = [name, version];

        execQuery(sql, value, function(error, rows) {
            if(error) {
                reject(error);
            }
            else {
                resolve(rows);
            }
        })
    }); // endof return
};

module.exports.createRandomVersion = function() {
   var random = function() {
        var result = parseInt(Math.random()*1000);
        (result < 1000) && (result = '0' + result);
        return result;
    };

    var testVersion = 'testVersion' + random();
    var timestamp = +new Date;
    var sqls = [
        `INSERT INTO versionHistory (name, version) VALUES (testProject, ${testVersion});`,
        `UPDATE projectList set vurrentVersion=${testVersion}, timestamp=${timestamp} where name=testProject`
    ]

    return new Promise(function(resolve, reject) {
        execQuery(sqls[0], function(error, rows) {
            execQuery(sqls[1], function(error2, rows2) {
                var err = error2 || error;
                if(err) {
                    reject(err);
                }
                else {
                    resolve(rows2 || rows);
                }
            })
        });
    })
   

    
}

// module.exports.testInsert = function(name, version) {
//     var name = name + '';
//     var version = version + '';
//
//
//     execQuery(sql, [name, version], function(error, rows) {
//
//     })
// }
