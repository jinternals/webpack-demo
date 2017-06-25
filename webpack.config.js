var path 						= require("path");
var webpack 					= require('webpack');
var HtmlWebpackPlugin 			= require('html-webpack-plugin');
var CleanWebpackPlugin 			= require('clean-webpack-plugin');
var DashboardPlugin 			= require('webpack-dashboard/plugin');
var OpenBrowserWebpackPlugin 	= require('open-browser-webpack-plugin');

const PATHS = {
    appSourcePath: path.resolve(__dirname, './app/'),
    appDistPath: path.resolve(__dirname, './dist/')
};

const DEV_SERVER_CONFIG = {
    port:8081
};

module.exports = {
  devtool: 'inline-source-map',
  context: PATHS.appSourcePath,	
  entry:{
        vendor: ['lodash' ],
        index: './index.js'	
    },
  output: {
      filename: '[name].[chunkhash].js',
      sourceMapFilename: '[name].[chunkhash].map',
      path: PATHS.appDistPath
  },
  module: {
        loaders: [
           { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
  },
  plugins: [
   new webpack.optimize.CommonsChunkPlugin({ 
                name: 'vendor', 
                filename: 'vendor.[chunkhash].js', 
                minChunks: Infinity 
    }),
    new DashboardPlugin(),
    new CleanWebpackPlugin([PATHS.appDistPath]),
  	new HtmlWebpackPlugin({ template: './index.html', inject: 'body' }),
  	new OpenBrowserWebpackPlugin({ url: 'http://localhost:' + DEV_SERVER_CONFIG.port })
  ],
  devServer: {
            port: DEV_SERVER_CONFIG.port,
  }
};
