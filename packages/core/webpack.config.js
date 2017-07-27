const _ = require('lodash');

module.exports = require('../../scripts/webpackFactory')({
  entry: _.pickBy({
    'yubaba-core': './src/index',
    'app.move': process.env.NODE_ENV !== 'production' && './test/examples/move/app',
  }, Boolean),
  path: './dist',
  filename: '[name].js',
  library: 'yubaba',
});
