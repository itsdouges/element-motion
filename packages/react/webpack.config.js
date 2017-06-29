module.exports = require('../../scripts/webpack-factory')({
  entry: {
    'yubaba-react': './src/index',
    'app.move': './test/examples/move',
    'app.expand-move': './test/examples/expand-move',
    'app.expand-move-reveal': './test/examples/expand-move-reveal',
    'app.dark-side': './test/examples/dark-side',
  },
  path: './dist',
  filename: '[name].js',
  library: 'yubabaReact',
});
