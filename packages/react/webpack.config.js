const buildConfig = require('../../scripts/webpackFactory');

module.exports = buildConfig({
  entry: {
    'react-yubaba': './src/index',
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js',
    library: 'reactYubaba',
    libraryTarget: 'umd',
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React',
    },
    'yubaba-core': {
      commonjs: 'yubaba-core',
      commonjs2: 'yubaba-core',
      amd: 'yubaba',
      root: 'yubaba',
    },
  },
  devtool: 'cheap-module-source-map',
});
