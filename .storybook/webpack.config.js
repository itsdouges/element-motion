const path = require("path");

module.exports = {
  resolve: {
    extensions: [".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      {
        test: /\.tsx$/,
        loader: "ts-loader",
        include: path.resolve(__dirname, "../packages"),
        exclude: ["node_modules"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: ["node_modules"]
      }
    ]
  }
};
