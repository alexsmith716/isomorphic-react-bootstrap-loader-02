
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
/*
module.exports = {
  webpack_assets_file_path: 'webpack/webpack-assets.json',
  assets: {
    images: {
      extensions: ['jpg', 'png', 'gif', 'svg'],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    }
  },
  modulesDirectories: ['node_modules'],
  patch_require: false
};
*/

console.log('>>>>>>>> webpack.config.isomorphic.js <<<<<<<<<<<<');

module.exports = {

  webpack_assets_file_path: 'webpack/webpack-assets.json',

  assets: {
    images: {
      extensions: ['jpg', 'png', 'gif', 'svg'],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    },
    fonts: {
      extensions: [ 'woff', 'woff2', 'ttf', 'eot' ],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser,
    },
    style_modules: {

      extensions: ['css', 'scss'],

      filter: function(module, regex, options, log) {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.style_loader_filter(module, regex, options, log);
        } else {
          return regex.test(module.name);
        }
      },
      path: function(module, options, log) {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.style_loader_path_extractor(module, options, log);
        } else {
          return module.name;
        }
      },
      parser: function(module, options, log) {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.css_modules_loader_parser(module, options, log);
        } else {
          return module.source;
        }
      },
    },
  },

  modulesDirectories: ['node_modules'],

  patch_require: false
};
