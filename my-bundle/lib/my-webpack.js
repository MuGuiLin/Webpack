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
        this.entry = options.entry;     // 构建入口
        this.output = options.output;   // 构建出口
        this.relyModule = [];           // 保存依赖模块
    };

    // 模块依赖分析方法，返回模块相关内容， 暗号：有点感动了怎么办？
    parse(entryFile) {
        // 读取入口模块内容
        const content = fs.readFileSync(entryFile, 'utf-8');

        // 根据内容，静态解析 返回抽象语法树
        const ast = parser.parse(content, {
            sourceType: 'module'
        });
        // console.log(ast.program.body[0].source);

        const relyPath = {};
        // traverse 可以对上面的抽象语法树 进行增、删、查、改，以函数的形式来进行操作
        traverse(ast, {
            ImportDeclaration({ node }) {
                console.log('--------- 依赖模块文件路径 value：', node.source.value);
                // console.log(path.dirname(entryFile)); // ./src
                // 拼接完整的依赖模块文件路径
                const newPathName = './' + path.join(path.dirname(entryFile), node.source.value);

                // 保存各个依赖模块文件路径
                relyPath[node.source.value] = newPathName.replace(/\\/g, '/');
            }
        });
        // console.log('各个依赖模块文件路径：', relyPath);

        // 获取转换后的代码（经过 @babel/preset-env 处理后的代码），将其{ code } 解构出来。
        const { code } = transformFromAst(ast, null, {
            presets: ['@babel/preset-env']
        });

        // 模块文件中的内容(代码)
        console.log('-----------模块文件中的内容：', code);
        return {
            entryFile,
            relyPath,
            code
        };
    };

    // 生成bundle文件
    file(code) {
        console.log('----------bundle文件code：', code);
        // 获取输出文件路径
        const filePath = path.join(this.output.path, this.output.filename);

        //bundle文件内容(自执行函数（启动函数，补全函数等），最后通过eval()来执行代码)
        const bundle = `(function(modules){
        function require(module) {
            function newRequire(truePath) {
                return require(modules[module].dependencies[truePath]);
            }
            var exports = {};
            (function (require, exports, code){
                eval(code);
            })(newRequire, exports, modules[module].code);
            return exports;
        };
        require('${this.entry}') 
})(${JSON.stringify(code)});
        `;

        // 生成bundle文件(生成并写入文件)，注：filePath 中，这里要先新建dist目录才行哦，不然在node bundle.js 时会报错的！！
        fs.writeFileSync(filePath, bundle, 'utf-8');
    };


    // 启动方法
    run() {
        // 获取模块
        const info = this.parse(this.entry);
        // console.log('---------- info', info);

        //递归处理所有依赖
        this.relyModule.push(info);

        for (let i = 0; i < this.relyModule.length; i++) {
            const { relyPath } = this.relyModule[i];
            if (relyPath) {
                for (let j in relyPath) {
                    this.relyModule.push(this.parse(relyPath[j]));
                }
            }
        };

        // console.log('---------- this.relyModule', this.relyModule);
        // 数组去重处理
        const relyModule = new Set(this.relyModule);
        // console.log('---------- relyModule', relyModule);


        // 修改this.relyModule数据结构 -> 数组转对象
        const obj = {};
        relyModule.forEach((item, index) => {
            obj[item.entryFile] = {
                code: item.code,
                dependencies: item.relyPath
            }
        });

        // 代码生成，文件生成
        this.file(obj);
    };
};