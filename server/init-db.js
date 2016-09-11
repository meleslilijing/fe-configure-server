var model = require('./model.js');

model.sync();

console.log('init db ok.');
process.exit(0);

// var Sequelize = require('sequelize');
// var dbconfig = require('./db/config.js')

// var sequelize = new Sequelize(dbconfig.dbname, dbconfig.user, dbconfig.password, {
//     host: dbconfig.host,
//     dialect: 'mysql',
//     pool: {
//         max: 5, 
//         min: 0,
//         idle: 10000
//     }
// }); 

// // var Project = require('./models/Project.js');

// sequelize.define('Project', {
//     project_name: Sequelize.STRING(50),
//     branch: Sequelize.STRING(50),
//     current_version: Sequelize.STRING(50)
// })

// sequelize.sync();