const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin')

module.exports = {
    optimization: {
        minimize: true,
        minimizer:  [
            new TerserPlugin({
              test: /\.js(\?.*)?$/i,
            }),
          ],
    },
    entry: './src/client/index.js',
    mode: 'production',
    output: {
        libraryTarget: 'var',
        library: 'Client',
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist'),
    },

    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.(s*)css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                            
                test: /\.jpe?g$|\.gif$|\.png$/i,
                loader: "file-loader?name=/img/[name].[ext]"
            
                // test: /\.(png|jpe?g|gif)$/i,
                // use: [
                //   {
                //     loader: 'file-loader',
                //   },
                // ],

                // test: /\.(png|jpe?g|gif|svg)$/i,
                // loader: 'file-loader',
                // options: {
                //     name: '[path][name].[ext]',
                //   },
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
            title: 'Progressive Web Application',
        }),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].css'
        }),
        // new ExtractTextPlugin('styles.css'),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.optimize\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
            preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
        }),
        new CopyWebpackPlugin({
             patterns: [
                {
                    from: path.resolve(__dirname, 'src/client/media/icons'),
                    to:'img'
                    }, 
            ],
        }), 
    ]
}
