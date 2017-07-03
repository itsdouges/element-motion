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
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/,
          loader: 'file-loader',
          exlude: /node_moduels/,
        },
      ],
    },
    resolve: {
      extensions: [
        '',
        '.js',
      ],
    },
    devServer: Object.assign({
      publicPath: '/',
    }, params.devServer),
    plugins: params.plugins,
  };

  if (params.loaders) {
    config.module.loaders = config.module.loaders.concat(params.loaders);
  }

  return config;
};
