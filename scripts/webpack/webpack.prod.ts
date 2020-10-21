import path from 'path'

import webpack from 'webpack'
import { merge } from 'webpack-merge'
import CompressionPlugin from 'compression-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import commonConfig from './webpack.common'
import { COPYRIGHT, PROJECT_ROOT } from '../../config/constants'

/**
 * webpack 生产环境配置
 */
const webpackConfig = merge(commonConfig, {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.BannerPlugin({
      raw: true,
      banner: COPYRIGHT
    }),
    // new webpack.HashedModuleIdsPlugin(),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        // 生产环境打包并不频繁，可以适当调高允许使用的内存，加快类型检查速度
        memoryLimit: 1024 * 2,
        configFile: path.resolve(PROJECT_ROOT, './tsconfig.json')
      }
    })
    // new MiniCssExtractPlugin({
    //   filename: 'css/[name].[contenthash:8].css',
    //   // chunkFilename: 'css/[name].[contenthash:8].css',
    //   chunkFilename: 'css/[name].css',
    //   ignoreOrder: true
    // }),
    // new CompressionPlugin({ cache: true })
  ],
  optimization: {
    // runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        react: {
          name: 'react',
          chunks: 'all',
          priority: 90,
          test: /(react|ahooks|redux)/,
          minChunks: 1
        },
        data: {
          name: 'data',
          chunks: 'all',
          priority: 90,
          test: /(axios|store)/,
          minChunks: 1
        },
        'ant-comp-main': {
          name: 'ant-comp-main',
          chunks: 'initial',
          priority: 75,
          test: /(antd|rc-)/
        },
        'ant-comp': {
          name: 'ant-comp',
          chunks: 'async',
          priority: 70,
          test: /antd/,
          minChunks: 2
        },
        common: {
          name: 'common',
          chunks: 'async',
          priority: 60,
          minChunks: 2,
          maxSize: 800000,
          minSize: 400000,
          reuseExistingChunk: true
        }
      }
    },
    minimize: true,
    minimizer: [
      // new TerserPlugin({ extractComments: false })
      // new OptimizeCSSAssetsPlugin()
    ]
  }
})

export default webpackConfig
