var path = require('path');
var express = require('express');
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var HtmlwebpackPlugin = require('html-webpack-plugin');
// 定义一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

// 定义参数
const config = {
    // 项目的文件夹，可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
    entry: {
        app:['webpack/hot/dev-server', APP_PATH],
        // 添加要打包在vendors里面的库
        vendors: ['jquery', 'moment']
    },
    output: {
        path: BUILD_PATH,
        filename: '[name].js',
        publicPath: '/'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel',
            include: APP_PATH,
            query: {
                presets: ['react', 'es2015']
            }
        }, {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass'],
            include: APP_PATH
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader',
            query: {
                limit: '8192',
                name: 'img/[name].[hash].[ext]'
            }
        }]
    },
    plugins: [
        // 这个使用uglifyJs压缩js代码
        new webpack.optimize.UglifyJsPlugin({minimize:true}),
        // 把入口文件里面的数组打包成vendors.js
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
    ],
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        //添加配置让ajax请求直接proxy过去
        proxy:{
            '/api/*':{
                target: 'http://localhost:3000',
                secure: false
            }
        }
    }
};
module.exports = config;
