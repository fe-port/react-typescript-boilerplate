import chalk from 'chalk'
import express from 'express'
import httpProxyMiddleware, {
  createProxyMiddleware
} from 'http-proxy-middleware'
import proxyTable from '../../config/proxy'

function link(str: string): string {
  return chalk.magenta.underline(str)
}

export default function proxyMiddleware(server: express.Express): void {
  Object.entries(proxyTable).forEach(
    ([path, options]: [string, httpProxyMiddleware.Options]) => {
      const from = path
      const to = options.target as string
      console.log(`proxy ${link(from)} ${chalk.green('->')} ${link(to)}`)

      if (!options.logLevel) options.logLevel = 'warn'
      server.use(path, createProxyMiddleware(options))
    }
  )
  process.stdout.write('\n')
}
