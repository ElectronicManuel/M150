const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.common');

module.exports = merge(baseConfig, {
    mode: 'development',
    devServer: {
        contentBase: 'dist',
        port: '3000',
        historyApiFallback: true
    },
    watch: true
});
