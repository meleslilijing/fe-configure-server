var Db = require('../db/db.js')

module.exports = Db.defineModel('version', {
    project_name: Db.STRING(50),
    branch: Db.STRING(50),
    version: Db.STRING(50)
})