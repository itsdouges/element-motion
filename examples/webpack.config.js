const buildConfig = require('../scripts/webpackFactory');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PORT = '2222';

const makeTestPage = (name) => ({
  entry: {
    [name]: `./examples/${name}`,
  },
  noLib: true,
  path: `${__dirname}/../docs/examples/${name}`,
  publicPath: process.env.EXAMPLE ? '/' : `/examples/${name}/`,
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
    new HtmlWebpackPlugin(),
  ],
});

const config = makeTestPage(process.env.EXAMPLE);

module.exports = buildConfig(config);
module.exports.make = (name) => buildConfig(makeTestPage(name));
