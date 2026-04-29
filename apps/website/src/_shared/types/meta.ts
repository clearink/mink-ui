import type { RouteObject } from 'react-router-dom'
import type { ComponentType } from 'react'

export interface CustomRouteMeta {
  category: string
  title?: string
  subtitle?: string
  desc?: string
  group?: { order?: number, title?: string }
  tags?: string
  date?: Date | string

  [key: string]: any
}

export interface CustomRouteObject extends Omit<RouteObject, 'children'> {
  // 组件
  component?: ComponentType
  // 子元素
  children?: CustomRouteObject[]

  meta?: CustomRouteMeta
}
