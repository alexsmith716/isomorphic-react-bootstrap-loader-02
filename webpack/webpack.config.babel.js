
let cssModulesIdentName = '[name]__[local]__[hash:base64:5]';
if (process.env.NODE_ENV === 'production') {
  cssModulesIdentName = '[hash:base64]';
}

console.log('>>>>>>>> webpack.config.babel.js <<<<<<<<<<<<<<');

module.exports = {

  output: {
    publicPath: '/',
    libraryTarget: 'commonjs2'
  },


  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['client', 'node_modules']
  },

  module: {
    loaders: [
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$/i,
        loader: 'url-loader?limit=10000'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader?localIdentName=' + cssModulesIdentName + '&modules&importLoaders=1&sourceMap!postcss-loader',
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader?localIdentName=' + cssModulesIdentName + '&modules&importLoaders=1&sourceMap!postcss-loader!sass-loader',
      },
    ]
  }

};