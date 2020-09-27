/**
 * 自定义webpack插件
 * 实现记录webpack在每次打包结束，自动生成一个打包文件清单，文件中要记录对应的文件名、文件数据量、文件大小等信息。
 */

class FileDocWebpackPlugin {
    constructor(options) {
        console.log('在constructor接收plugins实例化时传过来的参数：', options);
        this.opts = options;
    };

    // 如何钩入hooks 生命周期
    // 注：每个自定义插件都必须有一个apply方法，用于在webpack构建时会执行这个文法，以获取compiler参数
    apply(compiler) {

        // emit.tapAsync()异步 https://webpack.docschina.org/api/compiler-hooks/#emit
        compiler.hooks.emit.tapAsync('FileDocWebpackPlugin', (compilation, callback) => {

            // console.dir('-------------------', compilation.assets);
            let doc = '======== 构建文件清单 ========',
                len = 0;
                doc += '\n\n序号   |   文件名称   |   文件大小';
            Object.keys(compilation.assets).forEach((o, i) => {
                len = ++i;
                doc += `\n ${i}    |   ${o}     |   ${this.size(compilation.assets[o].size())}`;
                // console.log('文件内容：', compilation.assets[o].source());
            });
            // 暗号：做人嘛，最重要的就是开心！
            doc += `\n\n文件合计数量：${Object.keys(compilation.assets).length || len}个`;

            // console.log('构建(打包)时的资源对象(就是被打包的所有文件)：', compilation.assets);
            compilation.assets[`${this.opts.name}.txt`] = {
                // 设置文件内容
                source: function () {
                    return doc;
                },
                // 设置文件大小
                size: function () {
                    return 2048; // 2kb;
                },
            };

            // 由于tapAsync()是异步的，所以当上面执行完后，一定要执行回调函数callback()才生效！
            callback();
        });
    };

    // 文件大小单位计算
    size(size) {
        if (size > (1024 * 1024)) {
            return (Math.round(size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
        } else {
            return (Math.round(size * 100 / 1024) / 100).toString() + 'KB';
        }
    };
};

module.exports = FileDocWebpackPlugin;