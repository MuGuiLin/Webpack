const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',

    output: {
        // 占位符 [name], [hash], [hash:8], [chunkhash] [contenthash]
        filename: '[name]-[chunkhash:6].js',
        path: path.resolve(__dirname, 'dist')
    },

    mode: 'development',

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },

            {
                // test: /\.less$/,
                // use: [
                //     'style-loader',
                //     'css-loader',
                //     'less-loader'
                // ]
            },

            // 自定义style-loader，css-loader，less-loader 暗号：可以做，便没必要！
            {
                test: /\.less$/,
                use: [
                    {
                        loader: path.resolve(__dirname, "./myLoaders/my-style-loader"),
                    },

                    {
                        // 配置resolveLoader以后的简写，就不用像上面那样去指定loader路径
                        loader: 'my-css-loader',  // loader: 'my-css-loader' === { loader: path.resolve(__dirname, "./myLoaders/my-css-loader") },
                    },

                    // 配置resolveLoader以后，还可以更精简的简写，直接用文件名就OK啦！！
                    'my-less-loader',  // my-less-loader === { loader: 'my-less-loader' },

                ]
            },

            // 自定义js-replace-loader
            {
                test: /\.js$/,
                use: [
                    {
                        loader: path.resolve(__dirname, "./myLoaders/my-js-replace-loader.js"),
                        // 还可以传参
                        options: {
                            name: 'hello',
                            age: 28
                        }
                    }
                ]
            },
        ]
    },

    // 用于指定解析webpack第三方和自定义的加载loader程序包
    resolveLoader: {
        modules: ['node_modules', './myLoaders'], // 当在加载 module -> rules -> use中的loader时，默认先去node_modules目录中找，没有的话就去myLoaders中找相应的loader
    },

    // 插件
    plugins: [
        new HtmlWebpackPlugin({
            title: '自定义实现webpack loader',
            template: './src/html/home.html',
            filename: 'index.html'
        }),

        new CleanWebpackPlugin()
    ],


};