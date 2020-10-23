import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import devConfig from '../webpack/webpack.dev'
import { HMR_PATH } from '../../config/constants'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function webpackMiddleware(compiler: any) {
  const publicPath = devConfig.output?.publicPath || '/'

  const devMiddlewareOptions: webpackDevMiddleware.Options = {
    writeToDisk: true
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
