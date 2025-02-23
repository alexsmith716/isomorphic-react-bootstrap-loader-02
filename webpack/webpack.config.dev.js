const webpack = require('webpack');
const path = require('path');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsConfig = require('./webpack.config.isomorphic');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const bootstrapEntryPoints = require('./webpack.bootstrap.config');

const PUBLIC_PATH = `/${process.env.PUBLIC_PATH || ''}/`.replace('//', '/');

console.log('>>>>>>> webpack.config.dev.js > process.env.BOOTSTRAPRC_LOCATION <<<<<<<<: ', process.env.BOOTSTRAPRC_LOCATION);
console.log('>>>>>>> webpack.config.dev.js > process.env.NODE_ENV <<<<<<<<: ', process.env.NODE_ENV);

module.exports = {
  
  devtool: 'cheap-module-eval-source-map',

  extensions: ['.js', '.jsx', '.scss', '.css'],

  entry: {
    app: [
      'eventsource-polyfill',
      'webpack-hot-middleware/client',
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      'babel-polyfill',
      'isomorphic-fetch',
      bootstrapEntryPoints.dev,
      path.join(__dirname, '../client/index.js')
    ],
    vendor: ['react', 'react-dom', 'draft-js', 'react-draft-wysiwyg']
  },

  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: process.env.NODE_ENV !== 'production' ? `/` : PUBLIC_PATH
  },

  module: {
    loaders: [
      {
        test: /\.jsx*$/,
        exclude: [/node_modules/, /.+\.config.js/],
        loader: 'babel-loader'
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/i,
        loader: 'url-loader?limit=10000'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]',
          'postcss-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader?modules&importLoaders=2&localIdentName=[name]__[local]__[hash:base64:5]',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000',
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: 'file-loader',
      },
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/\/iconv-loader$/),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: '[name].[hash].js'
    }),

    new webpack.DefinePlugin({
      'process.env': {
        CLIENT: JSON.stringify(true),
        NODE_ENV: JSON.stringify('development'),
        PUBLIC_PATH: JSON.stringify(PUBLIC_PATH),
        HOST: JSON.stringify('localhost'),
        PROTOCOL: JSON.stringify('http'),
        PORT: JSON.stringify('8000')
      },
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true
    }),

    new WebpackIsomorphicToolsPlugin(webpackIsomorphicToolsConfig).development(),

    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerPort: 8888,
      defaultSizes: 'parsed',
      openAnalyzer: false,
      generateStatsFile: false
    })
  ]
};