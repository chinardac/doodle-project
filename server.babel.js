var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

var environment = require('./environment/environment');
var router = require('./app/routers/mainRouter');

var proxy = httpProxy.createProxyServer();
var app = express();
var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 3030;
var publicPath = path.resolve(__dirname, 'public');
var db;

app.use(express.static(publicPath));

MongoClient.connect(environment.getConfigUrl(environment.mongo), (err, database) => {
    if(err) return console.err(err);

    db = database;
});

if (!isProduction) {
    var bundle = require('./server/bundle.js');
    bundle();

    app.all('/public/*', function (req, res) {
        proxy.web(req, res, {
            target: 'http://localhost:52671'
        });
    });
}

app.use((req, res, next) => {
    req.db = db;
    next();
});

app.use('/api', router);

proxy.on('error', function(e) {
    console.log(e);
    console.log('Could not connect to proxy, please try again...');
});

app.listen(port, function () {
    console.log('Express server running on port ' + port);
});
