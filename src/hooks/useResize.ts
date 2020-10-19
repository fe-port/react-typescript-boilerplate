import React, { useState } from 'react'
import { debounce } from 'lodash'
// import ReactResizeDetector from 'react-resize-detector'
import { isPad, isMobile, getBreakpoint } from '@/utils'

export type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'
export type BreakpointMap = Partial<Record<Breakpoint, string>>
export type ScreenMap = Partial<Record<Breakpoint, boolean>>

export const responsiveArray: Breakpoint[] = [
  'xxl',
  'xl',
  'lg',
  'md',
  'sm',
  'xs'
]

export const responsiveMap: BreakpointMap = {
  xs: '(max-width: 575px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1600px)'
}

export interface ResizeContextValue {
  width: number
  height: number
  isPad: boolean
  isMobile: boolean
  isDesktop: boolean
  breakpoint: Breakpoint | undefined
}

export const ResizeContext = React.createContext<ResizeContextValue>(null!)

export const useResize = () => {
  const { innerWidth, innerHeight } = window
  const [resize, changeResize] = useState<ResizeContextValue>({
    width: innerWidth,
    height: innerHeight,
    isPad: isPad(innerWidth),
    isMobile: isMobile(innerWidth),
    breakpoint: getBreakpoint(innerWidth),
    isDesktop: !isMobile(innerWidth) && !isPad(innerWidth)
  })

  const onResize = debounce((width, height) => {
    changeResize({
      width,
      height,
      isPad: isPad(width),
      isMobile: isMobile(width),
      breakpoint: getBreakpoint(width),
      isDesktop: !isMobile(width) && !isPad(width)
    })
  }, 150)

  return null
}
