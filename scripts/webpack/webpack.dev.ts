import path from 'path'

import webpack from 'webpack'
import { merge } from 'webpack-merge'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import commonConfig from './webpack.common'
import { PROJECT_ROOT } from '../../config/constants'

const webpackConfig = merge(commonConfig, {
  mode: 'development',
  // 如果觉得还可以容忍更慢的非 eval 类型的 sourceMap，可以搭配 error-overlay-webpack-plugin 使用
  // 需要显示列号可以切换成 eval-source-map
  devtool: 'eval-cheap-module-source-map',
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        enabled: true,
        files: './src/**/*.{ts,tsx,js,jsx}' // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
      },
      typescript: {
        memoryLimit: 1024,
        configFile: path.resolve(PROJECT_ROOT, './tsconfig.json')
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      // name: true,
      cacheGroups: {
        vendors: false,
        // TODO 待优化
        common: {
          name: 'chunk-common',
          minChunks: 2,
          chunks: 'async',
          reuseExistingChunk: true
        }
      }
    }
  }
})

export default webpackConfig
