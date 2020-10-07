const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { StatsWriterPlugin } = require("webpack-stats-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const isOffline = !!process.env.IS_OFFLINE;

const babelOptions = {
  // Don't use .babelrc here but web browser optimized settings
  presets: [
    [
      "@babel/preset-env",
      {
        targets: { browsers: ["last 2 versions"] },
        // debug: isOffline,
      },
    ],
    "@babel/preset-typescript",
    "@babel/preset-react",
  ],
};

module.exports = {
  entry: {
    main: path.join(__dirname, "src/browser/index.tsx"),
  },
  target: "web",
  mode: isOffline ? "development" : "production",
  devServer: {
    contentBase: path.join(__dirname, "public"),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
    },
  },
  performance: {
    // Turn off size warnings for entry points
    hints: false,
  },
  devtool: "nosources-source-map",
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: isOffline ? "index.css" : "index.[contenthash:8].css",
    }),
    new StatsWriterPlugin({
      transform(data, opts) {
        const assets = data.assetsByChunkName.main;
        const stats = JSON.stringify(
          {
            main: assets.find((path) => path.endsWith(".js")),
            css: assets.find((path) => path.endsWith(".css")),
          },
          null,
          2,
        );
        return stats;
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/, // we shouldn't need processing `node_modules`
        use: [
          {
            loader: "babel-loader",
            options: babelOptions,
          },
        ],
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: babelOptions,
          },
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$/,
        use: "url-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: isOffline ? "index.js" : "index.[contenthash:8].js",
  },
};
