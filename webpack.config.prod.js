import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
    entry: path.resolve(__dirname, 'src/index.js'),

    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },

    module: {
        loaders: [
			{test: /\.(js|svg)$/, exclude: /node_modules/, loader: 'babel-loader'},
            {test: /\.css$/, exclude: /node_modules/, loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: [{loader: 'css-loader', options: {modules: true, localIdentName: '[name]__[local]___[hash:base64:5]'}}]})}, // css loader with modules activated

                                                                

            {test: /\.css$/, include: /node_modules/, loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'})}, // Without modules, for react notification library
			{test: /\.(scss|sass)$/, exclude: /node_modules\/(?!bulma)/, loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader', 'sass-loader']})},
			{test: /\.(jpg|png)$/, exclude: /node_modules/, loader: 'url-loader'},
            {test: /\.svg$/, exclude: /node_modules/, loader: 'react-svg-loader'},
            {test: /\.(eot|svg|ttf|woff|woff2)$/, include: /node_modules/, loader: 'file-loader'}
        ]
    },

    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new ExtractTextPlugin('styles.css'),
        new webpack.optimize.UglifyJsPlugin()
    ],

    target: 'web',

    devServer: {
        contentBase: path.resolve(__dirname, 'dist')
    },
    
    devtool: 'sourcemap'
};