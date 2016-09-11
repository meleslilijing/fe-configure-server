var path = require('path');
var fs = require('fs');

var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var pagesDir = path.join(__dirname, 'client/pages');

function getFilesList(dir, resolve) {
	var files = fs.readdirSync(dir)

	var result = {};

	files
	.filter(function(file) {
		// 过滤入口文件的数据类型
		var ext = path.extname(file);

		for(var type = 0; type < resolve.length; type++) {
			if('.'+resolve[type] === ext) {
				return true;
			}
		}

		return false;
	})
	.forEach(function(file) {
		var ext = path.extname(file);
		var name = path.basename(file, ext);
		result[name] = path.join(pagesDir, file)
	})

	return result;
}

// function getEntrys(pages) {
// 	// var pages = Object.assign({}, pages);
//
// 	// var entrys = {};
// 	//
// 	// for(var key in pages) {
// 	// 	 var page = pages[key];
// 	// 	 if(!(page instanceof Array)) {
// 	// 		 entrys[key] = [page];
// 	// 	 }
// 	// 	 entrys[key].push("webpack-hot-middleware/client?reload=true&timeout=20000&quiet=true")
// 	// }
// 	return pages;
// }

// return example.jsx
var pages = getFilesList(pagesDir, ['js', 'jsx']);

// return {
// 		example: { "xxx/xx/example.js" },
// 		vendors: [ 'react', 'react-dom' ]
// }
var entrys = pages;

console.log('pages: ', pages);
console.log('entrys: ', entrys);

module.exports = {
	entry: entrys,
	output: {
		filename: '[name].js',
		path: path.join(__dirname, 'server/public'),
		public: '/'
	},
	resolve: {
		extensions: ['', '.js', '.jsx'],
	},
	module: {
		loaders: [{
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		}, {
			test: /\.(png|jpg|jpeg|gif|svg)$/,
			loader: 'url?limit=10240&name=/img/[hash].[name].[ext]'
		}, {
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			loader: 'babel',
			query: {
				presets: ['es2015', 'react'],
				plugins: [
					['antd', {style: 'css', libraryName:'antd'}]
				]
			}
		}],
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': '"production"'
			}
		}),
		new webpack.optimize.CommonsChunkPlugin('vendors', 'common.js'),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new webpack.NoErrorsPlugin(),
	]
};
