export interface IRouteItem {
  /**
   * 路由名
   */
  name: string
  /**
   * 单页路由路径
   */
  path?: string
  /**
   * 跳转路由地址
   */
  href?: string
  /**
   * 是否严格匹配
   */
  exec?: boolean
  /**
   * 菜单 ICON
   */
  icon?: string
  /**
   * 组件地址
   */
  component?: string
  /**
   * 是否在菜单隐藏
   */
  hideInMenu?: boolean
  /**
   * 是否在移动端菜单隐藏
   */
  hideInMobileMenu?: boolean
  /**
   * href 存在时打开新页面方式
   */
  target?: '_blank' | 'self'
  /**
   * 鉴权
   */
  authority?:
    | string
    | string[]
    | ((...arg: unknown[]) => boolean)
    | Promise<boolean>
}

export interface IRoute extends IRouteItem {
  routes?: IRouteItem[]
}

export type IRoutes = IRoute[]
