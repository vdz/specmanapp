var conf = require('./base.config');

conf.debug = true;
conf.watch = true;
//conf.devtool = "cheap-module-source-map";
conf.devtool = "source-map";

module.exports = conf;