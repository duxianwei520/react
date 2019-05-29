
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}

const webpackConfigBase = {
  entry: {
    client: resolve('../app/client.js'),
  },
  output: {
    path: resolve('../dist'),
    filename: '[name].[hash:4].js',
    chunkFilename: 'chunks/[name].[hash:4].js',
    // publicPath: './'
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@app': path.join(__dirname, '../app'),
      '@actions': path.join(__dirname, '../app/redux/actions'),
      '@reducers': path.join(__dirname, '../app/redux/reducers'),
      '@apis': path.join(__dirname, '../app/apis'),
      '@components': path.join(__dirname, '../app/components'),
      '@configs': path.join(__dirname, '../app/configs'),
      '@config': path.join(__dirname, '../app/configs/config.js'),
      '@ajax': path.join(__dirname, '../app/configs/ajax.js'),
      '@reg': path.join(__dirname, '../app/configs/regular.config.js'),
      '@images': path.join(__dirname, '../app/images'),
      '@middleware': path.join(__dirname, '../app/middleware'),
      '@pages': path.join(__dirname, '../app/pages'),
      '@styles': path.join(__dirname, '../app/styles'),
      '@tableList': path.join(__dirname, '../app/components/tableList/tableList.js'),
    },
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        include: [resolve('../app')],
        // loader: 'babel',
        //把对.js 的文件处理交给id为happyBabel 的HappyPack 的实例执行
        loader: 'happypack/loader?id=happyBabel',
      },
      {
        test: /\.(css|less)$/,
        // exclude: /node_modules/,
        include: [
          resolve('../app/styles'),
          resolve('../app/components'),
          resolve('../node_modules/antd'),
          resolve('../node_modules/draft-js'),
        ],
        loader: ExtractTextPlugin.extract({fallback: 'style', use: 'happypack/loader?id=happyStyle'}),
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        exclude: /node_modules/,
        include: [resolve('../app/images')],
        loader: 'url',
        options: {
          limit: 8192,
          name: 'img/[name].[hash:4].[ext]'
        }
      },
      {
        test: /\.(woff|eot|ttf|svg|gif)$/,
        loader: 'url',
        options: {
          limit: 8192,
          name: 'font/[name].[hash:4].[ext]'
        }
      },
    ],
  },
  plugins: [
    // 去除moment的语言包
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /de|fr|hu/),
    new HappyPack({
      //用id来标识 happypack处理那里类文件
      id: 'happyBabel',
      //如何处理  用法和loader 的配置一样
      loaders: [{
        loader: 'babel?cacheDirectory=true',
      }],
      //代表共享进程池，即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多。
      threadPool: happyThreadPool,
      //允许 HappyPack 输出日志
      verbose: true,
    }),
    new HappyPack({
      //用id来标识 happypack处理那里类文件
      id: 'happyStyle',
      //如何处理  用法和loader 的配置一样
      loaders: [ 'css-loader?sourceMap=true', 'less-loader?sourceMap=true' ], 
      //代表共享进程池，即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多。
      threadPool: happyThreadPool,
      //允许 HappyPack 输出日志
      verbose: true,
    }),
    // 提取css
    new ExtractTextPlugin('style.[hash:4].css'),
    /* new webpack.optimize.CommonsChunkPlugin({
      name: 'common', // 入口文件名
      filename: 'common.[hash:4].js', // 打包后的文件名
      minChunks: function (module, count) {
        return module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(resolve('../node_modules')) === 0
      }
    }), */
    new webpack.optimize.CommonsChunkPlugin({
      async: 'async-common',
      minChunks: 3,
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
  ]
}

module.exports = webpackConfigBase
