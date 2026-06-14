import type { ReactElement } from 'react'
import type { VoidFn } from '@mink-ui/shared/interface'
import type { TooltipControl } from './utils/tooltip-control'

export interface TooltipContentProps {
  /**
   * @description 子元素
   */
  children: ReactElement<any>

  /**
   * @description 控制器
   */
  ctrl: TooltipControl

  /**
   * @description 是否打开
   */
  isOpen: boolean

  /**
   * @description 元素挂载回调
   */
  onMounted: (el: Element | null) => VoidFn

  /**
   * @description 尺寸变化回调
   */
  onResize: VoidFn

  /**
   * @description 滚动事件回调
   */
  onScroll: VoidFn
}
