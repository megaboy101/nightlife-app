import path from 'path';

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
            {test: /\.css$/, exclude: /node_modules/, loader: 'style-loader!css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]'}, // css loader with modules activated
            {test: /\.css$/, include: /node_modules/, loader: 'style-loader!css-loader'}, // Without modules, for react notification library
			{test: /\.(scss|sass)$/, exclude: /node_modules\/(?!bulma)/, loader: ['style-loader', 'css-loader', 'sass-loader']},
			{test: /\.(jpg|png)$/, exclude: /node_modules/, loader: 'url-loader'},
            {test: /\.svg$/, exclude: /node_modules/, loader: 'react-svg-loader'},
            {test: /\.(eot|svg|ttf|woff|woff2)$/, include: /node_modules/, loader: 'file-loader'}
        ]
    },

    target: 'web',

    devServer: {
        contentBase: path.resolve(__dirname, 'src')
    },
    
    devtool: 'cheap-module-eval-source-map'
};