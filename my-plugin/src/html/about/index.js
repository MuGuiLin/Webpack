import css from '../../css/base.css';

// console.log(module);
if (module.hot) {
    // 监听指定文件
    module.hot.accept('../../js/config.js', () => {
        console.log('config.js被修改了！！！')
    });
};
