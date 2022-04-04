const StyleLintPlugin = require('stylelint-webpack-plugin')
const packageName = require('./package.json').name
const path = require('path')

module.exports = {
  publicPath: './',
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "~@/assets/styles/variable.scss";
          @import "~@/assets/styles/mixin.scss";
        `,
      },
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#d14424',
            'text-color': '#41464b',
            'font-size-base': '13px',
            'border-radius-base': '2px',
          },
          javascriptEnabled: true,
        },
      },
    },
  },
  configureWebpack: {
    plugins: [
      new StyleLintPlugin({
        files: ['src/**/*.{vue,html,css,scss,sass,less}'],
        failOnError: false,
        cache: false,
        fix: false,
      }),
    ],
    resolve: {
      alias: {
        ['@']: path.resolve(__dirname, 'src'),
      }
    },
    // historyRouter适配
    devServer: {
      historyApiFallback: true,
    },
    // 微前端配置
    output: {
      library: `${packageName}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${packageName}`,
    },
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
}