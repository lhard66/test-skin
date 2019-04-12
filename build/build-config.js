const fs = require('fs')
const webpackConfig = require('./webpack.prod.conf')

fs.writeFile('webpackconfig.json',
  JSON.stringify(webpackConfig, (key, value) => {
    if(value instanceof RegExp){
      return value.toString();
    } else {
      return value;
    }
  }, '\t'),
  err => {
    if (err) throw err;
    console.log('配置文件已生成');
});
