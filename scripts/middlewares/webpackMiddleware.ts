import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import devConfig from '../webpack/webpack.dev'
import { HMR_PATH } from '../../config/constants'

export default function webpackMiddleware(compiler: webpack.Compiler) {
  const publicPath = devConfig.output?.publicPath || '/'

  const devMiddlewareOptions: webpackDevMiddleware.Options = {
    // 只在发生错误或有新的编译时输出
    stats: {
      colors: true,
      builtAt: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
      entrypoints: false,
      warnings: false,
      timings: true
    }
    // 需要输出文件到磁盘可以开启
    // writeToDisk: true
  }

  if (typeof publicPath === 'string') {
    // 保持和 webpack 中配置一致
    devMiddlewareOptions.publicPath = publicPath
  }

  const hotMiddlewareOptions: webpackHotMiddleware.MiddlewareOptions = {
    // sse 路由
    path: HMR_PATH
  }

  return [
    webpackDevMiddleware(compiler, devMiddlewareOptions),
    webpackHotMiddleware(compiler, hotMiddlewareOptions)
  ]
}
