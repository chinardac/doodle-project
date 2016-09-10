import _ from 'lodash';
import _debug from 'debug';
import express from 'express';
import webpack from 'webpack';
import proxy from 'express-request-proxy';
import url from 'url';

import webpackConfig from '../build/webpack.config';
import WebpackDevServer from 'webpack-dev-server';
import webpackHMRMiddleware from 'webpack-hot-middleware';

export const apply = (app) => {
    const debug = _debug('app:server:webpack');

    debug('Enable webpack dev middleware and hot module replacement.');

    const compiler = webpack(webpackConfig);
    app.use(webpackHMRMiddleware(compiler));

    app.use('/*', (req, res, next) => {
        let suffix = '/';

        if (/(\.(css|js|eot|woff2|woff|ttf|svg|png|jpg|ico))/.test(req.baseUrl)) {
            suffix = req.baseUrl;
        }

        proxy({ url: url.parse(`http://localhost:8081${suffix}`) })(req, res, next);
    });

    const server = new WebpackDevServer(compiler, {
        contentBase: __dirname,
        hot: true,
        quiet: false,
        noInfo: false,
        stats: {
            chunks: false,
            colors: true
        }
    });

    server.listen(8081, 'localhost', _.noop);
};
