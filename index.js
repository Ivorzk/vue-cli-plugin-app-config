var path = require('path')
var webpack = require('webpack')

module.exports = (api, options) => {

  // 混入配置文件
  let mergeConfig = (args) => {

    // 获取插件配置
    let pluginOptions = options.pluginOptions['app-config'] || {
      file: './app.config.js',
      default: 'dev'
    }

    // 获取配置文件
    let $allConfig = require(path.resolve(pluginOptions.file))

    // 获取环境, 使用插件默认配置 or dev
    let envtype = pluginOptions.default || 'dev'

    // 判断启动时是否有携带参数
    if (args.length > 0) {
      for (let key of args) {
        if ($allConfig.env[key.replace('--', '')]) envtype = key.replace('--', '')
      }
    }

    // 混入参数
    let $config = {
      // 混入通用的配置
      ...$allConfig.common || {},
      // 混入当前环境配置
      ...$allConfig.env[envtype] || {}
    }

    // 混入全局的webpack中
    api.configureWebpack(webpackConfig => {
      // 注入到webpack全局配置当中
      return {
        plugins: [
          new webpack.DefinePlugin({
            $config: JSON.stringify($config)
          })
        ]
      }
    })

    console.info('\n global $config use ' + envtype + ' mode \n')

  }

  // 获取启动参数
  let argv = []

  // 过滤保留--前缀的参数
  for (let arg of process.argv) {
    if (arg.indexOf('--') >= 0) argv.push(arg)
  }

  // 合并配置文件
  mergeConfig(argv)
}
