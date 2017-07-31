const buildConfig = require('../scripts/webpackFactory');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PORT = '3000';

const makeTestPage = (name) => ({
  entry: {
    [name]: `./examples/${name}`,
  },
  path: `${__dirname}/../docs/examples/${name}`,
  filename: '[name].js',
  devServer: {
    publicPath: '/',
    port: PORT,
  },
  plugins: [
    new HtmlWebpackPlugin(),
  ],
});

const config = makeTestPage(process.env.EXAMPLE);

module.exports = buildConfig(config);
module.exports.make = (name) => buildConfig(makeTestPage(name));
