
const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config')
const Copy = require('copy-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}

const webpackConfigProd = {
  mode: 'development',
  output: {
    publicPath: './',
  },
  plugins: [
    // 定义环境变量为开发环境
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('testing'),
      IS_DEVELOPMETN: false,
    }),
    // 将打包后的资源注入到html文件内    
    new HtmlWebpackPlugin({
      // inject: true, // will inject the main bundle to index.html
      template: resolve('../app/index.html'),
      // mapConfig:'http://192.168.0.1/map_config.js',
      // 这里列出要加入html中的js文件
      dlls: [
        './resource/dll/vendor.dll.js', 
        './resource/dll/redux.dll.js',
      ],
    }),

    // 分析代码
    new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
    new Copy([
      { from: './app/resource/dll', to: '../dist/resource/dll' },
    ]),
    new CleanWebpackPlugin(),
  ],
}

module.exports = merge(webpackConfigBase, webpackConfigProd)
