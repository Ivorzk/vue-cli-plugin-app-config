[中文](https://github.com/Ivorzk/vue-cli-plugin-app-config/wiki/doc_zh) | [English](https://github.com/Ivorzk/vue-cli-plugin-app-config/wiki/doc_en)

### vue-cli-plugin-app-config

#### Introduce

A vue project profile management solution that allows developers to quickly switch between local/test/production configurations

#### Quick to use

> Add the plug-in

```sh
yarn add vue-cli-plugin-app-config

// or

npm i vue-cli-plugin-app-config --save-dev
```

> Apply plug-ins to your project

```sh
vue add vue-cli-plugin-app-config
```

> Configure the plug-in vue.config.js

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

#### options

| Configuration items     | The default value            | describe        |
| :------ | :------------- | :-------- |
| file    | ./app.config.js | The configuration file path, which defaults to the project root directory, is at the same level as vue.config.js    |
| default | dev            | The configuration environment used by default |
| includePackage | false            | Sometimes we need to get the version of the current program, and package.json has its own version number. Use this configuration to import the data in package.json into the configuration file |

#### app.config.js Sample configuration file structure

```js
module.exports = {
  // Different environment environment configuration
  env: {
    // The development environment
    dev: {
      apihost: 'http://local.api.com'
    },
    // The test environment
    test: {
      apihost: 'http://test.api.com'
    },
    // Production environment
    prod: {
      apihost: 'http://bbs.api.com'
    },
    ...
  },
  // Common configuration
  common: {
    // Interface timeout
    timeout: 5000,
    // The topic configuration
    theme: 'red',
    ...
  }
}
```

#### Start the project with a different environment (in the case of yarn)

> The development environment

```js
// Default dev environment, so can be added or not added
yarn serve --dev

// or

npm run serve -- --dev
```

> The test environment

```js
yarn serve --test

// or

npm run serve -- --test
```

> Production environment

```js
yarn serve --prod

// or

npm run serve -- --prod
```

> User - defined environment

```js
yarn serve --xxx

// or

npm run serve -- --xxx
```

#### Compile the project using a different environment (in the case of yarn)

> The development environment

```js
// Default dev environment, so can be added or not added
yarn build --dev

// or

npm run build -- --dev
```

> The test environment

```js
yarn build --test

// or

npm run build -- --test
```

> Production environment

```js
yarn build --prod

// or

npm run build -- --prod
```

> User - defined environment

```js
yarn build --xxx

// or

npm run build -- --xxx
```

#### Use configuration content in your project

After using this plug-in, a '$config' object will be generated globally in the project, and the configuration content can be directly obtained in any js file through '$config'

> For the above configuration file, take the dev environment startup as an example, and the resulting $config file is as follows

```
// $config
{
  apihost: 'http://local.api.com',
  // Interface timeout
  timeout: 5000,
  // The topic configuration
  theme: 'red'
}
```

> The sample

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
      // Inject into the current component
      config: $config
    }
  },
  mounted() {
    console.log('Global project configuration', $config)
  }
}
</script>

<style lang="css" scoped>
</style>
```


#### Matters needing attention

Plug-in injected $config, strong in open eslint calibration environment, complains, need to configure the eslint rules
Modify the app. Config. Need to restart the project after js, variable to take effect

> Configuration in the project root directory. Eslintrc. Js (if there is no this file, create a new)

```js
module.exports = {
  globals: {
    $config: true
  },
  ...
}
```
