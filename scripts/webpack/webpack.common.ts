import path from 'path'

import webpack from 'webpack'
import WebpackBar from 'webpackbar'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
// import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin'
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'
import config from '../../config'
import {
  __DEV__,
  PROJECT_NAME,
  PROJECT_ROOT,
  HMR_PATH,
  ANTD_THEMES,
  PUBLIC_PATH,
  OUTPUT_PATH,
  ENTRY_PATH,
  ENABLE_ANALYZE,
  ENABLE_SPEED_MEASURE
} from '../../config/constants'

function getCSSLoaders(importLoaders: number) {
  return [
    // {
    //   loader: 'thread-loader'
    // },
    {
      loader: __DEV__ ? 'style-loader' : MiniCssExtractPlugin.loader
    },
    {
      loader: 'css-loader',
      options: {
        modules: false,
        // 前面使用的每一个 loader 都需要指定 sourceMap 选项
        // sourceMap: true,
        // 指定在 css-loader 前应用的 loader 的数量
        importLoaders
      }
    },
    {
      loader: 'postcss-loader',
      options: { sourceMap: true }
    }
  ]
}

/**
 * webpack 基础配置
 */
const commonConfig: webpack.Configuration = {
  cache: {
    type: 'filesystem'
  },
  context: PROJECT_ROOT,
  output: {
    pathinfo: true,
    publicPath: '/',
    path: OUTPUT_PATH,
    filename: 'asserts/js/[name]-[contenthash:8].js',
    hashSalt: PROJECT_NAME
  },
  resolve: {
    // default ['.wasm', '.mjs', '.js', '.json']
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    alias: {
      // 替换 react-dom 成 @hot-loader/react-dom 以支持 react hooks 的 hot reload
      'react-dom': __DEV__ ? '@hot-loader/react-dom' : 'react-dom',
      '@': ENTRY_PATH
    }
  },
  externals: {},
  module: {
    rules: [
      /*
      {
        enforce: 'pre',
        test: /\.(t|j)sx$/,
        use: [
          {
            loader: 'thread-loader'
          },
          {
            loader: 'eslint-loader',
            options: {
              cache: true
            }
          }
        ],
        exclude: /node_modules/
      },
      */
      {
        test: /\.(j|t)sx?$/,
        use: [
          // {
          //   loader: 'thread-loader'
          // },
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: getCSSLoaders(0)
      },
      {
        test: /\.less$/,
        use: [
          ...getCSSLoaders(2),
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              lessOptions: {
                sourceMap: true,
                javascriptEnabled: true,
                // https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
                modifyVars: ANTD_THEMES
              }
            }
          }
        ]
      },
      /*
      {
        test: /\.s[ac]ss$/,
        use: [
          ...getCSSLoaders(2),
          {
            loader: 'sass-loader', // fast-sass-loader
            options: { sourceMap: true }
          }
        ]
      },
      */
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        use: [
          {
            loader: 'url-loader',
            options: {
              // 低于 10k 转换成 base64
              limit: 10 * 1024,
              // 在文件名中插入文件内容 hash，解决强缓存立即更新的问题
              outputPath: 'asserts',
              name: '[path][name]-[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(svg)(\?.*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'asserts/images/[path][name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(eot|woff|otf|ttf|woff2|appcache|mp3|mp4|pdf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'asserts',
              name: '[path][name]-[hash:8].[ext]'
            }
          }
        ]
      }
      /*
      {
        test: /\.wasm$/,
        include: ENTRY_PATH,
        type: 'webassembly/experimental'
      },
      {
        test: /\.xml$/,
        include: ENTRY_PATH,
        use: ['xml-loader']
      }
      */
    ]
  },
  plugins: [
    // @ts-ignore
    new WebpackBar({
      name: 'React-TypeScript-Boilerplate',
      // react 蓝
      color: '#00FF00'
    }),
    // @ts-ignore
    new CleanWebpackPlugin(),
    // [替换失败]用 dayjs 替换 moment
    // new AntdDayjsWebpackPlugin(),
    // @ts-ignore
    new FriendlyErrorsPlugin(),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.antd': JSON.stringify(config.antd),
      'process.env.sentry': JSON.stringify(config.sentry),
      'process.env.rematch': JSON.stringify(config.rematch),
      'process.env.Reatoron': JSON.stringify(config.Reactotron)
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    // @ts-ignore
    ...(__DEV__ ? [] : [new CleanWebpackPlugin()]),
    // @ts-ignore
    new HtmlWebpackPlugin({
      // 只在生产环境压缩
      minify: 'auto',
      template: path.resolve(PUBLIC_PATH, './index.html'),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      templateParameters: (...args: any[]) => {
        const [compilation, assets, assetTags, options] = args
        const rawPublicPath = commonConfig.output?.publicPath
        return {
          compilation,
          webpackConfig: compilation.options,
          htmlWebpackPlugin: {
            tags: assetTags,
            files: assets,
            options
          },
          // 在 index.html 模板中注入模板参数 PUBLIC_PATH
          // 移除最后的反斜杠为了让拼接路径更自然，例如：<%= `${PUBLIC_PATH}/favicon.ico` %>
          PUBLIC_PATH:
            typeof rawPublicPath === 'string' && rawPublicPath.endsWith('/')
              ? rawPublicPath.slice(0, -1)
              : rawPublicPath
        }
      }
    }),
    // 将 public 文件夹中除 index.html 以外的文件拷贝到构建输出文件夹中
    // @ts-ignore
    new CopyWebpackPlugin({
      patterns: [
        {
          context: PUBLIC_PATH,
          from: '*',
          to: OUTPUT_PATH,
          toType: 'dir',
          globOptions: {
            ignore: ['**/index.html', '*.DS_Store']
          }
        }
      ]
    })
  ],
  stats: {
    // 是否输出不同的颜色
    colors: true,
    // 是否展示每个模块与入口文件的距离
    depth: true,
    // 是否展示入口文件与对应的文件 bundles
    entrypoints: true,
    // 是否展示 --env 信息
    env: true,
    // 是否隐藏孤儿模块
    orphanModules: true,
    // 输出日志级别
    logging: 'info', // 'none' | 'error' | 'warn' | 'info' | 'log' | 'verbose'
    // 添加模块的源码
    source: true,
    warningsFilter: warning =>
      /Conflicting order|asset size limit|entrypoint size limit|/gm.test(
        warning
      )
  },
  optimization: {
    minimize: false,
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          minSize: 50000,
          minChunks: 1,
          chunks: 'initial',
          priority: 1
        }
      }
    }
  },
  performance: {
    hints: false,
    maxEntrypointSize: 614400,
    maxAssetSize: 614400
  }
}

if (__DEV__ && Array.isArray(commonConfig.entry)) {
  // 开发环境下注入热更新补丁
  // reload=true 设置 webpack 无法热更新时刷新整个页面，overlay=true 设置编译出错时在网页中显示出错信息遮罩
  commonConfig.entry.unshift(
    `webpack-hot-middleware/client?path=${HMR_PATH}&reload=true&overlay=true`
  )
}

let webpackConfig = commonConfig
// 使用 --analyze 参数构建时，会输出各个阶段的耗时和自动打开浏览器访问 bundle 分析页面
if (ENABLE_ANALYZE) {
  const SizePlugin = require('size-plugin')
  const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
  webpackConfig.plugins = webpackConfig.plugins || []
  webpackConfig.plugins.push(
    new SizePlugin({ writeFile: false }),
    new BundleAnalyzerPlugin()
  )
}
// 构建速度分析
if (ENABLE_SPEED_MEASURE) {
  const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
  const smp = new SpeedMeasurePlugin()
  webpackConfig = smp.wrap(commonConfig)
}

export default webpackConfig
