const webpack = require('webpack');

module.exports = require('../../scripts/webpack-factory')({
  entry: {
    'mt-react': './src/index',
    'material-bundle': './test/test-page/material',
  },
  path: './dist',
  filename: '[name].js',
  library: 'mtReact',
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),
  ],
});
