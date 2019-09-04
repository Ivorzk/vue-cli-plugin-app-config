import program from 'commander'
// 获取进程参数
program.parse(process.argv)

console.log(program, 'program')

export default {
  install(Vue, options) {
    // 获取配置文件
    let $config = require(options.file).default
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
}
