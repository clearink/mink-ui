import type { DOMAttributes, ReactElement, Ref } from 'react'
import type { VoidFn } from '@mink-ui/shared/interface'
import type { InternalTooltipInstance } from './tooltip.props'

export interface TooltipTriggerProps {
  /**
   * @description 外部引用
   */
  ref?: Ref<HTMLElement | InternalTooltipInstance>

  /**
   * @description 触发元素
   */
  triggerElement: HTMLElement | null

  /**
   * @description 子元素
   */
  children: ReactElement<any>

  /**
   * @description 是否打开 tooltip
   */
  isOpen: boolean

  /**
   * @description 事件处理器
   */
  handlers: DOMAttributes<HTMLElement>

  /**
   * @description 尺寸变化回调
   */
  onResize: VoidFn

  /**
   * @description 滚动事件回调
   */
  onScroll: VoidFn
}
