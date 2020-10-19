import webpack from 'webpack'

export interface Config {
  /**
   * 是否使用 ant-design
   */
  antd?: boolean
  /**
   * 是否使用 rematch 作为状态管理器
   */
  rematch?:
    | boolean
    | {
        select: boolean
        persist: boolean
      }
  /**
   * 是否开启 Sentry 监控
   */
  sentry?: {
    SENTRY_DNS: string
    API_ENDPOINT: string
  }
  /**
   * 是否使用 Reactotron
   */
  Reactotron?: boolean
  /**
   * 是否开启构建体积分析
   */
  ANALYZE?: boolean
  /**
   * 是否开启构建速度分析
   */
  SPEED_MEASURE?: boolean
}

type NodeEnV = 'development' | 'production'

declare global {
  declare namespace NodeJS {
    export interface ProcessEnv extends Config {
      NODE_ENV: NodeEnV
    }
  }
}

declare module 'speed-measure-webpack-plugin' {
  interface SpeedMeasurePluginOptions {
    disable: boolean
    outputFormat:
      | 'json'
      | 'human'
      | 'humanVerbose'
      | ((outputObj: Record<string, unknown>) => void)
    outputTarget: string | ((outputObj: string) => void)
    pluginNames: Record<string, unknown>
    granularLoaderData: boolean
  }

  class SpeedMeasurePlugin extends webpack.Plugin {
    constructor(options?: Partial<SpeedMeasurePluginOptions>)
    wrap(webpackConfig: webpack.Configuration): webpack.Configuration
  }

  export = SpeedMeasurePlugin
}

declare module 'size-plugin' {
  interface SizePluginOptions {
    pattern: string
    exclude: string
    filename: string
    publish: boolean
    writeFile: boolean
    // eslint-disable-next-line @typescript-eslint/ban-types
    stripHash: Function
  }

  class SizePlugin extends webpack.Plugin {
    constructor(options?: Partial<SizePluginOptions>)
  }

  export = SizePlugin
}

declare module 'antd-dayjs-webpack-plugin' {
  // interface AntDayjsPluginOptions {}
  class AntDayjsPlugin extends webpack.Plugin {
    constructor()
  }
  export = AntDayjsPlugin
}
