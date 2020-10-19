import path from 'path'

import webpack from 'webpack'
import WebpackBar from 'webpackbar'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'
import { Options as HtmlMinifierOptions } from 'html-minifier'
// import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { loader as MiniCssExtractLoader } from 'mini-css-extract-plugin'
import SizePlugin from 'size-plugin'
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { srcAlias } from '../utils'
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
    __DEV__ ? 'style-loader' : MiniCssExtractLoader,
    {
      loader: 'css-loader',
      options: {
        modules: false,
        // 前面使用的每一个 loader 都需要指定 sourceMap 选项
        sourceMap: true,
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

// index.html 压缩选项
const htmlMinifyOptions: HtmlMinifierOptions = {
  collapseWhitespace: true,
  collapseBooleanAttributes: true,
  collapseInlineTagWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  minifyCSS: true,
  minifyJS: true,
  minifyURLs: true,
  useShortDoctype: true
}

const commonConfig: webpack.Configuration = {
  cache: true,
  context: PROJECT_ROOT,
  entry: ['react-hot-loader/patch', path.resolve(ENTRY_PATH, './index.tsx')],
  output: {
    publicPath: '/',
    path: OUTPUT_PATH,
    // filename: 'js/[name]-[hash:8].js',
    filename: 'js/[name].js',
    hashSalt: PROJECT_NAME
  },
  resolve: {
    // 我们导入ts 等模块一般不写后缀名，webpack 会尝试使用这个数组提供的后缀名去导入
    extensions: ['.js', '.tsx', '.ts', '.json'],
    alias: {
      ...srcAlias,
      // 替换 react-dom 成 @hot-loader/react-dom 以支持 react hooks 的 hot reload
      'react-dom': __DEV__ ? '@hot-loader/react-dom' : 'react-dom',
      '@': ENTRY_PATH
    }
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        loader: 'babel-loader',
        options: { cacheDirectory: true },
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
      // {
      //   test: /\.scss$/,
      //   use: [
      //     ...getCSSLoaders(2),
      //     {
      //       loader: 'sass-loader',
      //       options: { sourceMap: true }
      //     }
      //   ]
      // },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        use: [
          {
            loader: 'url-loader',
            options: {
              // 低于 10k 转换成 base64
              limit: 10 * 1024,
              // 在文件名中插入文件内容 hash，解决强缓存立即更新的问题
              name: '[name].[contenthash:8].[ext]',
              outputPath: 'images'
            }
          }
        ]
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]-[contenthash:8].[ext]',
              outputPath: 'fonts'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // [替换失败]用dayjs 替换 moment
    // new AntdDayjsWebpackPlugin(),
    new WebpackBar({
      name: 'React-TypeScript-Boilerplate',
      // react 蓝
      color: '#00FF00'
    }),
    new FriendlyErrorsPlugin(),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.antd': config.antd,
      'process.env.rematch': config.rematch,
      'process.env.Reatoron': config.Reactotron
    }),
    // new webpack.NamedModulesPlugin(),
    // new webpack.NoEmitOnErrorsPlugin(),
    ...(__DEV__ ? [] : [new CleanWebpackPlugin()]),
    new HtmlWebpackPlugin({
      // HtmlWebpackPlugin 会调用 HtmlMinifier 对 HTMl 文件进行压缩
      // 只在生产环境压缩
      minify: __DEV__ ? false : htmlMinifyOptions,
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
    new CopyPlugin({
      patterns: [
        {
          context: PUBLIC_PATH,
          from: '*',
          to: OUTPUT_PATH,
          toType: 'dir',
          globOptions: {
            ignore: ['**/index.html']
          }
        }
      ]
    })
  ],
  performance: {
    hints: false
  }
}

if (__DEV__) {
  // 开发环境下注入热更新补丁
  // reload=true 设置 webpack 无法热更新时刷新整个页面，overlay=true 设置编译出错时在网页中显示出错信息遮罩
  ;(commonConfig.entry as string[]).unshift(
    `webpack-hot-middleware/client?path=${HMR_PATH}&reload=true&overlay=true`
  )
}

let webpackConfig = commonConfig
// 使用 --analyze 参数构建时，会输出各个阶段的耗时和自动打开浏览器访问 bundle 分析页面
if (ENABLE_ANALYZE) {
  webpackConfig?.plugins.push(
    new SizePlugin({ writeFile: false }),
    new BundleAnalyzerPlugin()
  )
}
if (ENABLE_SPEED_MEASURE) {
  const smp = new SpeedMeasurePlugin()
  webpackConfig = smp.wrap(commonConfig)
}

export default webpackConfig
