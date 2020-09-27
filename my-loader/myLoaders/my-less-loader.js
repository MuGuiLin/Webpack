/**
 * 自定义 实现 less-loader
 * @param {String} source 
 */

const less = require("less");

module.exports = function (source) {

    console.log('--------less内容：', source);

    // 借肋less来处理less语法问题
    less.render(source, (error, output) => {
        console.log('--------error：', error);
        console.log('--------outpu：', output);

        // 将less转为css并输出
        this.callback(error, output.css);
    });
};