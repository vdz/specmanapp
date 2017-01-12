"use strict";

const express = require('express');
const cors = require('cors');
const app = express();
const api = require('./epilogue');
const env = process.env.NODE_ENV || 'dev';
const path = require('path');
const port = (env == 'dev') ? 2000 : process.env.PORT;

const corsOptions = {
    origin : '*',
    optionsSuccessStatus : 200,
    methods : ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders : ['Accept', 'Content-Type'],
    credentials : true,

};

app.use('*', cors(corsOptions));
app.options('*', cors(corsOptions));

api.init(app);

app.use('/images', express.static(path.join(__dirname,'..', 'public/images')));
app.use('/fonts', express.static(path.join(__dirname,'..', 'public/fonts')));
app.use('/css', express.static(path.join(__dirname,'..', 'public/css')));
app.use('/js', express.static(path.join(__dirname,'..', 'public/js')));

app.all('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../index.html'));
});

const server = app.listen(port, function () {
    var port = server.address().port;
    console.log('Application server is operational on port ' + port);
});