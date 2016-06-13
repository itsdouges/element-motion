module.exports = (params) => {
  params.webpack = {
    ...params.webpack, 
    devtool: 'cheap-module-source-map',
    entry: undefined,
  };

  (config) => {
    config.set({
      files: params.files,
      preprocessors: params.preprocessors,
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
      webpack: params.webpack,
      webpackMiddleware: {
        noInfo: true
      },
    });
  };
};
