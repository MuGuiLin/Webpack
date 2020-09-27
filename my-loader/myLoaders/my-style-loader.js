/**
 * 自定义实现 style-loader
 * @param {String} source
 *  动态生成style标签插入到head中
 */

module.exports = function (source) {
    console.log('--------source', source);

    return `const style = document.createElement('style');
            style.innerHTML = ${source};
            document.head.appendChild(style);
    `;

};