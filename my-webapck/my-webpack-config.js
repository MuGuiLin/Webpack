const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {

    // 必填 webpack执⾏构建⼊⼝文件
    entry: "./src/index.js",

    output: {
        // 将所有依赖的模块合并输出到test.js
        filename: "main.js",
        // 输出⽂件的存放路径，必须是绝对路径
        path: path.resolve(__dirname, "./mupiao") //执定输入到一个名为mupiao的这个文件夹中
    },

    mode: "development", // 开发模式（不会压缩和丑化代码） mode的值有：none、development、production

    module: {
        rules: [

            // 处理.css文件
            {
                test: /\.css$/,      // 正则匹配所有以.css为后缀名的文件

                // use使⽤多个loader时，需要⽤数组
                // use: ["style-loader", "css-loader"]

                // 在use中，当有多个loader时，就用数组来添加，注：多个loader是有执行顺序的，是从右向左，从后向前执行（就是先执行后面，再执行前面）
                use: [
                    {
                        loader: "style-loader",
                        options: {
                            injectType: "singletonStyleTag" // 将所有的style标签合并成⼀个
                        }
                    },
                    "css-loader"
                ]
            },

        ]
    },

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