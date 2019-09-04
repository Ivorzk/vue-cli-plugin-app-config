### suwis-vue-config

#### 介绍

一个vue项目配置文件管理的解决方案，可方便开发者在本地环境/测试环境/投产环境等多种配置里面快速切换

#### 快速使用

```js
import Vue from ''
import config from 'suwis-vue-config'
Vue.use(config, options)
{
  // 配置文件路径
  file: '/config.js',
  // 默认使用的配置环境
  default: 'dev'
}
```

#### options

| 配置项     | 默认值            | 描述        |
| :------ | :------------- | :-------- |
| file    | /app.config.js | 配置文件路径    |
| default | dev            | 默认使用的配置环境 |

#### config 配置文件结构示例

```js
export default {
  // 不同环境环境配置
  env: {
    // 开发模式
    dev: {
      apihost: 'http://local.api.com'
    },
    // 测试模式
    test: {
      apihost: 'http://test.api.com'
    },
    // 投产模式
    prod: {
      apihost: 'http://bbs.api.com'
    },
    ...
  },
  // 公用配置
  common: {
    // 接口超时时间
    timeout: 5000,
    // 主题配置
    theme: 'red',
    ...
  }
}
```

#### 使用不同的环境启动项目

> 测试环境

```js
// 默认 dev环境，所以可加可不加

yarn serve --dev
```

> 测试环境

```js
yarn serve --test
```

> 正式环境

```js
yarn serve --prod
```

> 用户自定义环境

```js
yarn serve --xxx
```
