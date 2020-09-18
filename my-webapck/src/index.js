const json = require("./data.json");	//CommonJS 方式

import { sum } from "./other.js";		//ES Module 方式

console.log('Hello Webpack：', json, sum(2, 3));