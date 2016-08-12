var path = require('path');

var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var clientDir = path.join(__dirname, 'client');
var clientSourceDir = path.join(clientDir, 'src');
var clientTargetDir = path.join(clientDir, 'dist');

module.exports = {
	entry: {
		index: path.join(clientSourceDir, 'index.js'),
		project_list: path.join(clientSourceDir, 'project_list.js'),
		vendors: [
			'react',
			'react-dom'
		]
	},
	output: {
		path: clientTargetDir,
		filename: '[name].js',
		publicPath: './',
		chunkFilename: 'js/[id].chunk.js'
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
			loader: 'url?limit=10240&name=/img/[hash:8].[name].[ext]'
		}, {
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			loader: 'babel',
			query: {
				presets: ['es2015', 'react']
			}
		}],
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin('vendors', 'common_index.js'),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new webpack.NoErrorsPlugin(),
		new HtmlwebpackPlugin({
			filename: path.join(clientDir, 'html/index.html'),
			template: path.join(clientDir, 'template/index.html'),
			title: '首页',
			chunks: ['index', 'vendors'],
		}),
		new HtmlwebpackPlugin({
			filename: path.join(clientDir, 'html/project_list.html'),
			template: path.join(clientDir, 'template/project_list.html'),
			title: '项目列表',
			chunks: ['project_list', 'vendors']
		}),
		new webpack.DefinePlugin({ // inject node variable
			'process.env': {
				'NODE_ENV': '"product"'
			}
		})
	]
};
