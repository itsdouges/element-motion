module.exports = require('../../scripts/webpack-factory')({
  entry: {
    'yubaba-core': './src/index',
    'app.move': './test/examples/move/app',
  },
  path: './dist',
  filename: '[name].js',
  library: 'yubaba',
});
