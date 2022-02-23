const {
  override,
  overrideDevServer
} = require("customize-cra");

const path = require("path");
const packageName = require("./package.json").name;

module.exports = {
  webpack: override((config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    config.output = config.output || {};
    config.output.library = `${packageName}-[name]`;
    config.output.libraryTarget = "umd";
    config.output.chunkLoadingGlobal = `webpackJsonp_${packageName}`; // jsonpFunction https://github.com/webpack/webpack.js.org/issues/3940
    return config;
  }),
  devServer: overrideDevServer((config) => {
    config.headers = config.headers || {};
    config.headers["Access-Control-Allow-Origin"] = "*";
    config.historyApiFallback = true;
    return config;
  })
};
