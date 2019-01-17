const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.common');

module.exports = merge(baseConfig, {
    mode: 'production'
});
