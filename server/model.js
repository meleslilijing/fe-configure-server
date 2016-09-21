var fs = require('fs');
var db = require('./db/db.js');

var files = fs.readdirSync(__dirname + '/models');

var js_files = files.filter((f) => {
    return f.endsWith('.js');
}, files);

module.exports = {};

js_files.forEach(function(f) {
    console.log('import model from file %s ...', f);
    var name = f.substring(0, f.length - 3);
    module.exports[name] = require(__dirname + '/models/' + f);
})

module.exports.sync = (obj) => {
    db.sync(obj);
};