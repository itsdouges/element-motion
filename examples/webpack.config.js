const webpack = require('webpack');
const buildConfig = require('../scripts/webpackFactory');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PORT = '2222';

const makeTestPage = (name) => ({
  entry: {
    [name]: ['promise', 'web-animations-js', `./examples/${name}`],
    links: './examples/links',
  },
  noLib: true,
  path: `${__dirname}/../docs/examples/${name}`,
  // NOTE: Public path needs to be prefixed with /yubaba when building
  // for github docs. When running locally though, we need to remove it.
  // Need to think up a better solution in the long run.
  publicPath: process.env.EXAMPLE ? '/' : `/yubaba/examples/${name}/`,
  filename: '[name].js',
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
    }),
    new webpack.ProvidePlugin({
      Promise: 'promise',
    }),
  ],
});

const config = makeTestPage(process.env.EXAMPLE);

module.exports = buildConfig(config);
module.exports.make = (name) => buildConfig(makeTestPage(name));
