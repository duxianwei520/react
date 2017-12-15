
const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config')
const fs = require('fs-extra')
const Copy = require('copy-webpack-plugin')
// const casProxy = require('./proxy');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// const PORT = 3010
// path.join(__dirname, '../dist')
// console.log(fs.existsSync('./dist'))
// fs.copy('./app/images', './dist/images')
// fs.copy('./app/iconfont', './dist/iconfont')
const webpackConfigProd = {
  output: {
    // path: path.resolve(__dirname, 'dist'),
    // filename: './vendor.js',
    // filename: '[name].js',
    path: path.join(__dirname, '../dist'),
    chunkFilename: '[name].js',
  },
  plugins: [
    // 定义环境变量为开发环境
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      IS_DEVELOPMETN: false,
    }),
    // 提取css
    // 根据入口文件，提取重复引用的公共代码类库，打包到单独文件中
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      // name: 'vendor', // 入口文件名
      // filename: 'vendor.[hash].bundle.js', // 打包后的文件名
      // minChunks: Infinity,
      async: true,
      // async: 'chunk-vendor',
      // children: true,
      minChunks: 3,
    }),
    /* 压缩优化代码开始*/
    new webpack.optimize.UglifyJsPlugin({ minimize: true }),
    // 分析代码
    new BundleAnalyzerPlugin({ analyzerPort: 3011 }),
    new Copy([
      { from: './app/images', to: './images' },
      { from: './app/iconfont', to: './iconfont' },
    ]),
  ],
}

// fs.copy('../app/images', '../dist/images')
// fs.copy('../app/iconfont', '../dist/iconfont')
module.exports = merge(webpackConfigBase, webpackConfigProd)
