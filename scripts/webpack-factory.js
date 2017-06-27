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
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [
        '',
        '.js',
      ],
    },
    devServer: {
      publicPath: '/dist/',
    },
    plugins: params.plugins,
  };

  if (params.loaders) {
    config.module.loaders = config.module.loaders.concat(params.loaders);
  }

  return config;
};
