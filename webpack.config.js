var path = require("path");
var htmlWebpackPlugin = require("html-webpack-plugin");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var purify = require("purifycss-webpack-plugin");

var DEVELOPMENT = process.env.NODE_ENV === "development";
var PRODUCTION = process.env.NODE_ENV === "production";

var devtool, appEntry, loader, filename;
var hints = false; // eslint-disable-line no-unused-vars

//common config
var plugins = [
  new htmlWebpackPlugin({
    template: path.join(__dirname, "src", "index.html"),
    inject: "body", //default
    hash: true
    // chunks: ["common", "app"]
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: ["common", "vendor", "webpack"] //order matters
  }),
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery"
  }),
  new webpack.DefinePlugin({
    DEVELOPMENT: JSON.stringify(DEVELOPMENT),
    PRODUCTION: JSON.stringify(PRODUCTION)
  })
];

function createConfig(isDebug) {
  // config for development
  if(isDebug) {
    plugins.push(
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    );
    devtool = "#source-map";
    appEntry = [
      "webpack-hot-middleware/client",
      path.join(__dirname, "src", "index.js")
    ];
    loader = "style-loader!css-loader?sourcemap!sass-loader?sourcemap";
    filename = "[name].bundle.js";
  }
  else {
    //config for production
    plugins.push(
      new webpack.optimize.UglifyJsPlugin(),
      new ExtractTextPlugin("css/style-[contenthash:10].css"),
      new purify({
        basePath: __dirname,
        paths: [
          path.join(__dirname, "dist", "index.html")
        ],
        purifyOptions: {
          minify: true
        }
      })
    );

    devtool = false;
    appEntry = path.join(__dirname, "src", "index.js");
    loader = ExtractTextPlugin.extract({
      fallbackLoader: "style-loader",
      loader: ["css-loader?minimize", "sass-loader"]
    });
    hints = true;
    filename = "[name].[hash].bundle.js";
  }
  return {
    devtool,
    entry: {
      app: appEntry,
      vendor: [
        "react",
        "react-dom",
        "react-router",
        "react-redux",
        "redux",
        "redux-thunk",
        "redux-promise-middleware",
        "jquery",
        "classnames",
        "axios",
        "lodash",
        "moment"
      ]
    },
    output: {
      path: path.join(__dirname, "dist"),
      filename
    },
    plugins,
    performance: {
      hints: false
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: "babel-loader",
          include: [
            path.join(__dirname, "src"),
            path.join(__dirname, "shared")
          ],
          query: {
            presets: ["react-hmre"]
          }
        },
        {
          test: /\.js$/,
          loader: "eslint-loader",
          exclude: /node_modules/
        },
        {
          test: /\.(scss|css)$/,
          loader,
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
