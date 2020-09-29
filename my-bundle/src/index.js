/**
 * 模块分析入口文件
 * 内容 依赖模块（目有是模块的路径）,借助babel处理代码，生成代码片段
 */
// import css from './css/base.css';

import { PI, user } from './js/aaa.js';
import { rmb } from './js/bbb.js';

console.log(PI, user.name, rmb);