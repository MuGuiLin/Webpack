const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {

    // 构建入口
    // entry: "./src/template/home/index.js",
    entry: {
        home: "./src/template/home/index.js",
        about: "./src/template/about/index.js",
    },

    // 构建出口
    output: {
        // 命名占位符：[name], [hash], [chunkhash], [contenthash] 它们之间是可以组合使用的
        filename: "[name]-[hash:12].js", // 命名时，拼接hash值太长，可以指定hash值的长度，这里设为只要前12位hash值

        // 输出⽂件的存放路径，必须是绝对路径
        path: path.resolve(__dirname, "./dist") //执定输入到一个名为dist的这个文件夹中（输出⽂件到磁盘的⽬录，必须是绝对路径）
    },

    // 开发模式
    mode: "development", // 开发模式（不会压缩和丑化代码） mode的值有：none、development、production

    // 调试模式
    devtool: "source-map",

    // 构建模块
    module: {
        rules: [
            // 处理.css文件
            {
                // 正则匹配规则
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },

            // 处理.less文件
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    "css-loader",
                    "less-loader"
                ]
            },
            // 处理图片文件
            {
                test: /\.(png|jpe?g|gif)$/,  // ?表示 ?前面的字符是可有可无的，也就是说jpe?g 中的 e 是可有可无的。
                use: {
                    loader: "url-loader", // url-loader 是file-loader的升级版，可处理base64等

                    // options额外的配置，⽐如资源名称
                    options: {
                        // 占位符 [name]源来资源模块的名称, [ext]⽼资源模块的后缀
                        name: "[name]-[hash].[ext]",  // https://webpack.js.org/loaders/file-loader#placeholders

                        outputPath: "img/", //指定图片打包后的存放位置

                        limit: 2048  // 当图片小于2kb时, 就转为base64
                    }
                }
            },

            // 处理字体、图标文件
            {
                test: /\.(ttf|eot|svg|woff|woff2)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",  
                        outputPath: "font/"
                    }
                }
            }
        ]
    },

    // 用于指定解析webpack的加载loader程序包
    resolveLoader: {
        modules: ["node_modules", "./my_loaders"], // 当在加载 module -> rules -> use中的loader时，默认先去node_modules目录中找，没有的话就去myLoaders中找相应的loader
    },

    // 插件
    plugins: [
        // 处理html文件
        new HtmlWebpackPlugin({
            title: "首页",
            template: "./src/template/home/index.html",
            filename: "home.html",
            // chunks: ["home"]
        }),
        
        new HtmlWebpackPlugin({
            title: "关于",
            template: "./src/template/about/index.html",
            filename: "about.html",
            // chunks: ["home"]
        }),

        // 清除dist文件夹中冗余、重复的文件
        new CleanWebpackPlugin(),

        // 将css抽离为单独的css文件
        new MiniCssExtractPlugin({
            // filename: "css/style.css"
            filename: "css/[name]-[chunkhash:12].css"
        })
    ],
};