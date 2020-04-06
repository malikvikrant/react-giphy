var path = require("path");
var webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");

var config = {
  entry: {
    index: [path.resolve(__dirname, "index.jsx")],
    vendor: ["react", "react-dom", "react-redux", "redux", "redux-thunk"],
  },
  output: {
    path: path.resolve(__dirname, "dist/static"),
    filename: "index.[hash].js",
    chunkFilename: "[name].index.[hash].js",
    publicPath: "/static/",
  },
  resolve: {
    extensions: [".js", ".jsx", ".scss", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: false,
        default: false,
        vendor: {
          name: "vendor",
          chunks: "all",
          test: /node_modules/,
          priority: 20,
        },
      },
    },
    minimizer: [
      new UglifyJSPlugin({
        sourceMap: true,
        uglifyOptions: {
          compress: {
            unused: true,
            dead_code: true,
          },
          warnings: false,
          ie8: true,
        },
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
    new Dotenv(),
    new HtmlWebPackPlugin({
      title: "Giphy",
      template: "./index.html",
    }),
  ],
};

module.exports = config;
