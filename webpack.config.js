const webpack = require('webpack');

module.exports = {
  entry: [
    './src',
  ],
  output: {
    path: `./dist`,
    filename: 'material-transitions-core.js',
    library: 'MaterialTransitionsCore',
    libraryTarget: 'umd',
  },
  devtool: 'cheap-module-source-map',
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
    modulesDirectories: ['node_modules', 'src'],
    extensions: ['', '.js']
  },
  devServer: {
    publicPath: '/dist/',
  },
};
