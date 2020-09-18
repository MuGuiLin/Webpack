const path = require("path");

module.exports = {
    mode: "development", // 开发模式（不会压缩和丑化代码） mode的值有：node、development、production

    // 必填 webpack执⾏构建⼊⼝文件
    entry: "./src/index.js",

    output: {
        // 将所有依赖的模块合并输出到test.js
        filename: "test.js",
        // 输出⽂件的存放路径，必须是绝对路径
        path: path.resolve(__dirname, "./build") //执定输入到一个名为build的这个文件夹中
    }
};