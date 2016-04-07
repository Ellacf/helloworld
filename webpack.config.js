require('babel/register');
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var HtmlwebpackPlugin = require('html-webpack-plugin');
// 定义一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var TEMP_PATH = path.resolve(ROOT_PATH, 'templates');

// 定义参数
const config = {
    devtool: 'inline-source-map', //eval-source-map
    // 项目的文件夹，可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字。三个入口文件
    entry: {
        app: path.resolve(APP_PATH, 'index.js'),
        mobile: path.resolve(APP_PATH, 'mobile.js'),
        // 添加要打包在vendors里面的库
        vendors:['promise','jquery', 'moment', 'lodash']
    },
    output: {
        path: BUILD_PATH,
        filename: '[name].[hash].js',
        publicPath: '/'
    },
    resolve: {
        extensions:['', '.js', '.jsx']
    },
    module: {
        preLoaders: [{
            test: /\.jsx?$/,
            include: APP_PATH,
            loader: "jshint-loader"
        }],
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel',
            include: APP_PATH
            // query: {
            //     presets: ['react', 'es2015']
            // }
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
    // 配置jshint的选项，支持ES6的校验
    // any jshint option http://www.jshint.com/docs/options/
    jshint: {
        "esnext": true
    },
    //  添加插件，自动生成html文件
    plugins: [
        new HtmlwebpackPlugin({
            title: 'Hello World App',
            template: path.resolve(TEMP_PATH, 'index.html'),
            filename: 'index.html',
            // chunks这个参数告诉插件要引用entry里面的哪几个入口
            chunks: ['app', 'vendors'],
            // 要把script插入到标签中
            inject: 'body'
        }),
        new HtmlwebpackPlugin({
            title: 'Hello Mobile App',
            template: path.resolve(TEMP_PATH, 'mobile.html'),
            filename: 'mobile.html',
            chunks: ['mobile', 'vendors'],
            inject: 'body'
        }),
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
// const app = express();
// const compiler = webpack(config);
// app.use(express.static(__dirname + '/build'));
// app.use(webpackMiddleware(compiler));
// app.get('*', function response(req, res) {
//     res.sendFile(path.join(__dirname, 'build/index.html'));
// });
// app.listen(3000);
