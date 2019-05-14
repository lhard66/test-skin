'use strict'

process.env.NODE_ENV = 'production'

// const fs = require('fs')
const chalk = require('chalk')
const webpack = require('webpack')
const getWebpackConfig = require('./webpack.style.conf')

const styleWebpackConfig = getWebpackConfig()
// const themePath = '../src/styles/theme'

webpack(styleWebpackConfig, (err, stats) => {
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
