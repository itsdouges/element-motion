module.exports = require('../../scripts/webpack-factory')({
  entry: {
    'yubaba-react': './src/index',
    'app.move': './test/examples/move/app',
  },
  path: './dist',
  filename: '[name].js',
  library: 'yubabaReact',
});
