let path = require('path');
let webpack = require('webpack');
module.exports = {
    entry: './src/index.js',
    mode:"development",
    output: {
        path: __dirname,
        filename: './src/bundle.js'
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
