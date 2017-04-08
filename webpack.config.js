const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: ['./src/config.js', './src/index.js', './src/auth/index.js'],
  output: {
    path: path.join(__dirname, "assets/js"),
    publicPath: 'assets/',
    filename: 'app.js'
  },
  module: {
    loaders: [
      // { test: /\.vue$/, loader: 'vue' },
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      {
        test: /\.css$/,
        loaders: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  resolve: {
    alias: {
      jquery: "jquery/src/jquery",
      jQuery: "jquery/src/jquery",
      vue: 'vue/dist/vue.js'
    }
  },
}