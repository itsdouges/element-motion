module.exports = require('../../scripts/karma-factory')({
  webpack: require('./webpack.config'),
  files: [
    './tests/unit.spec.js',
  ],
  preprocessors: {
    './tests/unit.spec.js': ['webpack'],
  },
});
