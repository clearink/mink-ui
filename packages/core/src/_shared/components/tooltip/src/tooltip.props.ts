import type { ReactElement, ReactNode } from 'react'
import type { HasChildren, Orientation, SemanticsStyled } from '../../../../_shared/types'
import type { OverlayProps } from '../../overlay/src'
import type { CssTransitionProps } from '../../transition/src'
import type { PopupPlacement, PopupTriggerEvent } from './_shared.props'

export interface InternalTooltipProps extends
  Pick<OverlayProps, 'getContainer' | 'mountOnEnter' | 'unmountOnExit' | 'zIndex'>,
  Required<HasChildren<ReactElement>>,
  SemanticsStyled<'arrow' | 'root' | 'wrapper'> {

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
  transition?: CssTransitionProps['attrs']

  /**
   * @description isOpen 改变回调
   */
  onOpenChange?: (isOpen: boolean) => void
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
