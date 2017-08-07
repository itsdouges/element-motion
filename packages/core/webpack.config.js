module.exports = require('../../scripts/webpackFactory')({
  entry: {
    'yubaba-core': './src/index',
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js',
    library: 'yubaba',
    libraryTarget: 'umd',
  },
  devtool: 'cheap-module-source-map',
});
