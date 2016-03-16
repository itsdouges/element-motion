const webpackConfig = require('./webpack.config');
webpackConfig.devtool = 'inline-source-map';
delete webpackConfig.entry;

module.exports = (config) => {
  config.set({
    files: [
      './tests/unit.spec.js',
    ],
    preprocessors: {
      './tests/unit.spec.js': ['webpack'],
    },
    plugins: [
      'karma-phantomjs-launcher',
      'karma-mocha',
      'karma-sinon-chai',
      'karma-webpack'
    ],
    frameworks: [
      'mocha',
      'sinon-chai',
    ],
    browsers : ['PhantomJS'],
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    }
  });
};
