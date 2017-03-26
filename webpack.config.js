let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let NpmInstallPlugin = require('npm-install-webpack-plugin');
let SystemBellPlugin = require('system-bell-webpack-plugin');
let DashboardPlugin = require('webpack-dashboard/plugin');


const nodeEnv = process.env.NODE_ENV || 'development';
const apiPortEnv = process.env.API_PORT_WEBPACK || '3000'
const apiPort = parseInt(apiPortEnv);
const webpackDevPortEnv = process.env.WEBPACK_DEV_PORT || '9000';
const webpackDevPort = parseInt(webpackDevPortEnv);

// 0.0.0.0 for external connections/all interfaces.
// I.e in vagrant or forwarding from android
const webPackDevHost = process.env.WEBPACK_DEV_HOST || 'localhost';

const isProduction = nodeEnv === 'production';

let conf = {
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
        use: ['react-hot-loader/webpack', 'babel-loader']
      },
      {
        test: /\.(sass|scss)$/,
        use: []
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: isProduction
          }
        }]
      }
    ],
  },
  devServer: {
    compress: true,
    proxy: {
      '/api': {
        target: `http:localhost:${apiPort}`,
        secure: false
      }
    },
    port: webpackDevPort,
    host: webPackDevHost
  },
  resolve: {
    modules: [path.resolve(__dirname, './src'), 'node_modules'],
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: __dirname,
      verbose: true,
      dry: false,
    }),
    new NpmInstallPlugin({
      // Use --save or --save-dev 
      dev: false,
      // Install missing peerDependencies 
      peerDependencies: true,
      quiet: false
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: 'body'
    }),
    new SystemBellPlugin(),
    new DashboardPlugin()
  ]
};

if (!isProduction) {
  conf.plugins.push(new webpack.HotModuleReplacementPlugin());
  conf.plugins.push(new webpack.NamedModulesPlugin());
  conf.devServer.hot = true;
}


module.exports = conf;