var _                           = require('lodash');
var chalk                       = require('chalk');
var path 						= require("path");
var webpack 					= require('webpack');
var HtmlWebpackPlugin 			= require('html-webpack-plugin');
var CleanWebpackPlugin 			= require('clean-webpack-plugin');
var DashboardPlugin 			= require('webpack-dashboard/plugin');
var OpenBrowserWebpackPlugin 	= require('open-browser-webpack-plugin');


const PATHS = {
    appSourcePath: path.resolve(__dirname, './app/'),
    appDistPath: path.resolve(__dirname, './dist/'),
    appBuildPath: path.resolve(__dirname, './build/')

};

const DEV_SERVER_CONFIG = {
    port:8081
};

var TARGET = process.env.ENV || 'BUILD';

var PARAMS_DEFAULT = {
    context: PATHS.appSourcePath,	
    entry:{
        vendor: ['lodash' ],
        index: './index.js'	
    },
    output: {
      filename: '[name].[chunkhash].js',
      sourceMapFilename: '[name].[chunkhash].map',
    },
    plugins: [
     new HtmlWebpackPlugin({template: './index.html', inject: 'body'}),
     new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.[chunkhash].js', minChunks: Infinity })
    ],
    overlay: {
        errors: true,
        warnings: true,
    },
};

var PARAMS_PER_TARGET = {

    DEV: {
        devtool: 'inline-source-map',
        output: {
            filename: '[name].js',
        },
        plugins:[
            new DashboardPlugin(),
            new OpenBrowserWebpackPlugin({ url: 'http://localhost:' + DEV_SERVER_CONFIG.port }),
            new webpack.WatchIgnorePlugin([ path.join(__dirname, 'node_modules') ]),
        ],
        devServer: { port: DEV_SERVER_CONFIG.port }
    },
    BUILD: {
        devtool: 'source-map',
        output: {
            path: PATHS.appBuildPath,
        },
        plugins:[
            new CleanWebpackPlugin([PATHS.appBuildPath])
        ]
    },
    DIST: {
        output: {
            path: PATHS.appDistPath,
        },
        plugins:[
            new CleanWebpackPlugin([PATHS.appDistPath]),
            new webpack.optimize.UglifyJsPlugin()
        ]    
    }
};

var params = _.mergeWith(PARAMS_DEFAULT, PARAMS_PER_TARGET[TARGET], _mergeArraysCustomizer);

_printBuildInfo(params);

module.exports = {
  context: PATHS.appSourcePath,	
  devtool: params.devtool,
  entry: params.entry,
  output: params.output,
  plugins: params.plugins,
  devServer: params.devServer,
  module: {
        loaders: [
           { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
  }
};


function _printBuildInfo(params) {
  console.log('\nStarting ' + chalk.bold.green('"' + TARGET + '"') + ' build');
  if (TARGET === 'DEV') {
    console.log('Dev server: ' +
      chalk.bold.yellow('http://localhost:' + params.devServer.port + '/index.html') + '\n\n');
  } else {
    console.log('\n\n');
  }
}

function _mergeArraysCustomizer(a, b) {
  if (_.isArray(a)) {
    return a.concat(b);
  }
}
