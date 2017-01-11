"use strict";

const express = require('express');
var cors = require('cors');
const app = express();
const api = require('./epilogue');
var env = process.env.NODE_ENV || 'dev';
const path = require('path');
const port = (env == 'dev') ? 2000 : process.env.PORT;

process.on('uncaughtException', function(err) {
    // handle the error safely
    console.log(err);
});

app.use(cors());

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