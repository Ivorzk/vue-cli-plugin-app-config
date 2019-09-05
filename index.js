module.exports = (api, options) => {

  console.log('进入插件', options)

  // 混入配置文件
  let mergeConfig = (args) => {
    // 获取配置文件
    let $allConfig = require(options.file).default

    console.log($allConfig, '$allConfig', args, 'args')

    // 获取环境
    let env = args || options.default || 'dev'
    // 混入参数
    let $config = {
      // 混入通用的配置
      ...$allConfig.common || {},
      // 混入当前环境配置
      ...$allConfig[env] || {}
    }

    // 混入全局的webpack中
    api.configureWebpack(webpackConfig => {
      webpackConfig.plugins = [
        new webpack.DefinePlugin({
          $config: $config
        })
      ]
    })
  }

  // 注册命令行
  api.registerCommand('serve', args => {
    mergeConfig(args)
  })

  api.registerCommand('build', args => {
    mergeConfig(args)
  })

  api.registerCommand('test', args => {
    mergeConfig(args)
  })

}
