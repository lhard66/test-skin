'use strict'
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

module.exports = {
  // 当匹配到.vue文件时，文件内的样式的处理的loader
  // extract为false时，.vue文件中的样式将不被提取到一个独立的css文件中;true而反之。
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: true,
    // extract: isProduction
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
