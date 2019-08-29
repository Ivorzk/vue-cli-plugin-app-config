### suwis-vue-config

#### 介绍

一个vue项目配置文件管理的解决方案，可方便开发者在本地环境/测试环境/投产环境等多种配置里面快速切换


#### 快速使用

```js
import Vue from ''
import config from 'suwis-vue-config'
Vue.use(config, {
  // 配置文件路径
  file: '/config.js',
  // 默认使用的配置环境
  default: 'dev'
})
```
