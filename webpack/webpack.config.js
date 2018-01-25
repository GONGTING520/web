const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const entry = require('./src/webpack_config/entry.js');

module.exports = {
    entry: entry,
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'http://127.0.0.1:8888/'
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
        }),
        new UglifyJsPlugin(),
        new ExtractTextPlugin('css/index.css'),
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, 'src/*.html')),
        }),
        new webpack.BannerPlugin('龚婷'),
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['jquery', 'vue'],
            filename: 'source/[name].js',
            minChunks: 2
        }),
        new CopyWebpackPlugin([{
            from: './src/public',
            to: './public'
        }]),
    ],
    module: {
        rules: [{
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    }, 'postcss-loader']
                })
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 500,
                        outputPath: 'img/'
                    }
                }]
            },
            {
                test: /\.(html|htm)$/i,
                use: [{
                    loader: 'html-withimg-loader'
                }]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react']
                    }
                },
                exclude: /node_modules/
            },
        ]
    },
    watchOptions: {
        poll: 1000,
        aggregateTimeout: 500,
        ignored: /node_modules/
    }
};