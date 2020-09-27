/**
 * 自定义插件：
 *  在构建(打包)时自动生成一个xxx.txt文本文件
 *  https://webpack.docschina.org/api/compiler-hooks/
 * 
 * webpack 从构建(打包)开始 到 结束，都是有生命周期(钩子)的。
 */


class TxtWebpackPlugin {
    constructor(options) {
        console.log('在constructor接收plugins实例化时传过来的参数：', options);
        this.opts = options;
    };

    // 如何钩入hooks 生命周期
    // 注：每个自定义插件都必须有一个apply方法，用于在webpack构建时会执行这个文法，以获取compiler参数
    apply(compiler) {
        // console.log('-------------compiler：', compiler);

        // emit.tapAsync()异步 https://webpack.docschina.org/api/compiler-hooks/#emit
        compiler.hooks.emit.tapAsync('TxtWebpackPlugin', (compilation, callback) => {

            // console.log('构建(打包)时的资源对象(就是被打包的所有文件)：', compilation.assets);
            compilation.assets[`${this.opts.name}.txt`] = {

                // 设置文件内容
                source: function() {
                    return `我是webpack自定义插件，动态生成的txt文件，这里的内容是自定义的！！`;
                },
                // 设置文件大小
                size: function() {
                    return 1024; // 1kb;
                },
            };

            // 由于tapAsync()是异步的，所以当上面执行完后，一定要执行回调函数callback()才生效！
            callback();
        });

        // compile.tap()同步  https://webpack.docschina.org/api/compiler-hooks/#compile
        compiler.hooks.compile.tap('TxtWebpackPlugin', (compilation) => {
            console.log('---------------compiler.hooks.compile.tap');
            // compilation.assets[`mupiao.txt`] = {

            //     // 设置文件内容
            //     source: function() {
            //         return `我是webpack自定义插件，动态生成的txt文件，这里的内容是自定义的！！`;
            //     },
            //     // 设置文件大小
            //     size: function() {
            //         return 1024; // 1kb;
            //     },
            // };
        });
    };

};

module.exports = TxtWebpackPlugin;