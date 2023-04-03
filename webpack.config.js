const dotenv = require("dotenv");
const webpack = require("webpack");
const env = dotenv.config().parsed;

module.exports = {
  // 他の設定
  plugins: [
    new webpack.ProvidePlugin({
      "process.env": JSON.stringify(env),
    }),
  ],
};
