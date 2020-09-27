import css from '../../css/home.css';

import config from '../../js/config.js';

console.log(config);

let index = 1;
const btn = document.createElement('button');
btn.innerHTML = '添加DIV';
document.body.appendChild(btn);

btn.onclick = () => {
    const div = document.createElement('div');
    div.innerHTML = `我是第 ${index++} 个div`;
    document.body.appendChild(div);
};


// console.log(module);
if(module.hot) {
    // 监听指定文件
    module.hot.accept('../../js/config.js', () => {
        console.log('config.js被修改了！！！')
    });
};

config.set__URL__(666);
console.log(config);

console.debug(config.getTime());
