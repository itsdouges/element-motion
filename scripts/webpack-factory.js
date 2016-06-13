const webpack = require('webpack');

module.exports = (params) => {
  const config = {
    entry: params.entry,
    output: {
      path: params.path,
      filename: params.filename,
      library: params.library,
      libraryTarget: 'umd',
    },
    devtool: 'cheap-module-source-map',
    eslint: {
      configFile: '../../.eslintrc',
    },
    module: {
      preLoaders: [
        {
          test: /\.js$/, 
          loader: 'eslint', 
          exclude: /node_modules/,
        },
      ],
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      modulesDirectories: [
        'node_modules',
        'src',
      ],
      extensions: [
        '',
        '.js'
      ],
    },
    devServer: {
      publicPath: '/dist/',
    },
  };

  if (params.loaders) {
    config.module.loaders = config.module.loaders.concat(params.loaders);
  }

  return config;
};
