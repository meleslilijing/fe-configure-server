var webpack = require('webpack');
var path = require('path');

var client_dir = path.join(__dirname, 'client');
var client_source_dir = path.join(client_dir, 'src');
var client_target_dir = path.join(client_dir, 'dist');

module.exports = {
	entry:  [
		'webpack-hot-middleware/client?reload=true&timeout=20000&quiet=true',
    './client/src/index.js'
	],
	output: {
		path: client_dir,
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				loader: "url-loader?limit=10240",	// 10kb
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
		new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({  // inject node variable
        'process.env': {
        	'NODE_ENV': '"dev"'
        }
    })
	]
};
