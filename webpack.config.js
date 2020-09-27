'use strict';

const path = require('path');	//path 是 node.js的模块，webpack由node.js写成

// nodejs 内置的path模块　并在它前面加上 __dirname这个全局变量。可以防止不同操作系统之间的文件路径问题，并且可以使相对路径按照预期工作。
// Node.js 中，__dirname 总是指向被执行 js 文件的绝对路径，所以当你在 /d1/d2/myscript.js 文件中写了 __dirname， 它的值就是 /d1/d2 。


//var proxy = require('http-proxy-middleware')
//const context = [`/login`, `/admin/*`]
module.exports = {
	
	entry:"./js/main.js",//入口文件
	
	output:{//输出路径
	
		//path:"./", //输出路径 注：必须是一个绝对路径，不能是相对路径的
		path: path.join(__dirname, 'build'),
		
		filename:"bundle.js"//输出文件名称
	},
	module:{//依赖
//		 devServer: {
//         host: 'localhost',
//         port: '3011',
//         proxy: [
//             {
//                  context: context,
//                  target: 'http://172.28.10.84/',
//                  secure: false
//            }
//         ]
//      },
		loaders:[
			{
				test:/\.js$/,//正则表达式，把我们的js结尾的文件按照我们的jsx-loader进行解析（如果你的组件后缀是jsx的，那么此时你就应该写/\.jsx$/）
				loader:"jsx-loader"//依赖的loader
				
			},{
				test:/\.less$/,
				loader:"style!css!less"
				
			},
			{   test:/\.(png|jpg)$/,
				loader:'url-loader?limit=10000'
			},//限制大小小于10k的
			{	//处理文字时使用
				test:/\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
				loader:'file-loader?name=[name].[ext]'
			}
		]
		
	}
}
