const fs = require('fs')
const webpackConfig = require('./webpack.prod.conf')

fs.writeFile('webpackconfig.json', JSON.stringify(webpackConfig, null, '\t'), err => {
  if (err) throw err;
  console.log('配置文件已生成');
});
