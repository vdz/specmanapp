var conf = require('./base.config');
var webpack = require("webpack");
var uglify = new webpack.optimize.UglifyJsPlugin({
    compressor: { warnings: false },
    output: { comments: false },
    minimize: true,
    sourceMap: false,
    mangle: true
});

var prod_env = new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify("production")
});

conf.devtool = "source-map";
conf.plugins.push(prod_env);
conf.plugins.push(uglify);

module.exports = conf;