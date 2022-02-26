// eslint-disable-next-line import/no-commonjs
module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
  },
  mini: {},
  h5: {
    devServer: {
      proxy: [
        {
          context: ['/'], // 代理本地所有接口
          target: "http://localhost:3000",
          changeOrigin: true,
        }
      ]
    }
  }
}
