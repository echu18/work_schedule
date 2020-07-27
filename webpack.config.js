var path = require('path');

module.exports = {
  entry: "./frontend/work_schedule.jsx",
  output: {
    path: path.join(__dirname, "app", "assets", "javascripts"),
    filename: "./bundle.js",
  },
  module: {
    rules: [
      {
        test: [/\.jsx?$/],
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          query: {
            presets: ["@babel/env", "@babel/react"],
          },
        },
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: "url-loader?limit=100000",
      },
    ],
  },
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx", "*"],
    alias: {
      'react-grid': path.join(__dirname,"/node_modules/react-grid-layout/css/styles.css"),
      'react-resize': path.join(__dirname, "/node_modules/react-resizable/css/styles.css"),
    },
  },
};