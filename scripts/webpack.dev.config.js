
const webpack = require('webpack')
const merge = require('webpack-merge')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const webpackConfigBase = require('./webpack.base.config')

const PORT = 3010

const webpackConfigDev = {
  plugins: [
    // 定义环境变量为开发环境
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      IS_DEVELOPMETN: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor', // 入口文件名
      filename: 'vendor.bundle.js', // 打包后的文件名
    }),
    new OpenBrowserPlugin({
      url: `http://localhost:${PORT}/#/login`,
    }),
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: '../app/',
    historyApiFallback: false,
    hot: false,
    // inline: false,
    // proxy: casProxy(),
    host: '0.0.0.0',
    port: PORT,
    // stats: { colors: true },
  },
}

module.exports = merge(webpackConfigBase, webpackConfigDev)
