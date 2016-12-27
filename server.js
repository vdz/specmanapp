"use strict";

var request = require('request');

const express = require('express');
const git = require('git-rev');

const app = express();
const path = require('path');
const env = process.env.NODE_ENV || 'dev';
const port = 80;

const getVersion = new Promise((resolve)=>{
    git.short((hash) => {
        resolve(hash);
    });
});

console.log(getVersion);

app.all('/*');

// Listen for requests
var server = app.listen(port, function() {
    var port = server.address().port;
    console.log('Application server is operational on port ' + port);
});
