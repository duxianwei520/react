
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin }  = require('clean-webpack-plugin')
const  AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

const PORT = 8888
function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}
const webpackConfigDev = {
  mode: 'development',
  plugins: [
    // 定义环境变量为开发环境
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      IS_DEVELOPMETN: true,
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
        // 关联dll拆分出去的依赖
        new webpack.DllReferencePlugin({
          manifest: require('../app/resource/dll/vendor.manifest.json'),
          context: __dirname,
        }),
        // 关联dll拆分出去的依赖
        new webpack.DllReferencePlugin({
          manifest: require('../app/resource/dll/redux.manifest.json'),
          context: __dirname,
        }),
    
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'source-mapcheap-module-eval-souce-map',
  devServer: {
    contentBase: resolve('../app'),
    historyApiFallback: false,
    open:true,
    hot: true, 
    // hotOnly:true,
    host: '0.0.0.0',
    port: PORT,
  },
}

module.exports = merge(webpackConfigBase, webpackConfigDev)
