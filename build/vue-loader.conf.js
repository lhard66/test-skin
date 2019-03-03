'use strict'
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
/**
 * .vue文件中的style无法通用多个vue-loader提取多个套主题（即样式）的原因：
 * 1. 如果配置多个vue-loader，则会重复打包static/js文件夹中的文件。
 * 2. 打包的样式是由styles中的index文件确定的，样式变量没有被覆盖，不同打包出不同的主题，只会打包出相同的主题文件。
 */
