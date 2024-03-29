const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
// const CopyPlugin = require("copy-webpack-plugin");

const mode = process.env.NODE_ENV || "production";

module.exports = {
  mode,
  entry: "./src/index",
  output: {
    publicPath: "http://localhost:3002/", // New
  },
  devtool: "source-map",
  optimization: {
    minimize: mode === "production",
  },
  resolve: {
    extensions: [".jsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: require.resolve("babel-loader"),
        options: {
          presets: [require.resolve("@babel/preset-react")],
        },
      },
    ],
  },
  plugins: [
    // New
    new ModuleFederationPlugin({
      name: "application_b",
      library: { type: "var", name: "application_b" },
      filename: "remoteEntry.js",
      exposes: {
        "./SayHelloFromB": "./src/App",
      },
      remotes: {
        application_a: "application_a",
      },
      shared: ["react", "react-dom"],
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    // new CopyPlugin({
    //   patterns: [
    //     { from: "node_modules/scichart/_wasm/scichart2d.data", to: "" },
    //     { from: "node_modules/scichart/_wasm/scichart2d.wasm", to: "" },
    //   ],
    // }),
  ]
};
