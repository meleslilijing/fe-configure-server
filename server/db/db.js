/*
Model必须遵守一套规范：

统一主键，名称必须是id，类型必须是STRING(50)；
主键可以自己指定，也可以由框架自动生成（如果为null或undefined）；
所有字段默认为NOT NULL，除非显式指定；
统一timestamp机制，每个Model必须有createdAt、updatedAt，分别记录创建时间、修改时间。
其中，createdAt和updatedAt以BIGINT存储时间戳，最大的好处是无需处理时区，排序方便。
*/
var Sequelize = require('sequelize');
var config = require('./config.js');    // 开发环境数据库配置文件

// var uuid = require('node-uuid');

// function generateId() {
//     return uuid.v4();
// }

var sequelize = new Sequelize(config.dbname, config.user, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 1,
        idle: 10000
    }
})

var ID_TYPE = Sequelize.INTEGER;

// defineModel 用于强制实现Model规则
function defineModel (name, attributes) {
    var attrs = {}

    for(var key in attributes) {
        var value = attributes[key];
        if(typeof value === 'object' && value['type']) {
            value.allowNull = value.allowNull || false;
            attrs[key] = value;
        } else {
            attrs[key] = {
                type: value,
                allowNull: false 
            }
        }

        attrs['id'] = {
            type: ID_TYPE,
            primaryKey: true,
            autoIncrement: true
        }

        attrs['created'] = {
            type: Sequelize.BIGINT,
            allowNull: false
        }

        attrs['updated'] = {
            type: Sequelize.BIGINT,
            allowNull: false
        }
    }

    return sequelize.define(name, attrs, {
        tableName: name, 
        timestamp: false,
        hooks: {
            beforeValidate: function(obj) {
                var now = +new Date;
                if(obj.isNewRecord) {
                    obj['created'] = now;
                    obj['updated'] = now;
                } else {
                    obj['updated'] = now;
                }
            }   
        } // end of hooks
    })  
}

var TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN'];
var exp = {
    defineModel: defineModel,
    sync: function(obj) {
        sequelize.sync(obj)
        // only allow create ddl in non-production environment:
        // if (process.env.NODE_ENV !== 'production') {
        //     sequelize.sync({ force: true });
        // } else {
        //     throw new Error('Cannot sync() when NODE_ENV is set to \'production\'.');
        // }
    }
};

TYPES.forEach(function(type) {
    exp[type] = Sequelize[type];
})

exp.ID = ID_TYPE;

module.exports = exp;
