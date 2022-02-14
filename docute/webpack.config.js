module.exports = {
  devServer: {
    contentBase: "./build",
    port: 8081, // 端口号
    inline: true,
    hot: true,
    historyApiFallback: true,
  },
};
