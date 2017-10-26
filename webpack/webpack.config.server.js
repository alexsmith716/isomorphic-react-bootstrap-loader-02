// prettier-ignore
const fs = require('fs');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

console.log('>>>>>>> webpack.config.server.js > process.env.BOOTSTRAPRC_LOCATION <<<<<<<<: ', process.env.BOOTSTRAPRC_LOCATION);
console.log('>>>>>>> webpack.config.server.js > process.env.NODE_ENV <<<<<<<<: ', process.env.NODE_ENV);
console.log('>>>>>>> webpack.config.server.js > process.env.BABEL_DISABLE_CACHE <<<<<<<<: ', process.env.BABEL_DISABLE_CACHE);

module.exports = {

  entry: path.join(__dirname, '../server/server.js'),

  output: {
    path: path.join(__dirname, '../build/server'),
    filename: 'server.bundle.js',
    publicPath: '/build/server/'
  },

  target: 'node',

  node: {
    __filename: true,
    __dirname: true
  },

  externals: [
    nodeExternals({
      importType: 'commonjs'
    })
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', ['es2015', { modules: false }], 'stage-0'],
          plugins: [
            ['css-modules-transform', {
              preprocessCss: './loaders/sassLoader.js',
              generateScopedName: '[name]__[local]__[hash:base64:5]',
              extensions: ['.css', '.scss']
            }],
            ['transform-decorators-legacy']
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

/*
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
                preprocessCss: './loaders/sassLoader.js',
                generateScopedName: '[name]__[local]__[hash:base64:5]',
                extensions: ['.css', '.scss']
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
*/