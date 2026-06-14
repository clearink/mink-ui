import type { CommonDisabled } from '../../_shared/types/disabled'
import type { HasChildren } from '../../_shared/types/has-children'
import type { Orientation } from '../../_shared/types/orientation'
import type { CommonSize } from '../../_shared/types/size'
import type { HasSemanticsStyled } from '../../_shared/types/has-semantics'
import type { DividerAlign, DividerVariant } from './_shared.props'

import { exhaustive } from '../../_shared/utils/exhaustive'

export interface DividerInjectedProps extends
  HasChildren,
  HasSemanticsStyled<'root' | 'content', DividerProps> {
  /**
   * @description 方向
   */
  orientation?: Orientation

  /**
   * @description 垂直
   */
  vertical?: boolean

  /**
   * @description 对齐方式
   */
  align?: DividerAlign

  /**
   * @description 预设样式组合
   */
  variant?: DividerVariant

  /**
   * @description 精简样式
   */
  plain?: boolean

  /**
   * @description 分割线尺寸
   */
  size?: CommonSize

  /**
   * @description 禁用
   */
  disabled?: CommonDisabled
}

export interface DividerProps extends DividerInjectedProps {}

export type DefaultNames = 'align' | 'variant' | 'size'

export type PickedDividerProps = Pick<DividerProps, DefaultNames>

export type OmittedDividerProps = Omit<DividerProps, DefaultNames>

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                        constants                        |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export const defaultDividerProps: Omit<PickedDividerProps, 'size'> = {
  align: 'center',
  variant: 'solid',
}

export const excludedDividerProps = exhaustive<DefaultNames | keyof DividerProps>()([
  // extends
  'children',
  'prefixCls',
  'className',
  'classNames',
  'style',
  'styles',
  // props
  'orientation',
  'vertical',
  'align',
  'variant',
  'plain',
  'size',
  'disabled',
])
