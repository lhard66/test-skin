'use strict'
const fs = require('fs')
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')

function resolveTheme (fileName = '') {
  return path.join(__dirname, '..', `src/themes/${fileName}`)
}

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  // posix多平台兼容
  return path.posix.join(assetsSubDirectory, _path)
}

// 样式分离打包
exports.extractCSS = new ExtractTextPlugin({
  filename: exports.assetsPath('css/[name].[contenthash].css'),
  allChunks: true,
});

// [ 'black.scss', 'red.scss', 'white.scss' ]
const themeFileNames = fs.readdirSync(resolveTheme());
const themeFilePaths = themeFileNames.map(name => resolveTheme(name));
// const themeFilePaths = resolveTheme('src/theme/black.scss')
function extractThemes() {
  return themeFileNames.map(name => {
    return new ExtractTextPlugin({
      filename: exports.assetsPath(`css/${path.basename(name, '.scss')}.[contenthash].css`),
      allChunks: true,
    })
  })
}

exports.extractThemes = extractThemes();
// exports.extractTheme = new ExtractTextPlugin({
//   filename: exports.assetsPath('css/theme.[contenthash].css'),
//   allChunks: true,
// });

// generate loader string to be used with extract text plugin
function generateLoaders (options, loader, loaderOptions) {
  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    // 可以支持变量和混入（mixin）
    // 增加浏览器相关的声明前缀
    // 把使用将来的 CSS 规范的样式规则转译（transpile）成当前的 CSS 规范支持的格式
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

  if (loader) {
    loaders.push({
      loader: loader + '-loader',
      options: Object.assign({}, loaderOptions, {
        sourceMap: options.sourceMap
      })
    })
  }

  // Extract CSS when that option is specified
  // (which is the case during production build)
  if (options.extract) {
    if (options.extractType === 'theme') {
      // console.log('index', options.themeNameIndex);
      return exports.extractThemes[options.themeNameIndex].extract({
        // TODO: 为什么有时候用use，有时间用loader？
        // 因为这里返回的是一个数组，所以要用use
        // Rule.loader 是 Rule.use: [ { loader } ] 的简写
        use: loaders,
      })
    } else {
      return exports.extractCSS.extract({
        // TODO: 为什么有时候用use，有时间用loader？
        // 因为这里返回的是一个数组，所以要用use
        // Rule.loader 是 Rule.use: [ { loader } ] 的简写
        use: loaders,
        fallback: 'vue-style-loader'
      })
    }
  } else {
    // 最后交由vue-style-loader处理
    // 开发环境返回此数组
    return ['vue-style-loader'].concat(loaders)
  }
}

exports.cssLoaders = function (options) {
  // 普通css的loader
  options = Object.assign({extractType: 'css'}, options);

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(options),
    postcss: generateLoaders(options),
    less: generateLoaders(options, 'less'),
    sass: generateLoaders(options, 'sass', { indentedSyntax: true }),
    scss: generateLoaders(options, 'sass'),
    stylus: generateLoaders(options, 'stylus'),
    styl: generateLoaders(options, 'stylus')
  }
}
// 生成多主题loader
function themeLoaders(options) {
  // console.log(extractThemes())
  // console.log(themeFilePaths)
  // console.log(resolveTheme())
  // console.log(themeFileNames);
  // console.log(exports.extractThemes)
  // 主题css的loader
  options = Object.assign({extractType: 'theme'}, options);

  return themeFileNames.map((name, index) => {
    // console.log('name', name);
    return {
      test: /\.scss$/,
      include: resolveTheme(name),
      use: generateLoaders(Object.assign(options, {themeNameIndex: index}), 'sass'),
    }
  })
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      exclude: themeFilePaths,
      use: loader
    })
  }
  return output.concat(themeLoaders(options))
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
