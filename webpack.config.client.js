const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path');

const baseConfig = require('./webpack.config.base.js')

const CopyWebpackPlugin = require('copy-webpack-plugin');
const pug = require('pug');

module.exports = merge(baseConfig, {
  entry: './src/entry-client.js',
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'index.js'
  },
  plugins: [

    new CopyWebpackPlugin([
    { from: 'src/index.jade',
      to: "index.html",
      transform: function(content, path) {
        return pug.render(content, {
          pretty: false,
          compileDebug: false
        });
      }
    },
    { from: 'src/404.jade',
      to: "404.html",
      transform: function(content, path) {
        return pug.render(content, {
          pretty: false,
          compileDebug: false
        });
      }
    },
  ])]
});

