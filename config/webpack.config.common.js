const path = require('path');
const appDirectory = path.resolve(__dirname, '../');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const exts = ['.tsx', '.ts', '.js'];

module.exports = {
    entry: '../src/client/index.tsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(appDirectory, 'dist'),
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new CleanWebpackPlugin(['dist'], {
            root: path.resolve(appDirectory)
        })
    ],
    resolve: {
        extensions: exts,
        plugins: [
            new TsconfigPathsPlugin({
                extensions: exts
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'babel-loader!ts-loader',
                include: path.resolve(appDirectory, 'src/client'),
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: path.resolve(appDirectory, 'src/client'),
            },
            {
                exclude: [
                    /\.html$/,
                    /\.jsx?$/,
                    /\.tsx?$/,
                    /\.json$/,
                    /\.css$/
                ],
                loader: 'url-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};
