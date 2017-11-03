
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const fs = require('fs-extra')
// const casProxy = require('./proxy');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// const PORT = 3010

module.exports = {
  entry: {
    client: './app/client.js',
    vendor: [
      'react', 'classnames', 'react-router', 'react-dom',
    ],
  },
  output: {
    // path: path.resolve(__dirname, 'dist'),
    // filename: './vendor.js',
    filename: '[name].[hash].js',
    path: path.join(__dirname, 'dist'),
    chunkFilename: '[name].[hash].js',
  },
  resolve: {
    extensions: ['', '.js', '.json'],
    alias: {
      components: __dirname + '/app/components',
      actions: __dirname + '/app/actions',
      api: __dirname + '/app/api',
      reducers: __dirname + '/app/reducers',
      utils: __dirname + '/app/utils',
      constants: __dirname + '/app/constants',
      controllers: __dirname + '/app/controllers',
      style: __dirname + '/app/style',
    },
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        // loader: 'react-hot!babel',
        loader: 'babel',
      },
      {
        test: /\.less$/,
        // loader: 'style!css!postcss!less',
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap=true!postcss-loader?sourceMap=true!less-loader?sourceMap=<true></true>'),
      },
      {
        test: /\.css/,
        // loader: 'style!css',
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?!postcss-loader!less-loader'),
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=819200',
      },
      {
        test: /\.(woff|eot|ttf|svg|gif)$/,
        loader: 'file-loader?name=iconfont/[path][name].[ext]',
      },
    ],
  },
  plugins: [
    // 定义环境变量为开发环境
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      IS_DEVELOPMETN: false,
    }),
    // 提取css
    new ExtractTextPlugin('vendor.[hash].css'),
    // 根据入口文件，提取重复引用的公共代码类库，打包到单独文件中
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      // name: 'vendor', // 入口文件名
    //   filename: 'vendor.[hash].bundle.js', // 打包后的文件名
      // minChunks: Infinity,
      async: true,
      // async: 'chunk-vendor',
      // children: true,
      minChunks: 3,
    }),
    // 为组件分配id
    // new webpack.optimize.OccurrenceOrderPlugin(),
    /* 压缩优化代码开始  可以关掉*/
    new webpack.optimize.UglifyJsPlugin({ minimize: true }),
    /* 压缩优化代码结束*/
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'app/index.html'),
    }),
    // 分析代码
    new BundleAnalyzerPlugin({ analyzerPort: 8188 }),
  ],
}

fs.copy('./app/images', './dist/images')
fs.copy('./app/iconfont', './dist/iconfont')
// CopyDir({ from: './app/images', to: './dist/images' })
// CopyDir('./app/iconfont', './dist/iconfont')
