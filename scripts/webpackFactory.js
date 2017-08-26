const webpack = require('webpack');
const merge = require('webpack-merge');

module.exports = (params) => merge({
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(css)$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'file-loader',
        exclude: /node_moduels/,
        options: {
          name: 'assets/[name].[ext]',
        },
      },
    ],
  },
  devServer: {
    publicPath: '/',
  },
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
}, params);
