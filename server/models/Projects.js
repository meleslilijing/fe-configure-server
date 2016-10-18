var Db = require('../db/db.js');

module.exports = Db.defineModel('project', {
    project_name: Db.STRING(50),
    branch: Db.STRING(50),
    current_version: Db.STRING(50)
})