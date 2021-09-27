const webpack = require("webpack");
const path = require('path');

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/'
   },
  devServer: {
    proxy: {
      "/api": "http://localhost:3000",
      "/auth": "http://localhost:3000"
    },
    historyApiFallback: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.name": JSON.stringify("Vishwas"),
    }),
  ],
};
