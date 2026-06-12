import type { ReactNode } from 'react'

export type IconPlacement = 'start' | 'end'

export type ButtonShape = 'round' | 'default' | 'circle'

export type ButtonTheme = 'primary' | 'success' | 'warning' | 'danger' | 'info'

export type ButtonVariant = 'solid' | 'outlined' | 'dashed' | 'filled' | 'text' | 'link'

export interface ButtonLoading {
  /**
   * @description 延迟显示加载状态的时间，避免闪烁
   */
  delay?: number

  /**
   * @description 自定义 loading 图标
   */
  icon?: ReactNode
}
