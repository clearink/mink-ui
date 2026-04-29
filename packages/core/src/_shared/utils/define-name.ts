import type { ComponentType } from 'react'

/**
 * @description 定义组件 displayName
 */
export function defineName(Component: ComponentType<any>, displayName?: string) {
  const __PROD__ = process.env.NODE_ENV === 'production'

  if (!__PROD__) Component.displayName = displayName || Component.name
}
