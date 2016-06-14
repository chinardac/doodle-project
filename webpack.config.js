var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: ['webpack/hot/dev-server', './app/main.jsx'],
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js',
        publicPath: '/public/'
    },
    module: {
        loaders: [{
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('css!sass')
        }, {
            test: /.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react']
            }
        }]
    },
    plugins: [
        new ExtractTextPlugin('styles.css', {
            allChunks: true
        })
    ]
};
