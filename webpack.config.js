var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
        'webpack/hot/dev-server',
        './server.js',
        './app/main.jsx',
        'webpack-dev-server/client?http://localhost:52671'
    ],
    output: {
        path: __dirname + '/public',
        filename: '[name].bundle.js',
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
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('css!sass')
        }]
    },
    plugins: [
        new ExtractTextPlugin('styles.css', {
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};
