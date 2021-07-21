'use strict'
const path = require('path')
const PerformancePlugins = require('performance_test_plugins_milk')
const resolve = dir => path.join(__dirname, dir)
function chainWebpack(config){
  config.module
    .rule('svg')
    .exclude.add(resolve('src/icons'))
    .end()
  config.module
    .rule('icons')
    .test(/\.svg$/)
    .include.add(resolve('src/icons'))
    .end()
    .use('svg-sprite-loader')
    .loader('svg-sprite-loader')
    .options({
      symbolId: 'icon-[name]'
    })
    .end()
}
console.log(process.env.NODE_ENV)
module.exports = {
  lintOnSave: process.env.NODE_ENV === 'development',
  chainWebpack,
  devServer: {
    port: 8080,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    
  }
}