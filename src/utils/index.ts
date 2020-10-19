import React from 'react'
import { BaseFormItemProps } from '@/components/form-map'

const MobileReg = new RegExp(
  ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPod', 'iPad'].join('|'),
  'i'
)

/**
 * 获取有效列
 * @param columns {BaseFormItemProps[]}
 */
export const getValidColumns = (columns: BaseFormItemProps[]) => {
  return columns.filter(i => !['id', 'action'].includes(i.dataIndex))
}

export const delay = (ms: number) =>
  // eslint-disable-next-line no-promise-executor-return
  new Promise(resolve => setTimeout(resolve, ms))

export const isSupportWebp = () => {
  return (
    document
      .createElement('canvas')
      .toDataURL('image/webp')
      .indexOf('data:image/webp') === 0
  )
}

export const getBreakpoint = (width: number) => {
  if (width < 576) {
    return 'xs'
  }
  if (width < 768) {
    return 'sm'
  }
  if (width < 992) {
    return 'md'
  }
  if (width < 992) {
    return 'lg'
  }
  if (width < 1200) {
    return 'xl'
  }
  return 'xxl'
}

export const isOutlink = (path = '') => {
  return /^https?:\/\//.test(path)
}

export const isFunction = (value: any) => typeof value === 'function'

export const randomId = (length = 8) => {
  return Number(
    Math.random().toString().substr(3, length) + Date.now()
  ).toString(36)
}

export const getHash = () => decodeURI(window.location.hash.slice(1))

export const preventDefault = (cb?: () => void) => <T extends React.UIEvent>(
  event: T
) => {
  event.preventDefault()
  if (cb && isFunction(cb)) {
    cb()
  }
}

export const isMobile = (width: number) => {
  return !!navigator.userAgent.match(MobileReg) || width <= 768
}

export const isPad = (width: number) => {
  return width > 768 && width < 1199
}

export const noop = (arg?: any) => arg

export const hasAuthority = (authorities = [], _module, operation) => {
  return authorities
    .find(i => i.name === _module)
    ?.routes?.[0]?.authority?.find(i => i === operation)
}

export * from './antd-icons'
