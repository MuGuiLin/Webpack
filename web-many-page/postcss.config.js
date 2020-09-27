/**
 * postcss配置文件
 * https://github.com/postcss/postcss/blob/master/docs/README-cn.md
 */
module.exports = {
    plugins: [
        require('autoprefixer')({
            // css自动添加浏览器兼容前缀，last 2表示：最新最近两个版本，>1%表示：兼容市场占有率大于1%的浏览器（世界的1%）
            overrideBrowserslist: ["last 2 versions", ">1%"] // npx browserslist "dead",  npx browserslist ">1%"   https://caniuse.com/
        })
    ]
};