// prettier-ignore
const fs = require('fs');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

console.log('>>>>>>> webpack.config.server.js > process.env.BOOTSTRAPRC_LOCATION <<<<<<<<: ', process.env.BOOTSTRAPRC_LOCATION);
console.log('>>>>>>> webpack.config.server.js > process.env.NODE_ENV <<<<<<<<: ', process.env.NODE_ENV);

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

  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css'],
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
            'css-modules-transform', 
            {
              preprocessCss: '../loaders/sassLoader.js',
              generateScopedName: '[name]_[local]_[hash:base64:5]',
              extensions: ['.scss']
            }
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
*/















