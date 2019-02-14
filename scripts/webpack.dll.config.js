const webpack = require('webpack')
const path = require('path');
const DllPlugin = require('webpack/lib/DllPlugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
  // 入口文件
  entry: {
    // 依赖列表
    dll: [
      'react', 'react-dom', 'react-router', // 'redux', // 'react-redux',
    ],
  },
  // 输出文件
  output: {
    // 文件名称
    filename: '[name].js',
    path: path.join(__dirname, '../dll'),

    /*
     存放相关的dll文件的全局变量名称，比如对于jquery来说的话就是 _dll_jquery, 在前面加 _dll
     是为了防止全局变量冲突。
    */
    library: 'dll.[name]'
  },
  plugins: [
    // 定义环境变量为开发环境
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      IS_DEVELOPMETN: false,
    }),
    // 使用插件 DllPlugin
    new webpack.DllPlugin({
      path: path.join(__dirname, '../dll', '[name]-manifest.json'),
      // This must match the output.library option above
      name: 'dll.[name]'
    }),
		new BundleAnalyzerPlugin({
			analyzerMode: 'static'
		}),
  ]
};