const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path');
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

const baseConfig = require('./webpack.config.base.js')


module.exports = merge(baseConfig, {
  entry: './src/entry-server.js',
  output: {
    path: path.resolve(__dirname, './functions'),
    filename: 'newsletter.js',
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  externals: nodeExternals({
    whitelist: /\.css$/
  }),

  // For bundle renderer source map support
  devtool: 'source-map',
  plugins: [
    new VueSSRServerPlugin()
  ]
});

