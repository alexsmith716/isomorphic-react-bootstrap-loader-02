// prettier-ignore
const fs = require('fs');
const path = require('path');
// webpack-node-externals: exclude node modules
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: path.join(__dirname, '../server/server.js'),
  output: {
    path: path.join(__dirname, '../build/server'),
    filename: 'server.bundle.js',
    publicPath: '/build/server/'
  },

  target: 'node', // in order to ignore built-in modules like path, fs, etc.

  node: {
    __filename: true,
    __dirname: true
  },

  resolve: {
    extensions: ['*', '.js', '.jsx'],
    modules: ['client', 'node_modules']
  },

  externals: [
    nodeExternals({
      importType: 'commonjs'
    })
  ], // in order to ignore all modules in node_modules folder

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', ['es2015', { modules: false }], 'stage-0'],
          plugins: [
            [
              'transform-decorators-legacy',
              'babel-plugin-webpack-loaders',
              {
                config: './webpack/webpack.config.babel.js',
                verbose: false
              },
              'css-modules-transform', 
              {
                preprocessCss: '../loaders/sassLoader.js',
                generateScopedName: '[name]_[local]_[hash:base64:5]',
                extensions: ['.scss']
              }
            ]
          ]
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
};
