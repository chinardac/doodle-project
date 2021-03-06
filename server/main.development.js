import _ from 'lodash';
import _debug from 'debug';
import express from 'express';
import webpack from 'webpack';
import proxy from 'express-request-proxy';
import url from 'url';
import { MongoClient } from 'mongodb';

import env from '../environment/environment';
import config from '../config';
import webpackConfig from '../build/webpack.config';
import WebpackDevServer from 'webpack-dev-server';
import webpackHMRMiddleware from 'webpack-hot-middleware';

const paths = config.utilsPaths;

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

    proxy({ url: url.parse(`${env.getConfigUrl(env.webpack)}${suffix}`) })(req, res, next);
  });

  const server = new WebpackDevServer(compiler, {
    contentBase: paths.public(),
    hot: true,
    quiet: false,
    noInfo: false,
    stats: {
      chunks: false,
      colors: true
    }
  });

  server.listen(env.webpack.port, env.webpack.hostname, _.noop);
};
