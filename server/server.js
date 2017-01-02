"use strict";

const express = require('express');
const app = express();
const api = require('./epilogue');
const path = require('path');
const port = 2000;

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