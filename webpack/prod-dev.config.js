var conf = require('./base.config');

conf.debug = false;
conf.watch = false;
//conf.devtool = "cheap-module-source-map";
conf.devtool = "source-map";

module.exports = conf;