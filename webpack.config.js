var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: ['webpack/hot/dev-server', './app/main.jsx'],
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js',
        publicPath: '/public/'
    },
    module: {
        loaders: [{
            test: /.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react']
            }
        }]
    },
};
