const config = require('./webpack.config');
const webpack = require('./lib/my-webpack');

const Webpack = new webpack(config);

// 启动
Webpack.run();