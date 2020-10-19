import { omit } from 'lodash'
import { notification } from 'antd'
import { client } from '../utils/request'
// @ts-ignore
import apis from './api.min.json'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'PATCH'
type ReqBody =
  | string
  | number
  | boolean
  | Array<unknown>
  | { [key: string]: unknown }

const isDev = process.env.NODE_ENV === 'development'

interface Api {
  method: Method
  data?: ReqBody
  params?: { [key: string]: unknown }
  headers?: { [key: string]: unknown }
}
/*
interface ApiJSONSchema {
  path: string
  title: string
  method: Method
  req_body_form: any[]
  req_params: { name: string }[]
  req_query: { name: string; required: '0' | '1' }[]
  req_headers: { required: '0' | '1'; name: string; value: string }[]
}
*/

const services: {
  [key: string]: (payload?: { [key: string]: unknown }) => Promise<unknown>
} = {}

apis.forEach(group => {
  if (Array.isArray(group.list)) {
    // services[group.name] = {}
    // @ts-ignore
    group.list.forEach(api => {
      // services[group.name][api.title] = {}
      const {
        t: title,
        m: method,
        // s: status,
        h: req_headers,
        q: req_query,
        p: req_params
      } = api

      services[title] = async (payload: { body?: ReqBody } = {}) => {
        let path = api.path
        const option: Api = {
          method: (method as Method) || 'GET'
        }
        // http headers
        if (Array.isArray(req_headers) && req_headers.length) {
          // @ts-ignore
          option.headers = req_headers.reduce((acc, cur) => {
            acc[cur.name] = cur.value
            return acc
          }, {})
        }
        const nobody: string[] = []
        // params 占位数据替换
        if (
          typeof payload === 'object' &&
          Array.isArray(req_params) &&
          req_params.length
        ) {
          req_params.forEach(({ n: name }: { n: string }) => {
            const value = payload[name]
            if (value === undefined) {
              throw new Error(`params.${name} 值缺失`)
            }
            nobody.push(name)
            path = path.replace(new RegExp(`{${name}}`), value)
          })
        }
        // 拼接 query string
        if (
          typeof payload === 'object' &&
          Array.isArray(req_query) &&
          req_query.length
        ) {
          // @ts-ignore
          const qs = req_query
            .map(
              ({ name, required }: { name: string; required: '0' | '1' }) => {
                const value = payload[name]
                if (required === '1' && value === undefined) {
                  throw new Error(`query.${name} 值缺失`)
                }
                if (value !== undefined) {
                  nobody.push(name)
                  return `${name}=${value}`
                }
                return null
              }
            )
            .filter(Boolean)
            .join('&')
          path = `${path}?${qs}`
        }
        switch (method) {
          /*
          case 'GET':
            // query string
            option.params = pick(
              payload,
              // @ts-ignore
              req_query.map(query => query.name)
            )
            break
          */
          case 'PUT':
          case 'POST':
          case 'DELETE':
            option.data =
              'body' in payload ? payload.body : omit(payload, nobody)
            break
          default:
            break
        }
        // @ts-ignore
        return client(path, option)
      }
      services[`${group.name}@${title}`] = services[title]
    })
  }
})

const noop = async (name: string) => ({
  status: false,
  err_code: 400,
  message: `${name}接口不存在`,
  err_message: `${name}接口不存在`
})

const proxy =
  typeof window.Proxy !== 'function'
    ? // browser.name === 'Internet Explorer' && parseInt(browser!.version!, 10) <= 11
      services
    : new Proxy(services, {
        get(target, name) {
          const func = Reflect.get(target, name)
          if (func === undefined && isDev) {
            notification.error({
              message: `接口调用错误`,
              description: `${name as string}接口不存在，请检查`
            })
            return noop(name as string)
          }
          return func
        }
      })

export default proxy
