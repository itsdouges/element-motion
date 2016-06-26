module.exports = require('../../scripts/karma-factory')({
  webpack: require('./webpack.config'),
  files: [
    './test/unit.spec.js',
  ],
  preprocessors: {
    './test/unit.spec.js': ['webpack'],
  },
});
