import type { DOMAttributes, ReactElement, Ref } from 'react'
import type { VoidFn } from '@mink-ui/shared/interface'
import type { HasChildren } from '../../../types/has-children'
import type { InternalTooltipInstance } from './tooltip.props'

export interface TooltipAnchorProps extends
  Required<HasChildren<ReactElement<any>>> {
  /**
   * @description 外部引用
   */
  ref?: Ref<HTMLElement | InternalTooltipInstance>

  /**
   * @description 触发元素
   */
  anchor: HTMLElement | null

  /**
   * @description 是否打开 tooltip
   */
  isOpen: boolean

  /**
   * @description 事件处理器
   */
  handlers: DOMAttributes<HTMLElement>

  /**
   * @description 每一帧最多运行一次(用于 scroll)
   */
  onFramedUpdate: VoidFn

  /**
   * @description 一循环最多运行一次(用于 resize)
   */
  onTickedUpdate: VoidFn
}
