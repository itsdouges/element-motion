const buildConfig = require('../../scripts/webpack-factory');

const lib = {
  entry: {
    'yubaba-react': './src/index',
  },
  path: './dist',
  filename: '[name].js',
  library: 'yubabaReact',
};

const makeTestPage = (name) => ({
  entry: {
    [`app.${name}`]: `./test/examples/${name}`,
  },
  path: './dist',
  filename: '[name].js',
  devServer: {
    publicPath: `/test/examples/${name}`,
  },
});

const config = process.env.EXAMPLE ? makeTestPage(process.env.EXAMPLE) : [
  lib,
  makeTestPage('dark-side'),
];

module.exports = Array.isArray(config) ? config.map(buildConfig) : buildConfig(config);
