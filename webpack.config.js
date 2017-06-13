const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const PATHS = {
    app: path.join(__dirname, 'src'),
    build: path.join(__dirname, './docs')
};

module.exports = {
    entry:  PATHS.app + "/index.js",
    output: {
        path: PATHS.build,
        filename: "golf.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader" },
            {test: /\.(png|ico)$/, loader: "file-loader?name=[name].[ext]"}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: 'src/index.html'
        })
    ],
    devtool: 'source-map'
};
