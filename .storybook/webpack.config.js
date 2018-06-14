const path = require('path');

module.exports = {
  mode: 'development',

  devtool: 'inline-source-map',

  resolve: {
    extensions: ['.tsx', '.js', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.tsx$/,
        loader: 'ts-loader',
        include: path.resolve(__dirname, '../packages'),
        exclude: ['node_modules'],
        options: {
          transpileOnly: true,
        },
      },
      {
        test: /\.(jpg|gif|png|jpeg|webp)$/,
        loader: 'file-loader',
        include: path.resolve(__dirname, '../packages'),
        exclude: ['node_modules'],
      },
    ],
  },
};
