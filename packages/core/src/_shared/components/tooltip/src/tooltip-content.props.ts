import type { ReactElement } from 'react'
import type { VoidFn } from '@mink-ui/shared/interface'
import type { HasChildren } from '../../../types/has-children'
import type { TooltipControl } from './utils/tooltip-control'

export interface TooltipContentProps extends
  Required<HasChildren<ReactElement<any>>> {
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
  onEnqueue: (el: Element | null) => VoidFn

  /**
   * @description 每一帧最多运行一次(用于 scroll)
   */
  onFramedUpdate: VoidFn

  /**
   * @description 一循环最多运行一次(用于 resize)
   */
  onTickedUpdate: VoidFn
}
