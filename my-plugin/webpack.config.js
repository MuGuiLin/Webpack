const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


// 自定义插件
const AddTxtWebpackPlugin = require('./myPlugins/addTxt-webpack-plugin');
const FileDocWebpackPlugin = require('./myPlugins/fileDoc-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js',
        config: './src/js/config.js',
        home: './src/html/home/index.js',
        about: './src/html/about/index.js'
    },

    output: {
        filename: '[name].js',
        path: path.join(__dirname, './dist')
    },

    mode: 'development',

    devtool: "source-map",

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.vue$/,
                // npm install vue-loader -D
                use: []
            },
            {
                test: /\.jsx$/,
                // npm install react-hot-loader -D
                use: []
            },
        ]
    },

    // 用于指定解析webpack第三方和自定义的加载loader程序包
    resolveLoader: {
        modules: ["node_modules", "./my_loaders"], // 当在加载 module -> rules -> use中的loader时，默认先去node_modules目录中找，没有的话就去myLoaders中找相应的loader
    },

    plugins: [

        new HtmlWebpackPlugin({
            title: '首页',
            template: './src/html/home/index.html',
            filename: 'index.html',
            chunks: ['config', 'home']    // 指定要加载的js文件
        }),

        new HtmlWebpackPlugin({
            title: '关于',
            template: './src/html/about/index.html',
            filename: 'about.html',
            chunks: ['about']
        }),

        new CleanWebpackPlugin(),

        // new AddTxtWebpackPlugin({
        //     name: '项目说明'
        // }),

        new FileDocWebpackPlugin({
            name: '文件清单'
        }),

        // webpack自带热模块更新插件 https://webpack.docschina.org/guides/hot-module-replacement/
        new webpack.HotModuleReplacementPlugin(),
    ],

    /**
     * 本地服务器：https://www.npmjs.com/package/webpack-dev-server
     * 服务启动配置：package.json -> scripts -> "server": "webpack-dev-server"
     * 启动服务：npm run server
     */
    devServer: {
        contentBase: './dist',  // 启动路径（打包后的目录）  注：热模块更新插件启动后，在打包后的目录中是看不到代码的，因为它为了便于快速更新，所有把代码存放在内存中了
        open: true,     // 自动打开浏览器   注：打开浏览器后会默认打开 index.html文件
        port: 8080,     // 代里服务器端口
        proxy: {
            '/api': {
                target: 'http://localhost: 9092'
            }
        },
        hot: true    // 开启模块热更新
    },
};