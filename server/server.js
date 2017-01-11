"use strict";

const express = require('express');
const app = express();
const api = require('./epilogue');
var env = process.env.NODE_ENV || 'dev';
const path = require('path');
const port = (env == 'dev') ? 2000 : process.env.PORT;

process.on('uncaughtException', function(err) {
    // handle the error safely
    console.log(err);
});

app.use('*', function(req, res, next) {
    var origin = req.get('origin');
    res.header('Access-Control-Allow-Origin', origin);
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    //res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    //res.header('Access-Control-Allow-Headers', 'accept, content-type, x-requested-with x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');
    res.send(200);
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
});

app.use('/images', express.static(path.join(__dirname,'..', 'public/images')));
app.use('/fonts', express.static(path.join(__dirname,'..', 'public/fonts')));
app.use('/css', express.static(path.join(__dirname,'..', 'public/css')));
app.use('/js', express.static(path.join(__dirname,'..', 'public/js')));

api.init(app);

app.all('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../index.html'));
});

const server = app.listen(port, function () {
    var port = server.address().port;
    console.log('Application server is operational on port ' + port);
});