import path from 'path'

import { argv } from 'yargs'

/**
 * 是否开发环境
 */
const __DEV__ = process.env.NODE_ENV === 'development'
/**
 * 是否生产环境
 */
const __PROD__ = process.env.NODE_ENV === 'production'
/**
 * 是否开启构建体积分析
 */
const ENABLE_ANALYZE = !!argv.analyze || !!process.env.ANALYZE
/**
 * 是否开启构建速度分析
 */
const ENABLE_SPEED_MEASURE = !!argv.speed || !!process.env.SPEED_MEASURE
/**
 * 是否打开浏览器
 */
const ENABLE_OPEN = argv.open as true | string

/**
 * 服务地址
 */
const HOST = '0.0.0.0'
/**
 * 默认占用端口
 */
const DEFAULT_PORT = 8000
/**
 * 版权信息
 */
const COPYRIGHT = `/** @preserve Powered by Turing */`

/**
 * 项目根目录
 */
const PROJECT_ROOT = process.cwd() // path.resolve(__dirname, '../')

/**
 * 项目名
 */
const PROJECT_NAME = path.parse(PROJECT_ROOT).name
/**
 * 项目入口文件夹
 */
const ENTRY_PATH = path.resolve(__dirname, '../src')
/**
 * 构建输出文件夹
 */
const OUTPUT_PATH = path.resolve(__dirname, '../dist')
/**
 * 静态文件夹
 */
const PUBLIC_PATH = path.resolve(__dirname, '../public')
/**
 * 热更新前缀
 */
const HMR_PATH = '/__webpack_hmr'
/**
 * React 相关包
 */
const REACT_PACKAGES = ['react', 'react-dom', 'ahooks', 'react-router-dom']

/**
 * ant-design 主题 CSS 变量
 */
const ANTD_THEMES = {
  '@font-size-base': '12px',
  '@border-radius-base': '2px'
}

export {
  __DEV__,
  __PROD__,
  ENABLE_ANALYZE,
  ENABLE_SPEED_MEASURE,
  ENABLE_OPEN,
  HOST,
  DEFAULT_PORT,
  COPYRIGHT,
  PROJECT_NAME,
  ENTRY_PATH,
  OUTPUT_PATH,
  PUBLIC_PATH,
  PROJECT_ROOT,
  HMR_PATH,
  REACT_PACKAGES,
  ANTD_THEMES
}
