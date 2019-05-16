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

      if (stats.hasErrors()) {
        console.log(chalk.red('  Build failed with errors.\n'))
        process.exit(1)
      }

      resolve()
    })
  })
}

async function buildStyles() {
  removeStyles()

  // 循环打包
  for (const name of themeNames) {
    // 1.设置全局变量
    global.scssVarPaths = utils.combinePath(themePath, name)

    // 2.循环打包样式。
    const styleWebpackConfig = getWebpackConfig(path.basename(name, 'scss'))
    await startWebpack(styleWebpackConfig)

    print(`${path.basename(global.scssVarPaths)} build complete.`)
  }

  // 复制css文件夹
  copyStyles()
  print('copy themes complete.')
  removeStyles()
  print('remove theme directory complete.')
  print('over!')
}

function print(msg) {
  console.log(chalk.cyan(`  ${msg}\n`))
}

// 复制css文件夹
function copyStyles() {
  fs.copySync(
    path.join(config.build.assetsStyleRoot, config.build.assetsSubDirectory),
    path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
  )
}

// 删除theme文件夹
function removeStyles() {
  fs.removeSync(config.build.assetsStyleRoot)
}

buildStyles()
