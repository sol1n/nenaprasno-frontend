'use strict';

const NODE_ENV = process.env.NODE_ENV || 'dev';
const webpack = require('webpack');

module.exports = {
    entry: "./app/main.js",
    output: {
        path: __dirname + "/build",
        filename: "app.js"
    },
    watch: NODE_ENV == 'dev',
    devtool: NODE_ENV == 'dev' ? "source-map": null,
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                loader: 'babel'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        })
    ]
};

if (NODE_ENV == 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    );
}