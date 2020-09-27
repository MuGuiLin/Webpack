const json = require("./js/data.json");	// CommonJS 模块导入方式

import { sum } from "./js/other.js";	// ES Module 模块导入方式（现在推荐）

import base from './css/base.css';      // 引入css文件

console.log('Hello Webpack：', json, sum(2, 3), base);