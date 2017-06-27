const webpack = require('webpack');

module.exports = require('../../scripts/webpack-factory')({
  entry: {
    'yubaba-react': './src/index',
    app: './test/test-page/material',
  },
  path: './dist',
  filename: '[name].js',
  library: 'yubabaReact',
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),
  ],
});
