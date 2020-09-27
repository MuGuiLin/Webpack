module.exports = {
    __URL__: 'http://www.muguilin:81',
    __NET__: 'http://www.2345.com/?kmupiao',

    // 利用js对象的getter和setter方法，重写js对象属性
    set__URL__(val){
        this.__URL__ = val;
    },
    get__URL__(){
        return this.__URL__;
    },

    getTime(){
        return new Date().toTimeString();
    }
};