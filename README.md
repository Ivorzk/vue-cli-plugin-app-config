[中文](https://github.com/Ivorzk/vue-cli-plugin-app-config/wiki/doc_zh) \| [English](https://github.com/Ivorzk/vue-cli-plugin-app-config/wiki/doc_en)

### vue-cli-plugin-app-config

#### 介绍

一个vue项目配置文件管理的解决方案，可方便开发者在本地环境/测试环境/投产环境等多种配置里面快速切换

#### 快速使用

> 添加插件

```sh
yarn add vue-cli-plugin-app-config

// 或者

npm i vue-cli-plugin-app-config --save-dev
```

> 应用插件到项目中

```sh
vue add vue-cli-plugin-app-config
```

> 配置插件 vue.config.js

```js
module.exports = {
   ...other config
   pluginOptions: {
      // options
      'app-config': {
        file: './app.config.js',
        default: 'dev'
      }
   }
}
```

#### 插件配置项 options

| 配置项     | 默认值             | 描述                                 |
| :------ | :-------------- | :--------------------------------- |
| file    | ./app.config.js | 配置文件路径,默认为项目根目录，和 vue.config.js 同级 |
| default | dev             | 默认使用的配置环境                          |

#### app.config.js 配置文件结构示例

```js
module.exports = {
  // 不同环境环境配置
  env: {
    // 开发环境
    dev: {
      apihost: 'http://local.api.com'
    },
    // 测试环境
    test: {
      apihost: 'http://test.api.com'
    },
    // 投产环境
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

#### 使用不同的环境启动项目(以yarn为例)

> 开发环境

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

#### 使用不同的环境编译项目(以yarn为例)

> 开发环境

```js
// 默认 dev环境，所以可加可不加
yarn build --dev
```

> 测试环境

```js
yarn build --test
```

> 正式环境

```js
yarn build --prod
```

> 用户自定义环境

```js
yarn build --xxx
```

#### 项目中使用配置内容

使用本插件以后，会在项目全局生成一个 `$config` 对象，可在任意js文件中通过 `$config` 直接获取配置内容

> 上文中的配置文件，以dev环境启动为例，最终得到的 $config 文件如下

    // $config
    {
      apihost: 'http://local.api.com',
      // 接口超时时间
      timeout: 5000,
      // 主题配置
      theme: 'red'
    }

> 示例

```html
<template lang="html">
  <div>
    apihost: {{config.apihost}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 注入到当前组件
      config: $config
    }
  },
  mounted() {
    console.log('全局项目配置', $config)
  }
}
</script>

<style lang="css" scoped>
</style>
```

#### 注意事项

插件注入的$config,在开启eslint强校验的环境，会报错，需要配置一下eslint规则
修改 app.config.js 以后需要重启项目，变量才能生效

> 配置项目根目录中的 .eslintrc.js (如果没有此文件，可新建一个)

```js
module.exports = {
  globals: {
    $config: true
  },
  ...
}
```
