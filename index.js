module.exports = (api, options) => {
  // api.chainWebpack(webpackConfig => {
  //   // 通过 webpack-chain 修改 webpack 配置
  // })
  console.log('进入插件', options)
  api.configureWebpack(webpackConfig => {

  })

  // 获取配置文件
  let $config = require(options.file).default

  console.log($config, '$config')
  // 获取环境
  let env = options.default || 'dev'
  // 混入参数
  let mixconfig = {
    // 混入通用的配置
    ...$config.common || {},
    // 混入当前环境配置
    ...$config[env] || {}
  }
  // 注入到Vue实例中
  Vue.prototype.$config = mixconfig
  // 尝试注入到window当中
  if (window) window.$config = mixconfig
}

// api.registerCommand('test', args => {
//   // 注册 `vue-cli-service test`
// })
}
