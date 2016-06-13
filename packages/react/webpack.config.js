module.exports = require('../../scripts/webpack-factory')({
  entry: [
    './index',
  ],
  path: './dist',
  filename: 'mt-react.js',
  library: 'mtReact',
});
