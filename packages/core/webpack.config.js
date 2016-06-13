module.exports = require('../../scripts/webpack-factory')({
  entry: [
    './index',
  ],
  path: './dist',
  filename: 'mt-core.js',
  library: 'mtCore',
});
