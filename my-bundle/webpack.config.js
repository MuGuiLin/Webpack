const path = require('path');

module.exports = {
    entry: './src/index.js',

    output: {
        filename: 'main.js',
        path: path.join(__dirname, '/dist')
    },

    mode: 'development',


    module: {

    },

    plugins: [

    ],

    devServer: {

    }
};