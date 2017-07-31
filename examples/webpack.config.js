const buildConfig = require('../scripts/webpackFactory');
const HtmlWebpackPlugin = require('html-webpack-plugin');

if (!process.env.EXAMPLE) {
  throw new Error('process.env.EXAMPLE must be defined.');
}

const PORT = '3000';

// Precondition:
// process.env.EXAMPLE should look like: "exampleName.libraryName"

const makeTestPage = (name) => ({
  entry: {
    [name]: `./examples/${name}`,
  },
  path: `${__dirname}/dist/examples/${name}`,
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
