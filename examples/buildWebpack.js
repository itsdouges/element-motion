const webpack = require('webpack');
const buildConfig = require('../scripts/webpackFactory');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PORT = '2222';

const makeTestPage = (name) => ({
  entry: {
    [name]: ['promise', 'web-animations-js', `./examples/${name}`],
    links: './examples/links',
  },
  output: {
    path: `${__dirname}/../docs/examples/${name}`,
    filename: '[name].js',
    // NOTE: Public path needs to be prefixed with /yubaba when building
    // for github docs. When running locally though, we need to remove it.
    // Need to think up a better solution in the long run.
    publicPath: process.env.EXAMPLE ? '/' : `/yubaba/examples/${name}/`,
  },
  devServer: {
    publicPath: '/',
    port: PORT,
  },
  resolve: {
    alias: {
      'yubaba-core': `${__dirname}/../packages/core/src`,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: `${name} | yubaba`,
      template: './examples/index.html',
    }),
    new webpack.ProvidePlugin({
      Promise: 'promise',
    }),
  ],
});

module.exports = (name) => buildConfig(makeTestPage(name));
