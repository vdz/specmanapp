module.exports = {
    entry : './index.js',
    output : {
        path: __dirname + '/../public/js',
        filename: 'index.js',
        sourceMapFilename : '[file].map'
    },
    module: {
        noParse: /node_modules\/json-schema\/lib\/validate\.js/,
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015-webpack2', 'stage-2']
                }
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            }
        ]
    },
    plugins : [],
    node : {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};
