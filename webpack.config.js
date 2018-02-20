'use strict';
let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require("extract-text-webpack-plugin");

const UnminifiedWebpackPlugin = require("unminified-webpack-plugin");
const UglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin");
const extractSass = new ExtractTextPlugin({filename: "main.css"});
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'build.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this necessary.
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                use: ['babel-loader', 'jshint-loader'],
                exclude: /node_modules/
            },
            // {
            //     test: /\.css$/,
            //     use: ExtractTextPlugin.extract({
            //         fallback: "style-loader",
            //         use: "css-loader"
            //     })
            // },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                        fallback: 'style-loader',
                        use: ["css-loader", "resolve-url-loader", {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    autoprefixer({
                                        browsers: ['ie >= 8', 'last 4 version']
                                    })
                                ],
                                sourceMap: true
                            }
                        }, 'sass-loader']
                    }
                )
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            publicPath: '../dist/',
                            outputPath: 'images/'
                        }
                    }
                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            publicPath: '../dist/',
                            outputPath: 'media/'
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            publicPath: '../dist/',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },
    plugins: [
        // new ExtractTextPlugin("main.css"),
        // ************************************* //
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new UglifyjsWebpackPlugin(),
        new UnminifiedWebpackPlugin(),
        extractSass,
        // ************************************* //
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            '_': 'lodash',
            'Sau': ['/var/www/html/sau/vue/nicGen/lib/Sau.js']
        })
    ],
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}
