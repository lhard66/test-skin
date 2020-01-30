'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

function getCssLoaders(sourceMapEnabled) {
  // 增加scss全局变量
  const cssLoaders = utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    // extract: true,
    extract: isProduction
  });

  if (cssLoaders.scss) {
    cssLoaders.scss.push({
      loader: 'sass-resources-loader',
      options: {
        sourceMap: sourceMapEnabled,
        resources: [
          path.join(__dirname, '../src/styles/common/_variables.scss')
        ]
      }
    })

    // cssLoaders.scss.pop();
  }

  return cssLoaders;
}

module.exports = function() {
  // 当匹配到.vue文件时，文件内的样式的处理的loader
  // extract为false时，.vue文件中的样式将不被提取到一个独立的css文件中;true而反之。

  // loaders: getCssLoaders(sourceMapEnabled),
  return {
    loaders: utils.cssLoaders({
      sourceMap: sourceMapEnabled,
      extract: isProduction
    }),
    // 给vue文件增加全局scss变量，避免频繁引入
    cssSourceMap: sourceMapEnabled,
    cacheBusting: config.dev.cacheBusting,
    transformToRequire: {
      video: ['src', 'poster'],
      source: 'src',
      img: 'src',
      image: 'xlink:href'
    }
  }
}
