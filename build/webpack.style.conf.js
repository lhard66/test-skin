const path = require('path')
const utils = require('./utils')
const config = require('../config')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const vueLoaderConfig = require('./vue-loader.conf')
const baseWebpackConfig = require('./webpack.base.conf')

function getWebpackConfig(themeName) {
  /**
   * 0. 先删除theme文件夹，再进行后续删除操作。
   * 1. 处理输入路径问题。
   * 2. 不生成html文件。
   * 3. 动态设置scss变量。
   */

  const webpackConfig = merge.smart(baseWebpackConfig, {
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: vueLoaderConfig()
        },
        ...utils.styleLoaders({
          sourceMap: config.build.productionSourceMap,
          extract: true,
          usePostCSS: true
        })
      ]
    },
    devtool: config.build.productionSourceMap ? config.build.devtool : false,
    output: {
      path: path.resolve(__dirname, '../theme'),
    },
    plugins: [
      new ExtractTextPlugin({
        filename: utils.assetsPath(`css/${themeName}css`),
        allChunks: true
      }),
    ]
  });


  return webpackConfig;
}

module.exports = getWebpackConfig
