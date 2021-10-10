const path = require("path");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { StatsWriterPlugin } = require("webpack-stats-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const { HotModuleReplacementPlugin } = require("webpack");

const isOffline = !!process.env.IS_OFFLINE;

module.exports = {
  entry: {
    main: path.join(__dirname, "src/browser/index.tsx"),
  },
  target: "web",
  mode: isOffline ? "development" : "production",
  node: {
    __dirname: true,
    __filename: true,
  },
  devServer: {
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
    },
    watchFiles: {
      paths: ["**/*"],
      options: {
        ignored: ["**/node_modules", "**/dist", "**/.webpack", "**/.serverless"],
      },
    },
    devMiddleware: {
      writeToDisk: (filePath) => {
        // Always write the stats.json to disk, so we can load it in code
        return /\bstats\.json$/.test(filePath);
      },
    },
  },
  performance: {
    // Turn off size warnings for entry points
    hints: false,
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        // TODO: Customize code splitting to your needs
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
        },
        components: {
          name: "components",
          test: /[\\/]src[\\/]components[\\/]/,
          chunks: "all",
          minSize: 0,
        },
      },
    },
  },
  // React recommends `cheap-module-source-map` for development
  devtool: isOffline ? "cheap-module-source-map" : "nosources-source-map",
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          // Copy content from `./public/` folder to our output directory
          context: "./public/",
          from: "**/*",
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: isOffline ? "[name].css" : "[name].[contenthash:8].css",
    }),
    new StatsWriterPlugin({
      filename: "stats.json",
      transform(data, _opts) {
        const assets = data.assetsByChunkName;
        const stats = JSON.stringify(
          {
            scripts: Object.entries(assets).flatMap(([_asset, files]) => {
              return files.filter((filename) => filename.endsWith(".js") && !/\.hot-update\./.test(filename));
            }),
            styles: Object.entries(assets).flatMap(([_asset, files]) => {
              return files.filter((filename) => filename.endsWith(".css") && !/\.hot-update\./.test(filename));
            }),
          },
          null,
          2,
        );
        return stats;
      },
    }),
    isOffline && new HotModuleReplacementPlugin(),
    isOffline && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/, // we shouldn't need processing `node_modules`
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$/,
        use: [
          {
            loader: "url-loader",
            options: { limit: 8192 },
          },
        ],
      },
    ],
  },
  resolve: {
    // TsconfigPathsPlugin applies the path aliases defined in `.tsconfig.json`
    plugins: [new TsconfigPathsPlugin()],
    extensions: [".browser.tsx", ".browser.ts", ".browser.jsx", ".browser.js", ".tsx", ".ts", ".jsx", ".js"],
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: isOffline ? "[name].js" : "[name].[contenthash:8].js",
    crossOriginLoading: "anonymous", // enable cross-origin loading of chunks
  },
};
