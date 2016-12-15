var path = require("path");
var htmlWebpackPlugin = require("html-webpack-plugin");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var DEVELOPMENT = process.env.NODE_ENV === "development";
var PRODUCTION = process.env.NODE_ENV === "production";

//development config
var plugins = [
  new ExtractTextPlugin("css/style-[contenthash:10].css"),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new htmlWebpackPlugin({
    template: path.join(__dirname, "src", "index.html"),
    inject: "body", //default
    hash: true,
    chunks: ["common", "app"]
  }),
  new webpack.optimize.CommonsChunkPlugin({
    // name: ["common", "vendor", "webpackCode"] //order matters
    name: "common",
    filename: "common-[hash].js",
    chunks: ["vendor", "app"]
  }),
  new webpack.DefinePlugin({
    DEVELOPMENT: JSON.stringify(DEVELOPMENT),
    PRODUCTION: JSON.stringify(PRODUCTION)
  })
];

var devtool = "#sourcemap";
var cssSourceMap = "?sourcemap";
var appEntry = [
  "webpack-hot-middleware/client",
  path.join(__dirname, "src", "index.js")
];

function createConfig(isDebug) {
  if (!isDebug) {
    //config for production
    plugins.push(
      new webpack.optimize.UglifyJsPlugin()
    );

    devtool = false;
    cssSourceMap = "";
    appEntry.shift();
  }
  return {
    externals: {
      "React": "react"
    },
    devtool,
    entry: {
      app: appEntry,
      vendor: ["react"]
    },
    output: {
      path: path.join(__dirname, "dist"),
      filename: "[name].[chunkhash].bundle.js"
    },
    plugins,
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: "babel-loader",
          include: path.join(__dirname, "src")
            // query: {
            //   presets: ["react-hmre"]
            // }
        },
        {
          test: /\.js$/,
          loader: "eslint-loader",
          exclude: /node_modules/
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract({
            fallbackLoader: "style-loader",
            loader: ["css-loader" + cssSourceMap,"sass-loader" + cssSourceMap]

          }),
          include: path.join(__dirname, "src")
        },
        {
          test: /\.(png|jpg|jpeg|gif|woff|ttf|eot|svg|woff2)/,
          loader: "url-loader?limit=10000&name=images/[hash:12].[ext]",
          exclude: /node_modules/
        }
      ]
    }
  };
}

module.exports = createConfig(true);
