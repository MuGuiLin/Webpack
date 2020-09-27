/**
 * 自定义loader 
 *      注：不能是箭头函数，因为传过来的参数是挂载在this上的。
 * 
 *  官方文档：https://www.webpackjs.com/api/loaders
 * 
 * @param {Object} source  source参数就是匹配到的资源内容，如：js、css、less 等内容！！
 */

module.exports = function (source) {

    console.log('--------args：', source);
    console.log('--------this：', this);
};