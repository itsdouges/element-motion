const webpack = require('webpack');

module.exports = {
  entry: `./src/index.js`,
  output: {
    path: `./dist`,
    filename: 'material-transitions-core.js',
    library: 'MaterialTransitionsCore',
    libraryTarget: 'umd',
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/, 
        loader: 'eslint', 
        include: /src/,
      },
    ],
    loaders: [
      { 
        test: /\.js$/,
        loader: 'babel',
        include: /src/,
      }
    ]
  },
  resolve: {
    root: `${__dirname}/src`,
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js']
  },
  devServer: {
    publicPath: '/dist/',
  },
};
