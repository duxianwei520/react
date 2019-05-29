const webpack = require('webpack')
const path = require('path')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
  entry: {
    vendor: [
      'babel-polyfill',
      'react', 
      'react-dom', 
      'react-router', 
      'axios',
    ],
    redux: [
      'redux',
      'redux-thunk',
      'react-redux',
      'react-router-redux',
    ],
  },
  output: {
    filename: '[name].dll.js',
    path: path.join(__dirname, '../app/resource/dll'),
    library: '[name]_[hash]', 
  },
  plugins: [
    // 定义环境变量为开发环境
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      IS_DEVELOPMETN: true,
    }),
    new CleanWebpackPlugin(['dll'],{
      root: path.join(__dirname, '../app/resource/dll'),
      verbose:false,
      // exclude:['img']//不删除img静态资源
    }),
    // 使用插件 DllPlugin
    new webpack.DllPlugin({
      path: path.join(__dirname, '../app/resource/dll', '[name].manifest.json'),
      // This must match the output.library option above
      name: '[name]_[hash]',
      context: __dirname
    }),
    /* 多核压缩代码 */
    new ParallelUglifyPlugin({
      cacheDir: '.cache/',
      uglifyJS:{
        output: {
          comments: false
        },
        compress: {
          warnings: false
        }
      }
    }),
		// new BundleAnalyzerPlugin({
		// 	analyzerMode: 'static'
		// }),
  ]
};