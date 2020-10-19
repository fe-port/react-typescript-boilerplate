import { ProxyTable } from '../typings/server'

/**
 * 请求代理配置
 */
const proxyTable: ProxyTable = {
  '/api': {
    target: '//47.111.226.109:3000/',
    changeOrigin: true
  }
}

export default proxyTable
