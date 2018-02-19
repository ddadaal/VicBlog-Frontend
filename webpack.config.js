const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// variables
const isProduction = process.env.NODE_ENV === 'production';
const sourcePath = path.join(__dirname, './src');
const outPath = path.join(__dirname, './dist');
const moment = require("moment");
const blogConfig = require("./blog.config");

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const basePlugins = [
  new webpack.LoaderOptionsPlugin({
    options: {
      context: sourcePath
    }
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.bundle.js',
    minChunks: Infinity
  }),
  new webpack.optimize.AggressiveMergingPlugin(),

  new webpack.optimize.ModuleConcatenationPlugin(),
  new HtmlWebpackPlugin({
    template: './assets/index.html',
    favicon: './assets/logo.png',
    filename: 'index.html'
  }),
  new HtmlWebpackPlugin({
    template: './assets/404.html',
    favicon: './assets/logo.png',
    filename: '404.html'
  }),
  new webpack.DefinePlugin({
    FRONT_END_BUILD: JSON.stringify(moment().format(blogConfig.buildFormat)),
    FRONT_END_BUILD_TIME: JSON.stringify(moment().format(blogConfig.buildTimeFormat))
  })
];

const devPlugins = [
  new webpack.DefinePlugin({
    APIROOTURL: JSON.stringify(blogConfig.devBackend)
  }),
  new ExtractTextPlugin({
    filename: 'styles.css',
  }),
  new webpack.NamedModulesPlugin()
];

const prodPlugins = [
  new webpack.DefinePlugin({
    APIROOTURL: JSON.stringify(blogConfig.liveBackend),
  }),
  new UglifyJSPlugin(),

];

const plugins = basePlugins.concat(isProduction ? prodPlugins : devPlugins);

module.exports = {
  context: sourcePath,
  entry: {
    main: './index.ts',
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'mobx',
      'mobx-react',
      'mobx-react-router',
      'office-ui-fabric-react'
    ]
  },
  output: {
    path: outPath,
    filename: 'entry.bundle.[hash:5].js',
    chunkFilename: '[name].bundle.[hash:5].js',
    publicPath: '/'
  },
  target: 'web',

  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    // Fix webpack's default behavior to not load packages with jsnext:main module
    // (jsnext:main directs not usually distributable es6 format, but es6 sources)
    mainFields: ['module', 'browser', 'main']
  },
  plugins: plugins,
  module: {
    loaders: [
      // .ts, .tsx
      {
        test: /\.tsx?$/,
        use: isProduction
          ? 'awesome-typescript-loader'
          : [
            'react-hot-loader/webpack',
            'awesome-typescript-loader'
          ]
      },
      // css 
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              query: {
                modules: true,
                sourceMap: !isProduction,
                importLoaders: 1,
                localIdentName: '[local]__[hash:base64:5]'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  require('postcss-import')({addDependencyTo: webpack}),
                  require('postcss-url')(),
                  require('postcss-cssnext')(),
                  require('postcss-reporter')(),
                  require('postcss-browser-reporter')({disabled: isProduction}),
                ]
              }
            }
          ]
        })
      },
      // static assets 
      {test: /\.html$/, use: 'html-loader'},
      {test: /\.png$/, use: 'url-loader?limit=10000'},
      {test: /\.jpg$/, use: 'file-loader'},
      {test: /\.md$/, use: 'raw-loader'}
    ],
  },

  devServer: {
    contentBase: sourcePath,
    hot: true,
    stats: {
      warnings: false
    },
  },
  node: {
    // workaround for webpack-dev-server issue 
    // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
    fs: 'empty',
    net: 'empty'
  }
};