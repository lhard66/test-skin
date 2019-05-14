'use strict'

process.env.NODE_ENV = 'production'

const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const webpack = require('webpack')
const getWebpackConfig = require('./webpack.style.conf')

const themePath = '../src/styles/theme'
const themeNames = fs.readdirSync(path.join(__dirname, themePath))

function startWebpack(webpackConfig) {
  return new Promise((resolve, reject) => {
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
        // process.exit(1)
        throw reject(new Error(1))
      }

      console.log(chalk.cyan('  Build styles complete.\n'))
      resolve(0)
    })
  })
}

async function buildStyles() {
  for (const name of themeNames) {
    // 1.设置全局变量
    global.scssVarPaths = path.join(__dirname, themePath, name)

    // 2.循环打包样式。
    const styleWebpackConfig = getWebpackConfig(path.basename(name, 'scss'))
    await startWebpack(styleWebpackConfig)
    console.log('end')
    // break
  }
}

buildStyles()
