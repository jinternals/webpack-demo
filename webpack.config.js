var path 						= require("path");
var HtmlWebpackPlugin 			= require('html-webpack-plugin');
var CleanWebpackPlugin 			= require('clean-webpack-plugin');

const PATHS = {
    appSourcePath: path.resolve(__dirname, './app/'),
    appDistPath: path.resolve(__dirname, './dist/')
};

module.exports = {
  context: PATHS.appSourcePath,	
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: PATHS.appDistPath
  },
  module: {
        loaders: [
           { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
  },
  plugins: [
    new CleanWebpackPlugin([PATHS.appDistPath]),
  	new HtmlWebpackPlugin({ template: './index.html', inject: 'body' }),
  ]
};
