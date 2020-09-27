const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    // 入口
    // entry: './src/index.js',
    entry: {
        home: './src/js/home.js',
        login: './src/js/login.js',
    },

    // 出口
    output: {
        filename: "[name]-[contenthash:12].js",
        path: path.resolve(__dirname, "./build")
    },

    // 开发模式
    mode: "development",

    // 源代码映射关系（便于在开发环境时排错、收集错误信息，所以一般在生产环境用none） https://webpack.docschina.org/configuration/devtool/
    devtool: "source-map", // none | source-map | inline-source-map | ...

    // loader模块管理（核心）
    module: {
        rules: [
            // 处理.css文件
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader",
                        options: {
                            injectType: "singletonStyleTag" // 将所有的style标签合并成⼀个
                        }
                    },
                    "css-loader",
                ]
            },

            // 处理.less文件，注意：loader 顺序，从右到左，从下到上
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,

                    // "style-loader", // 注：如果加了 MiniCssExtractPlugin.loader 业抽离合并为独立的css文件时，这里就不能加style-loader否则会有冲突！

                    "css-loader",
                    "postcss-loader", // 样式⾃动添加前缀 https://caniuse.com/
                    "less-loader"
                ]
            },

            // 处理图片文件
            {
                test: /\.(png|jpe?g|gif)$/,  // ?表示 ?前面的字符是可有可无的，也就是说jpe?g 中的 e 是可有可无的。
                // use: {
                //     loader: "file-loader",

                //     // options额外的配置，⽐如资源名称
                //     options: {
                //         // 占位符 [name]源来资源模块的名称, [ext]⽼资源模块的后缀
                //         name: "[name]-[hash].[ext]",  // https://webpack.js.org/loaders/file-loader#placeholders

                //         outputPath: "img/" //指定图片打包后的存放位置
                //     }
                // }
                use: {
                    loader: "url-loader", // url-loader 是file-loader的升级版，可处理base64等

                    // options额外的配置，⽐如资源名称
                    options: {
                        // 占位符 [name]源来资源模块的名称, [ext]⽼资源模块的后缀
                        name: "[name]-[hash].[ext]",  // https://webpack.js.org/loaders/file-loader#placeholders

                        outputPath: "img/", //指定图片打包后的存放位置

                        limit: 2048  // 当图片大于2kb时, 就转为base64
                    }
                }
            },

            // 处理字体、图标文件
            {
                test: /\.(ttf|eot|svg|woff|woff2)$/,
                use: {
                    loader: "file-loader",

                    // options额外的配置，⽐如资源名称
                    options: {
                        // 占位符 [name]源来资源模块的名称, [ext]⽼资源模块的后缀
                        name: "[name].[ext]",  // https://webpack.js.org/loaders/file-loader#placeholders

                        outputPath: "font/" //指定图片打包后的存放位置
                    }
                }
            }
        ]
    },

    // 插件 作⽤于webpack打包整个过程，plugin 可以在webpack运⾏到某个阶段的时候，帮你做⼀些事情，类似于⽣命周期的概念扩展插件，在 Webpack 构建流程中的特定时机注⼊扩展逻辑来改变构建结果或做你想要的事情。
    plugins: [

        // 处理html文件
        new HtmlWebpackPlugin({
            template: "./src/html/login.html",
            filename: "login.html",
            chunks: ["login"]
        }),

        new HtmlWebpackPlugin({
            template: "./src/html/home.html",
            filename: "home.html",
            chunks: ["home"]
        }),

        // 在构建前先删除原有的构建内容
        new CleanWebpackPlugin(),

        // 将css抽离为单独的css文件
        new MiniCssExtractPlugin({
            // filename: "css/style.css"
            filename: "css/[name]-[chunkhash:12].css"
        })
    ],
}

