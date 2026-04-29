import type { HTMLAttributes, Ref } from 'react'
import type { Breakpoint } from '../../_shared/hooks/use-breakpoint/_shared.props'
import type { HasChildren, SemanticsStyled } from '../../_shared/types'
import type { GridAlign, GridGutter, GridJustify } from './_shared.props'

export interface RowProps extends
  HasChildren,
  HTMLAttributes<HTMLDivElement>,
  Pick<SemanticsStyled<''>, 'prefixCls' | 'className' | 'style'> {
  /**
   * @description 外部引用
   */
  ref?: Ref<HTMLDivElement>

  /**
   * @description 对齐方式-垂直
   */
  align?: GridAlign | Partial<Record<Breakpoint, GridAlign>>

  /**
   * @description 对齐方式-水平
   */
  justify?: GridJustify | Partial<Record<Breakpoint, GridJustify>>

  /**
   * @description 间距
   */
  gutter?: [GridGutter, GridGutter] | GridGutter

  /**
   * @description 是否换行
   */
  wrap?: boolean
}

export type DefaultNames = 'gutter' | 'wrap'

export type PickedRowProps = Pick<RowProps, DefaultNames>

export type OmittedRowProps = Omit<RowProps, DefaultNames>

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                        constants                        |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export const defaultRowProps: PickedRowProps = {
  gutter: 0,
  wrap: true,
}

export const excludedRowProps = [
  // extends
  'children',
  'prefixCls',
  'className',
  'style',
  // props
  'ref',
  'align',
  'justify',
  'gutter',
  'wrap',
  // events
] as const
