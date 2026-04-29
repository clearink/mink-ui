import type { DOMAttributes, ReactElement, Ref } from 'react'
import type { VoidFn } from '@mink-ui/shared/interface'

export interface TooltipTriggerProps {
  /**
   * @description 外部引用
   */
  ref?: Ref<HTMLElement>

  /**
   * @description 子元素
   */
  children: ReactElement<any>

  /**
   * @description 是否打开 tooltip
   */
  isOpen: boolean

  /**
   * @description div 事件
   */
  events: DOMAttributes<HTMLElement>

  /**
   * @description 尺寸变化回调
   */
  onResize: VoidFn

  /**
   * @description 滚动事件回调
   */
  onScroll: VoidFn
}
