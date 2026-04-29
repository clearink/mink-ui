import type { CommonDisabled, CommonSize, HasChildren, Orientation, SemanticsStyled } from '../../_shared/types'
import type { DividerAlign, DividerVariant } from './_shared.props'

export interface DividerProps extends
  HasChildren,
  SemanticsStyled<'root' | 'content'> {
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

export const defaultDividerProps: PickedDividerProps = {
  align: 'center',
  variant: 'solid',
}

export const excludedDividerProps = [
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
] as const
