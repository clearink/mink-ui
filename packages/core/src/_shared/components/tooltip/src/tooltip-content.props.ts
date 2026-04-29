import type { ReactElement } from 'react'
import type { VoidFn } from '@mink-ui/shared/interface'

export interface TooltipContentProps {
  /**
   * @description 子元素
   */
  children: ReactElement<any>

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
