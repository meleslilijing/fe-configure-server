var path = require('path');
var fs = require('fs');
var child_process = require('child_process');

var gulp = require('gulp');
var shell = require('gulp-shell');

var WEBPACK_CONFIG_PATH = 'webpack.config.js';
var WEBPACK_DEV_CONFIG_PATH = 'webpack.dev.config.js';

var client_dir = path.join(__dirname, 'client');
var html_dir = path.join(client_dir, 'html');
var dist_dir = path.join(client_dir, 'dist');

gulp.task('default', function() {
	// console.log('gulp dev - 启动开发环境: http://localhost:8080')
	// console.log('gulp build - 文件编译打包: html: ./html js: ./dist')
	// console.log('gulp test - mocha' )
});

gulp.task('dev', function() {
	return gulp.src(WEBPACK_DEV_CONFIG_PATH, { read: false })
			.pipe(shell([
				'node ./client/mock/server.js'
			]));
});

gulp.task('build', /*['_clean']*/, function() {
	return gulp.src(WEBPACK_CONFIG_PATH, { read: false })
			.pipe(shell([
				'webpack --progress --profile --colors --config webpack.config.js'
			]));
});

gulp.task('test', function() {
	console.log('please run shell : mocha');
});

// 清空遗留的编译后文件 ./dist/* 和 ./html/*
gulp.task('_clean', function() {
	var rm_js_path = path.join(dist_dir, '/*');
	var rm_html_path = path.join(html_dir, '/*');

	var rm_shell = [];

	var js_files = fs.readdirSync(dist_dir);
	var html_files = fs.readdirSync(html_dir);

	if(html_files.length > 0) {
		rm_shell.push('rm -rf ' + rm_html_path);
	}

	if(js_files.length > 0) {
		rm_shell.push('rm -rf ' + rm_js_path);
	}

	console.log(rm_shell);

	return gulp.src(WEBPACK_CONFIG_PATH, { read: false })
			.pipe(shell(rm_shell));
});
