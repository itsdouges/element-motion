const buildConfig = require('../../scripts/webpackFactory');

const lib = {
  entry: {
    'yubaba-react': './src/index',
  },
  externals: {
    react: {
      commonjs: 'react',
      amd: 'react',
      root: 'React',
    },
    'yubaba-core': {
      commonjs: 'yubaba-core',
      amd: 'yubaba',
      root: 'yubaba',
    },
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
  process.env.NODE_ENV !== 'production' && makeTestPage('dark-side'),
].filter(Boolean);

module.exports = Array.isArray(config) ? config.map(buildConfig) : buildConfig(config);
