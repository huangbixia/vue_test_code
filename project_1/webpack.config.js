/*
 * @Description: 说明
 * @Author: huangbx
 * @Date: 2021-09-05 19:03:58
 */
let path = require('path');
let webpack = require('webpack');
module.exports = {
    // entry: './src/main.js',
    entry: './src/src_1/index.js',
    mode:"development",
    output: {
        path: __dirname,
        filename: './src/build/bundle.js'
    },
  
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /(node_modules)/,
            use:{
                loader:"babel-loader",
                options:{
                    presets: ["@babel/preset-env"]
                }
            },
        }]
    },
    devServer: {
        disableHostCheck: true,
        inline: true,
        port: 8181
    },
}
