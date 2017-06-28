module.exports = require('../../scripts/webpack-factory')({
  entry: {
    'yubaba-react': './src/index',
    'app.move': './test/examples/move',
    'app.expand-and-move': './test/examples/expand-and-move',
  },
  path: './dist',
  filename: '[name].js',
  library: 'yubabaReact',
});
