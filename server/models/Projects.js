var db = require('../db/db.js')

module.exports = db.defineModel('Projects', {
    project_name: db.STRING(50),
    branch: db.STRING(50),
    current_version: db.STRING(50)
})