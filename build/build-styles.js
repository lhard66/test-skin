'use strict'

process.env.NODE_ENV = 'production'

const path = require('path')
const utils = require('./utils')
const chalk = require('chalk')
const webpack = require('webpack')
const merge = require('webpack-merge')
const prodWebpackConfig = require('./webpack.prod.conf')

function getWebpackConfig() {
  /**
   * 1. 处理输入路径问题。
   * 2. 不生成html文件。
   * 3. 动态设置scss变量。
   */
  const webpackConfig = merge(prodWebpackConfig, {
    output: {
      path: path.resolve(__dirname, '../theme'),
      filename: utils.assetsPath('js/[name].[chunkhash].js'),
      chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
  });

  // 修改样式变量成功，需要增加程序健壮性。
  webpackConfig.module.rules.forEach(rule => {
    if (rule.test.test('.scss')) {
      rule.use.forEach(loader => {
        if (loader.loader === 'sass-resources-loader') {
          loader.options.resources = ['/test/abc/efd']
        }
      })
    }
  })

  return webpackConfig;
}

webpack(getWebpackConfig(), (err, stats) => {
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  if (stats.hasErrors()) {
    console.log(chalk.red('  Build failed with errors.\n'))
    process.exit(1)
  }

  console.log(chalk.cyan('  Build styles complete.\n'))
})
