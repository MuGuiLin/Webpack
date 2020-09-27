import base from '../css/base.css';
import home from '../css/home.less';

class Home {
    constructor() {
        this.init();
    };

    init() {
        Home.numSun()
    };

    static numSun() {
        Home.num = Home.num + 1;
        console.log(this.num, Home.num);
    }
};
Home.num = 0;

module.exports =  new Home();