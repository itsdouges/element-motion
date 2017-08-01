module.exports = require('../../scripts/webpackFactory')({
  entry: {
    'yubaba-core': './src/index',
  },
  path: './dist',
  filename: '[name].js',
  library: 'yubaba',
  devtool: 'cheap-module-source-map',
});
