module.exports = require('../../scripts/webpack-factory')({
  entry: [
    './src/index',
  ],
  path: './dist',
  filename: 'mt-core.js',
  library: 'mtCore',
});
