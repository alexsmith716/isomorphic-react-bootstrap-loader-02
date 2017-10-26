
const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
const webpackIsomorphicToolsConfig = require('./webpack/webpack.config.isomorphic');
const projectBasePath = require('path').resolve(__dirname, './');

console.log('>>>>>>>> ROOT > index.js <<<<<<<<<<<');

require('babel-register')({
  plugins: [
    [
      'babel-plugin-webpack-loaders', 
      {
        config: './webpack/webpack.config.babel.js',
        verbose: true
      },
      'css-modules-transform', 
      {
        'preprocessCss': './loaders/sassLoader.js',
        'generateScopedName': '[name]_[local]_[hash:base64:5]',
        'extensions': ['.scss']
      }
    ],
    'transform-es2015-modules-commonjs',
  ]
});

require('babel-polyfill');
require('es6-promise').polyfill();
require('isomorphic-fetch');

if (process.env.NODE_ENV === 'production') {

  global.webpackIsomorphicTools = new WebpackIsomorphicTools(webpackIsomorphicToolsConfig).server(projectBasePath, () => {

    require('./build/server/server.bundle');

  });

} else {

  global.webpackIsomorphicTools = new WebpackIsomorphicTools(webpackIsomorphicToolsConfig).server(projectBasePath, () => {

    require('./server/server');

  });

}
