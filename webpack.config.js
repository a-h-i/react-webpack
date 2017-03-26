let path = require('path');
let webpack = require('webpack');
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
      }
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, "./src"),
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
    
  ]
};

if(nodeEnv === 'development') {
  conf.plugins.push(new webpack.HotModuleReplacementPlugin());
  conf.plugins.push(new webpack.NamedModulesPlugin());
  conf.devServer.hot = true;
}


module.exports = conf;