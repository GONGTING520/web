const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js',
        index2: './src/index2.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: './dist/index.html',
        host: '127.0.0.1',
        compress: true,
        port: '8888'
    },
    plugins: [
        new HtmlPlugin({
            minify: {
                removeArrtributeQuotes: true
            },
            hash: true,
            template: './src/index.html'
        })
    ]
};