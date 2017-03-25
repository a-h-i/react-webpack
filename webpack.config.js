let path = require('path');
let webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, "./src"),
  entry: {
    app: './main.js'
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: '[name].js' 
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: 'babel-loader'
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, "./src")
  },
  resolve: {
    modules: [path.resolve(__dirname, './src'), 'node_modules']
  }
}