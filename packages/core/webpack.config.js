module.exports = require('../../scripts/webpack-factory')({
  entry: [
    './src/index',
  ],
  path: './dist',
  filename: 'yubaba-core.js',
  library: 'yubaba',
});
