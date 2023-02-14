var path = require('path')
var webpack = require('webpack')
var package = require('./package.json')

// 默认配置
var $defaultConfig = {
  env: {
    dev: {}
  },
  common: {}
}

module.exports = (api, options) => {

  // 容错处理
  options.pluginOptions ? '' : options.pluginOptions = {}

  // 混入配置文件
  let mergeConfig = (args) => {

    // 获取插件配置
    let pluginOptions = options.pluginOptions['app-config'] || {
      file: './app.config.js',
      default: 'dev',
      outputprefix: 'dist'
    }

    // 获取配置文件
    let $allConfig = require(path.resolve(pluginOptions.file)) || {}

    // 合并默认配置
    $allConfig = Object.assign($defaultConfig, $allConfig)

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
      ...$allConfig.env[envtype] || {},
      // 注入当前环境标识
      env: envtype
    }

    if (pluginOptions.includePackage) $config.package = package

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
  let npm_config_argv = process.argv || []
  for (let arg of npm_config_argv) {
    if (arg.indexOf('--') >= 0) argv.push(arg)
  }

  // 合并配置文件
  mergeConfig(argv)
}
