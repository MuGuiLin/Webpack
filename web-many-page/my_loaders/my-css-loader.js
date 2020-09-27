/**
 * 自定义实现 css-loader
 * @param {String} source
 * 序列化css
 */

module.exports = function(source) {
    
    // 将css序列化(方便保存在chunk中)
    return JSON.stringify(source);
};