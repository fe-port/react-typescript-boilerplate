import chalk from 'chalk'
import logSymbols from 'log-symbols'
import express from 'express'
// import ngrok from 'ngrok'
import webpack from 'webpack'
import WebpackOpenBrowser from 'webpack-open-browser'
import { HOST, DEFAULT_PORT, ENABLE_OPEN } from '../config/constants'
import devConfig from './webpack/webpack.dev'
import getPort from './utils/getPort'
import setupMiddlewares from './middlewares'

function link(url: string, color = '#ff9933') {
  return chalk.hex(color).underline(url)
}

async function start() {
  const PORT = await getPort(HOST, DEFAULT_PORT)
  const address = `http://${HOST}:${PORT}`
  // ENABLE_OPEN 参数值可能是 true 或者是一个指定的 URL
  if (ENABLE_OPEN) {
    let openAddress = ENABLE_OPEN as string
    if (ENABLE_OPEN === true) {
      openAddress = address
      let publicPath = devConfig.output?.publicPath
      // 未设置和空串都视为根路径
      // eslint-disable-next-line no-eq-null, eqeqeq
      publicPath = publicPath == null || publicPath === '' ? '/' : publicPath
      if (typeof publicPath === 'string' && publicPath !== '/') {
        // 要注意处理没有带 '/' 前缀和后缀的情况
        openAddress = `${address}${
          publicPath.startsWith('/') ? '' : '/'
        }${publicPath}${publicPath.endsWith('/') ? '' : '/'}index.html`
      }
    }
    devConfig.plugins?.push(new WebpackOpenBrowser({ url: openAddress }))
  }

  const devServer = express()
  // 加载 webpack 配置，获取 compiler
  const compiler = webpack(devConfig)
  setupMiddlewares(devServer, compiler)

  const httpServer = devServer.listen(PORT, HOST, () => {
    // const tunnel = await ngrok.connect({ addr: PORT })
    // logSymbols.success 在 windows 平台渲染为 √ ，支持的平台会显示 ✔
    console.log(
      chalk.green(
        `Development server is running at ${link(address)} ${
          logSymbols.success
        }`
      )
    )
    // if (tunnel) {
    //   console.log(
    //     chalk.green(`Tunnel started at ${link(tunnel)} ${logSymbols.success}`)
    //   )
    // }
    // console.log(chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`))
  })

  // 我们监听了 node 信号，所以使用 cross-env-shell 而不是 cross-env
  // 参考：https://github.com/kentcdodds/cross-env#cross-env-vs-cross-env-shell
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;['SIGINT', 'SIGTERM'].forEach((signal: any) => {
    process.on(signal, () => {
      // 先关闭 Development Server
      httpServer.close()
      // 在 ctrl + c 的时候随机输出 'See you again' 和 'Goodbye'
      console.log(
        chalk.greenBright.bold(
          `\n${Math.random() > 0.5 ? 'See you again' : 'Goodbye'}!`
        )
      )
      // 退出 node 进程
      process.exit()
    })
  })
}

// 判断这个模块是不是被直接运行的
if (require.main === module) {
  start()
}
