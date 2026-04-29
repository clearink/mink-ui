import type { HTMLAttributes, ReactNode, Ref } from 'react'
import type { HasChildren, Orientation, SemanticsStyled } from '../../_shared/types'
import type { SpaceAlign, SpaceSize } from './_shared.props'

export interface SpaceProps extends
  HasChildren,
  HTMLAttributes<HTMLDivElement>,
  SemanticsStyled<'root' | 'item' | 'separator'> {
  /**
   * @description 外部引用
   */
  ref?: Ref<HTMLDivElement>

  /**
   * @description 尺寸
   */
  size?: SpaceSize | [SpaceSize, SpaceSize]

  /**
   * @description 方向
   */
  orientation?: Orientation

  /**
   * @description
   */
  vertical?: boolean

  /**
   * @description 对齐方式
   */
  align?: SpaceAlign

  /**
   * @description 间隔符号
   */
  separator?: ReactNode

  /**
   * @description 换行
   */
  wrap?: boolean
}

export type DefaultNames = 'orientation' | 'size' | 'wrap'

export type PickedSpaceProps = Pick<SpaceProps, DefaultNames>

export type OmittedSpaceProps = Omit<SpaceProps, DefaultNames>

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                        constants                        |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export const defaultSpaceProps: PickedSpaceProps = {
  orientation: 'horizontal',
  size: 'small',
  wrap: false,
}

export const excludedSpaceProps = [
  // extends
  'children',
  'prefixCls',
  'className',
  'classNames',
  'style',
  'styles',
  // props
  'ref',
  'size',
  'orientation',
  'vertical',
  'align',
  'separator',
  'wrap',
] as const
