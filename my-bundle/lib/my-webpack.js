const fs = require('fs');
const path = require('path');

const parser = require('@babel/parser'); // https://www.babeljs.cn/docs/babel-parser
const traverse = require('@babel/traverse').default; // https://www.babeljs.cn/docs/babel-traverse
const { transformFromAst } = require('@babel/core'); // https://www.babeljs.cn/docs/babel-core

/**
 * 自定义实现简版 webpack
 *      
 * 主要是借助：node.js 和 babel 工具来处理
 */
module.exports = class webpack {

    constructor(options) {
        // console.log('webpack.config.js 配置项：', options);
        this.entry = options.entry;
        this.output = options.output;

        this.relyModule = [];
    };

    // 启动方法
    run() {
        const info = this.parse(this.entry);

        //递归处理所有依赖
        this.relyModule.push(info);

        // 修改数据结构 数组转对象
        const obj = {};

        // 代码生成，文件生成
        this.file(obj);
    };

    // 模块解析方法，返回模块相关内容
    parse(entryFile) {
        // 读取模块内容
        const content = fs.readFileSync(entryFile, 'utf-8');
        // console.log(content);

        // 根据内容，静态解析 返回抽象语法树
        const ast = parser.parse(content, {
            sourceType: 'module'
        });
        // console.log(ast.program.body[0].source);

        /**
         * traverse 可以对上面的抽象语法树 进行增、删、查、改，以函数的形式来进行操作
         */
        const relyPath = {};
        traverse(ast, {
            ImportDeclaration({ node }) {
                // console.log('---------node：', node);
                console.log('--------- 依赖模块文件路径 value：', node.source.value);

                // console.log(path.dirname(entryFile)); // ./src

                // 拼接完整的依赖模块文件路径
                const newPathName = path.join(path.dirname(entryFile), node.source.value);
                console.log(newPathName);

                // 保存各个依赖模块文件路径
                relyPath[node.source.value] = newPathName;
            }
        });
        // console.log('各个依赖模块文件路径：', relyPath);

        // 获取转换后的代码（经过 @babel/preset-env 处理后的代码）
        const code = transformFromAst(ast, null, {
            presets: ['@babel/preset-env']
        });
        console.log(code);

        return {
            entryFile,
            relyPath,
            code
        };
    };

    file(code) {
        console.log(code);
    };
};