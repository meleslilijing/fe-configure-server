var path = require('path');

var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var client_dir = path.join(__dirname, 'client');
var client_source_dir = path.join(client_dir, 'src');
var client_target_dir = path.join(client_dir, 'dist');

module.exports = {
	entry: {
		index: path.join(client_source_dir, 'index.js'),
		vendors: [
			'react',
			'react-dom'
		]
	},
	output: {
		path: client_target_dir,
		filename: '[name].js',
    publicPath: './'
	},
	resolve: {
		extensions: ['', '.js', '.jsx'],
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg)$/,
                loader: 'url?limit=10240&name=/img/[hash:8].[name].[ext]'
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ['es2015', 'react']
				}
			}
		],
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin('vendors', 'common_index.js'),
		new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
        new webpack.NoErrorsPlugin(),
		new HtmlwebpackPlugin({
			filename: path.join(client_dir, 'html/index.html'),
			template: path.join(client_dir, 'template/index.html'),
			title: '首页'
		}),
		new webpack.DefinePlugin({  // inject node variable
            'process.env': {
            	'NODE_ENV': '"product"'
            }
        })
	]
};
