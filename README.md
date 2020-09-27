# Webpack 

### 1、webpack简介

[webpack英文文档](https://webpack.js.org)，[webpack中文文档1](https://webpack.docschina.org)，[webpack中文文档2](https://www.webpackjs.com)

[思维导图 https://www.processon.com/view/5f65539d6376894e3278e0d8#map](https://www.processon.com/view/5f65539d6376894e3278e0d8#map)

> Webpack是⼀个打包模块化JavaScript的⼯具，它会从**⼊⼝模块出发**，识别出源码中的模块化导⼊语句，递 归地找出⼊⼝⽂件的所有依赖，将⼊⼝和其所有的依赖打包到⼀个单独的⽂件中。
>
> Webpack是⼯程化、⾃动化思想在前端开发中的体现。
>
> *webpack* 是一个现代 JavaScript 应用程序的*静态模块打包器(module bundler)*。当 webpack 处理应用程序时，它会递归地构建一个*依赖关系图(dependency graph)*，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 *bundle*。
>
> ![webpack](D:\github\Webpack\webpack.jpg)



### 2、安装webpack

#### 2.1、环境准备 

webpack是基于nodejs环境来运行的，所以在安装使用webpack之前要先安装nodejs环境，建议安装最新稳定（LTS）版NodeJs。

NodeJs下载地址： 英文 [https://nodejs.org/en](https://nodejs.org/en)，中文 [https://nodejs.org/zh-cn](https://nodejs.org/zh-cn)



**注：如果安装版本是webpack v4以上的版本时，还需要额外安装webpack-cli，两者缺一不可！**



#### 2.2、全局安装 不推荐

```shell
# 全局同时安装webpack 和 webpack-cli
npm install webpack webpack-cli -g		# -g 参数表示全局安装

# 安装完成后，检查版本
webpack -v

# 如果要卸载时
npm uninstall webpack webpack-cli -g
```



​        全局安装webpack，会将你项⽬中的webpack锁定到指定版本（也是就固定了webpack的版本），造成不同的项⽬中因为webpack依赖不同版本⽽导致冲突、出错等、构建失败情况！

所以一般在开发过程中不同的项目、代码框架所以的使用的webpack版本不一致，所以跟着项目走是最佳选择！



#### 2.3、项⽬(局部)安装 【推荐】

```shell
# 安装最新的稳定版本
npm i -D webpack	# -D 参数表示局部安装

# 安装指定版本
npm i -D webpack@<version> # 如：npm i -D webpack@4.2.0

# 安装最新的体验版本 可能包含bug,不要⽤于⽣产环境
npm i -D webpack@beta

# 安装webpack V4+版本时，需要额外安装webpack-cli
npm i -D webpack-cli

# 同时局部安装
npm install webpack webpack-cli -D
```



#### 2.4、检查安装情况

```shell
# command not found 默认在全局环境中查找
webpack -v

# npx帮助我们在项⽬中的node_modules⾥查找webpack
npx webpack -v

# 到当前的node_modules模块⾥指定webpack
./node_modules/.bin/webpack -v
```



#### 2.5、webpack升级

官方文档： [https://webpack.docschina.org/migrate](https://webpack.docschina.org/migrate)



### 3、构建webpack项目

#### 3.1、 创建项目文件夹、安装webpack依赖

```shell
# 1、在任意的某个目录下，打开命令行工具 创建一个项目文件夹，用于存放webpack相关的配置文件、静态资源、代码等，如果是用Vue,React,Angular等框架时，框架会在项目初始化时自动创建的，文件夹名在这里以my-webpack名字为例。

mkdir my-webpack # my-webpack 就是webpack项目文件夹的名字，是自定义的。
cd my-webpack # 进入my-webpack这个目录文件夹中

# 2、初始化package.json配置文件  
npm init # 填写package.json相关信息如：name、version、description、keywords、author等
或
npm init -y # 如果不填写，就在后面加上 -y 参数跳过填写

# 3、项⽬(局部)安装webpack 和 webpack-cli
npm install webpack webpack-cli -D

# 4、检查安装情况，由于这里是局部安装的，用npx帮助我们在项⽬中的node_modules⾥查找webpack
npx webpack -v
或
npx webpack-cli -v

# 执行npx webpack -v 命令后会输出webpack的版本号。
```



#### 3.2、准备执行构建目录和文件

1、在my-webpack目录中，创建一个名为 src 的文件夹。

2、为了便于打包测试，我们在src⽂件夹中 新建src/index.js、src/data.json、src/other.js 这3个文件用来测试。

 **注：webpack打包需要一个入口文件，默认情况下 src/index.js 是webpack的入口文件**

```js
# data.json
{
    "name": "JOSN",
    "age": 28
}

# other.js
export function sum(n1, n2) {
    return n1 + n2;
};

# index.js
const json = require("./data.json");	//CommonJS 方式
import { sum } from "./other.js";		//ES Module 方式
console.log('Hello Webpack：', json, sum(2, 3));

```



#### 3.3、执行构建（执行打包）

1、用 npx 方式执行打包命令

```shell
npx webpack
```

2、自定义构建命令（自定义构建命令的原理就是通过shell脚本在node_modules/.bin⽬录下创建⼀个软链接，不用npx也能执行webpack命令）

```js
// 修改package.json文件，在scripts选项中 添加 "build": "webpack"
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
},
```

2.1、用自定义构建命令 来 执行打包

```shell
npm run build  # build 就是上面自定义的打包命令名字，可以自定义的！！
```



#### 3.4、构建成功

​        当执行npx webpack 或 npm run build 打包命令后，发现会在my-webpack目录中生成一个dist文件夹，里面有个main.js文件，而这个main.js就是打包后的bundle文件啦！

这个main.js⽂件是⼀个标准的、可执⾏的JavaScript⽂件，⾥⾯包含webpackBootstrap启动函数 和 chunk，到此webpack的一个最简打包流程就OK了！！



#### 3.5、默认配置 

在webpack4.x以后，说是零配置打包（其是零配置是很弱的，如果在有特定的需求时，我们总是需要⾃⼰进⾏配置的），所以webpack也提供了一个默认的自定义配置⽂件，叫 **webpack.config.js** 。

我们可以对这个⽂件进⾏修改，进⾏个性化配 置因为它做的默认配置，在webpack.config.js中我们可以对webpack进行一系列配置！

**注：如果不想使⽤webpack.config.js这配置⽂件名也是可以修改的： ⽐如改为my-webpack-config.js，通过修改package.json文件中的 --config 来指定 webpack使⽤哪个配置⽂件来执⾏构建。**

```js
// 修改package.json文件，在scripts选项中 配置 "build": "webpack --config ./my-webpack-config.js"
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config ./my-webpack-config.js"
  },
```

通过以上修改后，在执行npm run build命令时，webpack就会去执行my-webpack-config.js文件中的配置啦！！



默认情况下webpack.config.js这个文件是不存在的，所以要在和package.json平级的目录中，创建一个名为webpack.config.js的文件（这里文件名也是可以自定义的，只是webpack在构建时会先去找默认的webpack.config.js文件），用于存放webpack的配置信息，以下是webpack的基础配置结构：

```js
# webpack.config.js
const path = require("path");

module.exports = {
    // 必填 webpack执⾏构建⼊⼝文件
    entry: "./src/index.js",
    
    output: {
        // 将所有依赖的模块合并输出到main.js
        filename: "main.js",
        // 输出⽂件的存放路径，必须是绝对路径
        path: path.resolve(__dirname, "./dist")
    }
};

```



### 4、webpack配置核心概念

#### 4.1 先来体验一下修改webpack.config.js配置后的效果

```js
# webpack.config.js
const path = require("path");

module.exports = {
    // 必填 webpack执⾏构建⼊⼝文件
    entry: "./src/index.js",

    output: {
        // 将所有依赖的模块合并输出到test.js
        filename: "test.js",
        // 输出⽂件的存放路径，必须是绝对路径
        path: path.resolve(__dirname, "./build") //执定输入到一个名为build的这个文件夹中
    }
};
```

![](D:\github\Webpack\mode.jpg)

```js
# webpack.config.js
const path = require("path");

module.exports = {
    // 开发模式（不会压缩和丑化代码）
    mode: "development", // mode的值有：node、development、production

    // 必填 webpack执⾏构建⼊⼝文件
    entry: "./src/index.js",

    // 输出配置
    output: {
        // 将所有依赖的模块合并输出到test.js
        filename: "test.js",
        // 输出⽂件的存放路径，必须是绝对路径
        path: path.resolve(__dirname, "./build") //执定输入到一个名为build的这个文件夹中
    }
};

注：如果给vue项目中的webpack.config.js配置文件加 mode: "development" 的话需要将对象作为函数来配设，不然在构建时可能会报错，具体代码如下：

module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
 
    configureWebpack: config => {
        // 开发模式（不会压缩和丑化代码）
        config.mode = "development",  // mode的值有：node、development、production

        // 必填 webpack执⾏构建⼊⼝文件
        config.entry = "./src/index.js",

        // 输出配置
        config.output = {
            // 将所有依赖的模块合并输出到test.js
            filename = "test.js",
            // 输出⽂件的存放路径，必须是绝对路径
            path: path.resolve(__dirname, "./build") //执定输入到一个名为build的这个文件夹中
        },

        // 配置代理服务器
        config.devServer = {
            proxy: {
                '/api': {
                    target: 'http://www.xxx.com',
                    ws: true,
                    changeOrigin: true,
                    pathRewrite: {
                        '^/api': ''
                    }
                }
            }
        }
    }
  
};
```

为了便于查看打包后的test.js代码，配置mode: "development"后，在构建时就不会出现警告，test.js中的代码也不到被压缩和丑化啦！！



## Webpack 配置项

```js
module.exports =  { 
    amd?, 
    bail?, 
    cache?, 
    context?, 
    dependencies?, 
    devServer?, 
    devtool?, 
    entry?, 
    externals?, 
    infrastructureLogging?, 
    loader?, 
    mode?, 
    module?, 
    name?, 
    node?, 
    optimization?, 
    output?, 
    parallelism?, 
    performance?, 
    plugins?, 
    profile?, 
    recordsInputPath?, 
    recordsOutputPath?, 
    recordsPath?, 
    resolve?, 
    resolveLoader?, 
    serve?, 
    stats?, 
    target?, 
    watch?, 
    watchOptions? 
}
```

