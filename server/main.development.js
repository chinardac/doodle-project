import _ from 'lodash';
import _debug from 'debug';
import express from 'express';
import webpack from 'webpack';
import proxy from 'express-request-proxy';
import url from 'url';
import { MongoClient } from 'mongodb';

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

  MongoClient.connect('mongodb://chinar.dac:8800578234@ds021346.mlab.com:21346/doodle', (err, database) => {
      app.use((req, res, next) => {
          req.db = database;
          console.log(req.db);
          next();
      });
  });

  app.use('/*', (req, res, next) => {
    let suffix = '/';

    if (/(\.(css|js|eot|woff2|woff|ttf|svg|png|jpg|ico))/.test(req.baseUrl)) {
      suffix = req.baseUrl;
    }

    proxy({ url: url.parse(`http://localhost:3030${suffix}`) })(req, res, next);
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

  server.listen(3030, 'localhost', _.noop);
};
