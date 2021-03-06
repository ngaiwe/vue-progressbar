const webpack = require('webpack')
const utils = require('./utils')
const config = require('../config')
const merge = require('webpack-merge')
const cssLoader = require('./css-loader.conf')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const env = require('../config/prod.env')
const productionGzip = config.build.productionGzip
const bundleAnalyzerReport = config.build.bundleAnalyzerReport

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: cssLoader.styleLoaders({
      sourceMap: config.build.cssSourceMap
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // 设置默认环境变量
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // html模板编译
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true, // 注入静态资源位置
      minify: { // 压缩html
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'manual' // chunk排序按照引用顺序
    }),
    // 生成模块id 根据相对路径 4位
    new webpack.HashedModuleIdsPlugin(),
    // 静态目录拷贝
    new CopyWebpackPlugin([{
        from: utils.resolve('static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }, {
        from: utils.resolve('src/components'),
        to: utils.resolve('lib'),
        ignore: ['.*']
      },
      {
        from: utils.resolve('src/index.js'),
        to: utils.resolve('lib'),
        ignore: ['.*']
      }
    ])
  ]
})

// 是否启用gizp
if (productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')
  webpackConfig.plugins.push(
    // 用于压缩文件 减小体积
    new CompressionWebpackPlugin({
      test: new RegExp(`\\.(${config.build.productionGzipExtensions.join('|')})$`), // 压缩文件类型
      filename: '[path].gz[query]', // 目标资源名称
      algorithm: 'gzip', // 压缩格式算法
      threshold: 10240, // 处理资源下限
      minRatio: 0.8 // 压缩比低于才会被压缩 gzip属于二次压缩
    })
  )
} else {
  void null
}

// 是否启用模块打包图 - 细节排查优化
if (bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
} else {
  void null
}

module.exports = webpackConfig
