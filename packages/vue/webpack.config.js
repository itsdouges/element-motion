const buildConfig = require('../../scripts/webpackFactory');

module.exports = buildConfig({
  entry: {
    'vue-yubaba': './src/index',
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js',
    library: 'vueYubaba',
    libraryTarget: 'umd',
  },
  externals: {
    react: {
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
      root: 'Vue',
    },
    'yubaba-core': {
      commonjs: 'yubaba-core',
      commonjs2: 'yubaba-core',
      amd: 'yubaba',
      root: 'yubaba',
    },
  },
  devtool: 'cheap-module-source-map',
});
