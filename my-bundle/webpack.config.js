const path = require('path');

module.exports = {
    entry: './src/index.js',

    output: {
        filename: '[name]-[hash:12].js',
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