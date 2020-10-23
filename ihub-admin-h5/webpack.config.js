//引入node路径
var path = require('path');
//引入自动加载JS入口
var glob = require('glob');
//引入webpack
var webpack = require('webpack');
//分离css文件
var ExtractTextPlugin =  require('extract-text-webpack-plugin');
//清理hash生成的冗余文件
var CleanWebpackPlugin = require('clean-webpack-plugin');
//生成html
var HtmlWebpackPlugin = require('html-webpack-plugin');
//拷贝插件
var CopyWebpackPlugin = require('copy-webpack-plugin');
//自动匹配入口文件
function entries (globPath) {

    var files = glob.sync(globPath);

    var entries = {}, entry, dirname, basename;

    for (var i = 0; i < files.length; i++) {

        entry = files[i];

        basename = path.basename(entry, '.js');

        entries[path.join(basename)] = './' + entry;
    }
    return entries;
}

module.exports = {
    //开发模式
    mode: 'production',//'development production',

    //devtool: 'inline-source-map',

    //入口文件
    entry: entries('./src/js/*.js'),
    //输出文件
    output:{

        path: path.resolve(__dirname,'./static'),

        filename: 'js/[name].js'
    },

    module:{

        rules: [

            {
                test: /\.scss|css$/,

                use: ExtractTextPlugin.extract({

                    fallback: 'style-loader',

                    use: [{

                        loader: 'css-loader',

                        options:{

                            minimize: true //css压缩
                        }
                    },
                    {

                        loader: 'sass-loader',
                    }],

                    publicPath: '../'
                })
            },
            {
                test: /\.png|jpe?g|gif|svg$/,

                use: [{

                    loader: 'url-loader',

                    options: {

                        limit: 81920,

                        name: '[name].[ext]',

                        outputPath: './img'
                    }
                }]
            }
        ]
    },
    //引入vueJS
    resolve: {

        alias: {

          'vue$': 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        //引入jquery
        new webpack.ProvidePlugin({

            jQuery: 'jquery',

           // $: 'jquery'
        }),
        //分离css
        new ExtractTextPlugin({

            filename: 'css/[name].css'
        
        }),
        //清理CSS缓存
        new CleanWebpackPlugin(['./static'],{

            root: __dirname,

            verbose: true,

            dry: false
        }),
        //拷贝插件
        new CopyWebpackPlugin([

            {
                from: './src/plugins',

                to: './plugins'
            }
        ]),
       //审核首页
        new HtmlWebpackPlugin({

            template: './src/index.html',

            filename: path.resolve(__dirname,'./index.html'),

            title: '审核首页',

            chunks:['checked']
        }),
        //列表
        new HtmlWebpackPlugin({

            template: './src/views/list.html',

            filename: path.resolve(__dirname,'./template/list.html'),

            title: '列表页',

            chunks:['list']
        }),
        //审核页
        new HtmlWebpackPlugin({

            template: './src/views/checked.html',

            filename: path.resolve(__dirname,'./template/checked.html'),

            title: '审核',

            chunks:['checked']
        }),
        //模板注册
        new HtmlWebpackPlugin({

            template: './src/views/templateReg.html',

            filename: path.resolve(__dirname,'./template/templateReg.html'),

            title: '模板注册',

            chunks:['template']
        }),
        //投票新建
        new HtmlWebpackPlugin({

            template: './src/views/addVote.html',

            filename: path.resolve(__dirname,'./template/addVote.html'),

            title: '投票新建',

            chunks:['addVote']
        }),
        //点赞新建
        new HtmlWebpackPlugin({

            template: './src/views/addFabulous.html',

            filename: path.resolve(__dirname,'./template/addFabulous.html'),

            title: '点赞新建',

            chunks:['addFabulous']
        }),
        //通知
        new HtmlWebpackPlugin({

            template: './src/views/notice.html',

            filename: path.resolve(__dirname,'./template/notice.html'),

            title: '通知',

            chunks:['notice']
        }),
        //聊天室
        new HtmlWebpackPlugin({

            template: './src/views/chatRoom.html',

            filename: path.resolve(__dirname,'./template/chatRoom.html'),

            title: '聊天室',

            chunks:['chatRoom']
        }),
        //爆料
        new HtmlWebpackPlugin({

            template: './src/views/burst.html',

            filename: path.resolve(__dirname,'./template/burst.html'),

            title: '爆料',

            chunks:['burst']
        }),
        //信息提交
        new HtmlWebpackPlugin({

            template: './src/views/infoPost.html',

            filename: path.resolve(__dirname,'./template/infoPost.html'),

            title: '信息提交',

            chunks:['infoPost']
        }),
        //新建图文模板
        new HtmlWebpackPlugin({

            template: './src/views/graphicTemplate.html',

            filename: path.resolve(__dirname,'./template/graphicTemplate.html'),

            title: '新建图文模板',

            chunks:['graphicTemplate']
        }),
        //报名
        new HtmlWebpackPlugin({

            template: './src/views/signUp.html',

            filename: path.resolve(__dirname,'./template/signUp.html'),

            title: '报名',

            chunks:['signUp']
        }),
        //运营
        new HtmlWebpackPlugin({

            template: './src/views/operate.html',

            filename: path.resolve(__dirname,'./template/operate.html'),

            title: '运营',

            chunks:['checked']
        }),
        //运营首页
        new HtmlWebpackPlugin({

            template: './src/views/operate_index.html',

            filename: path.resolve(__dirname,'./template/operate_index.html'),

            title: '运营首页',

            chunks:['checked']
        }),
        //活动列表
        new HtmlWebpackPlugin({

            template: './src/views/activityList.html',

            filename: path.resolve(__dirname,'./template/activityList.html'),

            title: '活动列表',

            chunks:['checked']
        }),
        //新建活动
        new HtmlWebpackPlugin({

            template: './src/views/addActivity.html',

            filename: path.resolve(__dirname,'./template/addActivity.html'),

            title: '新建活动',

            chunks:['addActivity']
        }),
        //数据
        new HtmlWebpackPlugin({

            template: './src/views/dataInfo.html',

            filename: path.resolve(__dirname,'./template/dataInfo.html'),

            title: '数据',

            chunks:['dataInfo']
        }),
        //直播
        new HtmlWebpackPlugin({

            template: './src/views/addLive.html',

            filename: path.resolve(__dirname,'./template/addLive.html'),

            title: '直播',

            chunks:['addLive']
        }),
        //答题
        new HtmlWebpackPlugin({

            template: './src/views/answer.html',

            filename: path.resolve(__dirname,'./template/answer.html'),

            title: '答题',

            chunks:['answer']
        }),
        //答题管理
        new HtmlWebpackPlugin({

            template: './src/views/answerSwitch.html',

            filename: path.resolve(__dirname,'./template/answerSwitch.html'),

            title: '答题管理',

            chunks:['answerSwitch']
        })
    ],
    
    devServer:{
        
        contentBase:'./'
    }
}