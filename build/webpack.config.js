var path = require('path');
var config = require('../config');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var paths = config.default.utilsPaths;

module.exports = {
    resolve: {
        root: paths.site(),
        extensions: ['', '.js', '.jsx', '.json']
    },
    entry: [
        'babel-polyfill',
        paths.site('main.js'),
        'webpack-hot-middleware/client'
    ],
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            include: [ paths.site() ],
            exclude: /node_modules/,
            query: {
                plugins: ['transform-runtime', 'transform-class-properties'],
                presets: ['es2015', 'react', 'stage-2', 'node5']
            }
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('css!sass')
        }]
    },
    output: {
        path: paths.public(),
        filename: 'bundle.js'
    },
    plugins: [
        new ExtractTextPlugin('[name].css', { allChunks: true }),
        new webpack.DefinePlugin(config.default.globals),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: paths.public('index.html'),
            hash: false,
            filename: 'index.html',
            inject: 'body',
            favicon: paths.site('static/favicon.ico'),
            minify: {
                collapseWhitespace: true
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ]
};