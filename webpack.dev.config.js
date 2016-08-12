var webpack = require('webpack');
var path = require('path');

var clientDir = path.join(__dirname, 'client');
// var clientSourceDir = path.join(clientDir, 'src');
// var clientTargetDir = path.join(clientDir, 'dist');

module.exports = {
  entry: [
    'webpack-hot-middleware/client?reload=true&timeout=20000&quiet=true',
    './client/src/index.js',
    './client/src/project_list.js'
  ],
  output: {
    path: clientDir,
    filename: '[name].js',
    publicPath: '/static/'
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(png|jpg|jpeg|gif)$/,
      loader: 'url-loader?limit=10240', // 10kb
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
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({ // inject node variable
      'process.env': {
        'NODE_ENV': "'dev'"
      }
    })
  ]
};
