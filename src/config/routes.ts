import { IRoutes } from '../typings/route'

export const routes: IRoutes = [
  {
    name: '首页',
    path: '/',
    exec: true,
    hideInMenu: true,
    component: '@/pages/home'
  }
]
