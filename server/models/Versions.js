var db = require('../db/db.js')

module.exports = db.defineModel('Versions', {
    project_name: db.STRING(50),
    branch: db.STRING(50),
    version: db.STRING(50)
})