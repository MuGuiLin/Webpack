const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {

    // 单入口【必填】 字符串""方式 (SPA 单页面应用，单入口) webpack执⾏构建⼊⼝文件
    // entry: "./src/index.js",

    // 多入口【必填】 对象{}方式 或 数组[]方式 (MPA 多页面应用，多入口)
    entry: {
        index: './src/index.js',
        config: './src/js/config.js'
    },

    // 出口 【必填】
    output: {
        // 资源名称：将所有依赖的模块合并输出到main.js  (SPA 单页页应用，单入口输出) 
        // filename: "main.js",

        // 多⼊⼝多输出的处理：(MPA 多页页应用，有利于SEO，多入口输出)
        // 占位符：[name], [hash], [chunkhash], [contenthash] 它们之间是可以组合使用的

        // filename: "[name].js",          // 命名时，字名就用占位符[name]的写法（根据entry中对象的key作为name）因为多入口一定要对应着多出口才行 （利⽤占位符，⽂件名称不要重复）。
        // filename: "[name]-[hash].js",   // 命名时，拼接hash值，这样可以防止文件缓存问题（注：hash值在内容发生变化时才会重新生成！）
        filename: "[name]-[hash:6].js", // 命名时，拼接hash值太长，可以指定hash值的长度，这里设为只要前6位hash值


        // 输出⽂件的存放路径，必须是绝对路径
        path: path.resolve(__dirname, "./dist") //执定输入到一个名为dist的这个文件夹中（输出⽂件到磁盘的⽬录，必须是绝对路径）
    },

    mode: "development", // 开发模式（不会压缩和丑化代码） mode的值有：none、development、production

    module: {
        rules: [
            {
                // test: /\.xxx$/, // 指定正则匹配规则
                // use: {
                //     loader: 'xxx-load'  // 指定对应使⽤的loader，官网：https://www.webpackjs.com/loaders
                // }
            },

            // 处理.css文件
            {
                test: /\.css$/,      // 正则匹配所有以.css为后缀名的文件
                // use: "css-loader",   // 把匹配css文件编译到对应的文件中

                // use使⽤多个loader时，需要⽤数组
                use: ["style-loader", "css-loader"]

            },

        ]
    },

    // 插件
    plugins: [
        new HtmlWebpackPlugin({
            title: '首页',
            template: './src/html/index.html',
            filename: 'index.html'
        }),

        // 清除dist文件夹中冗余、重复的文件
        new CleanWebpackPlugin(),
    ]

};