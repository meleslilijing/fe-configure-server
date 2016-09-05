var path = require('path');
var fs = require('fs');

var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var pagesDir = path.join(__dirname, 'client/pages');

function getFilesList(dir) {
	var files = fs.readdirSync(dir);

	var result = {};

	files.forEach(function(file) {
		var ext = path.extname(file);
		var name = path.basename(file, ext);
		result[name] = path.join(pagesDir, file)
	})

	return result;
}

function getEntrys(pages) {
	var entrys = pages;

	return Object.assign({vendors: ['react', 'react-dom']}, entrys);
}

// return example.jsx
var pages = getFilesList(pagesDir);

// return {
// 		example: { "xxx/xx/example.js" },
// 		vendors: [ 'react', 'react-dom' ]
// }
var entrys = getEntrys(Object.assign({}, pages));

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
