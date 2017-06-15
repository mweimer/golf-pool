const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const isProd = (process.env.NODE_ENV === 'prod');

const PATHS = {
    app: path.join(__dirname, 'src'),
    build: path.join(__dirname, './docs')
};

const config = {
    entry:  { 
        app: PATHS.app + '/index.js',
        vendor: ['angular', 'angular-google-analytics', 'angular-route', 'angular-sanitize', 'babel-polyfill', 'bootstrap', 'jquery', 'lodash']
    },
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.(png|ico)$/, loader: 'file-loader?name=[name].[ext]'}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: 'src/index.html',
          hash: true
        }),
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery'
        }),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' })
    ],
    devtool: 'source-map'
};

if (isProd) {
    config.module.loaders.push({
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        cacheDirectory: true,
        presets: ['es2015']
      }
    });
    config.module.loaders.push({
        test: /\.js$/,
        exclude: /src/,
        loader: 'uglify-loader'
    });
}

module.exports = config;
