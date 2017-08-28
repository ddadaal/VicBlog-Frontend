const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const moment = require("moment");

const isDev = process.env.NODE_ENV !== 'production';

const basePlugins = [
    new webpack.DefinePlugin({
        'process.env': {
            __DEV__: isDev,
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            BACKEND_URL: JSON.stringify(process.env.BACKEND_URL)
        }
    }),
    new HtmlWebpackPlugin({
        template: './src/index.html',
        favicon: './src/assets/logo.jpg'
    }),
    new HtmlWebpackPlugin({
        title: '404 Jump Back - VicBlog',
        template: './src/404.html',
        filename: '404.html',
        chunks: []
    }),
    new ExtractTextPlugin("github-markdown.css"),
    new webpack.DefinePlugin({
        FRONT_END_BUILD: JSON.stringify(moment().format("YYYYMMDD")),
        FRONT_END_BUILDTIME: JSON.stringify(moment().format("MMM Do, YYYY, HH:mm:ss"))
    })
];

const devPlugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
        APIROOTURL: JSON.stringify("http://localhost:63511")
    }),
];

const prodPlugins = [
    new webpack.DefinePlugin({
        APIROOTURL: JSON.stringify("http://vicblogapi.azurewebsites.net"),
    })
];

const plugins = basePlugins.concat(isDev ? devPlugins : prodPlugins);

module.exports = {
    entry: {
        app: isDev ? [
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://0.0.0.0:8080',
            'webpack/hot/only-dev-server',
            './src/index'
        ] : './src/index',
    },

    plugins: plugins,

    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        historyApiFallback: true
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]-[hash].js',
        publicPath: '/',
        sourceMapFilename: '[name]-[hash].js.map',
        chunkFilename: '[id].chunk.js'
    },

    devtool: isDev ? "source-map" : "",
    resolve: {
        extensions: [
            '.ts', '.tsx',
            '.js', '.jsx',
        ]
    },
    module: {
        loaders: [
            // All .ts(x) files will be piped through ts-loader then babel
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader",
                include: path.join(__dirname, 'src')
            },
            // All .js(x) files will be piped through babel
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },

            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [{
                    loader: "file-loader",
                    options: {
                        hash: "sha512",
                        digest: "hex",
                        name: "images/[name]-[hash].[ext]'"
                    }
                }]
            }, {
                test: /\.html$/,
                loader: "raw-loader"
            }
        ],
    },
}
