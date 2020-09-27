const config = {
    __NEW__: "http:www.baidu.com",
    __URL__: "http:www.muguilin.com:81",
    user: {
        name: '沐枫',
        age: 29,
        job: 'Web前端'
    },
    get name() {
        return this.user.name
    },
    set name(val) {
        this.user.name = val;
    },
    userAgent: window.navigator.userAgent
};