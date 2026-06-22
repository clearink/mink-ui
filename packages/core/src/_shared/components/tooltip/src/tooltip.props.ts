import type { ReactElement, ReactNode, Ref } from 'react'
import type { HasChildren } from '../../../../_shared/types/has-children'
import type { Orientation } from '../../../../_shared/types/orientation'
import type { HasSemanticsStyled } from '../../../types/has-semantics'
import type { OverlayProps } from '../../overlay/src'
import type { CssTransitionProps } from '../../transition/src'
import type { PopupPlacement, PopupTriggerEvent } from './_shared.props'

import { exhaustive } from '../../../utils/exhaustive'

export interface InternalTooltipInstance {
  /**
   * @description 触发元素
   */
  anchor: HTMLElement | null

  /**
   * @description 弹出层元素
   */
  popup: HTMLElement | null
}

export interface TooltipOverlayProps extends
  Pick<
    OverlayProps,
    | 'getContainer'
    | 'mountOnEnter'
    | 'unmountOnExit'
    | 'zIndex'
  > {}

export interface InternalTooltipProps extends
  HasSemanticsStyled<'root' | 'arrow' | 'popup', InternalTooltipProps>,
  Required<HasChildren<ReactElement>>,
  TooltipOverlayProps {
  /**
   * @description 外部引用
   */
  ref?: Ref<InternalTooltipInstance>

  /**
   * @description 内容
   */
  content?: ReactNode

  /**
   * @description 是否打开
   */
  isOpen?: boolean

  /**
   * @description 默认是否打开
   */
  defaultIsOpen?: boolean

  /**
   * @description 弹出层位置
   */
  placement?: PopupPlacement

  /**
   * @description tooltip 触发事件
   */
  trigger?: PopupTriggerEvent | PopupTriggerEvent[]

  /**
   * @description 是否展示箭头
   */
  arrow?: { pointAtCenter: boolean } | boolean

  /**
   * @description 内容贴边翻转
   */
  flip?: Partial<Record<Orientation, boolean>> | boolean

  /**
   * @description 箭头贴边移动
   */
  shift?: Partial<Record<Orientation, boolean>> | boolean

  /**
   * @description 偏移
   */
  offset?: [number, number] | number

  /**
   * @description 关闭后仍更新 tooltip 内容
   */
  fresh?: boolean

  /**
   * @description 打开延迟时间
   */
  openDelay?: number

  /**
   * @description 关闭延迟时间
   */
  closeDelay?: number

  /**
   * @description 动效
   */
  transition?: CssTransitionProps['classNames']

  /**
   * @description isOpen 改变回调
   */
  onIsOpenChange?: (isOpen: boolean) => void
}

export type DefaultNames = 'arrow' | 'openDelay' | 'closeDelay' | 'placement' | 'trigger' | 'offset' | 'flip' | 'shift'

export type PickedInternalTooltipProps = Pick<InternalTooltipProps, DefaultNames>

export type OmittedInternalTooltipProps = Omit<InternalTooltipProps, DefaultNames>

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                        constants                        |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export const defaultInternalTooltipProps: PickedInternalTooltipProps = {
  placement: 'top',
  trigger: 'hover',
  arrow: true,
  flip: true,
  shift: true,
  offset: 0,
  openDelay: 100,
  closeDelay: 100,
}

export const tooltipOverlayProps = exhaustive<keyof TooltipOverlayProps>()([
  'getContainer',
  'mountOnEnter',
  'unmountOnExit',
  'zIndex',
])
