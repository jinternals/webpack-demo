var path 						= require("path");
var HtmlWebpackPlugin 			= require('html-webpack-plugin');

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
  plugins: [
  	new HtmlWebpackPlugin({ template: './index.html', inject: 'body' }),
  ]
};
