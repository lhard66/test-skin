'use strict'

process.env.NODE_ENV = 'production'

const path = require('path')
const fs = require('fs-extra')
const chalk = require('chalk')
const webpack = require('webpack')
const utils = require('./utils')
const config = require('../config')
const getWebpackConfig = require('./webpack.style.conf')

const themePath = '../src/styles/theme'
const themeNames = fs.readdirSync(utils.combinePath(themePath))

function startWebpack(webpackConfig) {
  return new Promise((resolve) => {
    webpack(webpackConfig, (err, stats) => {
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
      resolve()
    })
  })
}

async function buildStyles() {
  for (const name of themeNames) {
    // 1.设置全局变量
    // global.scssVarPaths = path.join(__dirname, themePath, name)
    global.scssVarPaths = utils.combinePath(themePath, name)

    // 2.循环打包样式。
    const styleWebpackConfig = getWebpackConfig(path.basename(name, 'scss'))
    await startWebpack(styleWebpackConfig)
    // testWp(styleWebpackConfig)
    console.log('end')
    // break
  }
  // 复制css文件夹
  copyStyles()
}

// 复制css文件夹
function copyStyles() {
  fs.copySync(
    path.join(config.build.assetsStyleRoot, config.build.assetsSubDirectory),
    path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
  )
}

function testRm() {
  // rm(path.join(__dirname, '../theme'), err => {
  //   if (err) throw err
  //   console.log('rm success')
  // })
  fs.removeSync(path.join(__dirname, '../theme'))
}

function testWp(webpackConfig) {
  webpack(webpackConfig, (err, stats) => {
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
}

// testRm()
copyStyles()
// buildStyles()
