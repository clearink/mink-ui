import type { HTMLAttributes, Ref } from 'react'
import type { Breakpoint } from '../../_shared/hooks/use-breakpoint/_shared.props'
import type { HasChildren, SemanticsStyled } from '../../_shared/types'
import type { GridFlex, GridSpan } from './_shared.props'

import { BREAKPOINT_NAME } from '../../_shared/hooks/use-breakpoint/_shared.constant'

/**
 * @description 布局配置
 */
export interface ColLayout {
  /**
   * @description 占位值
   */
  span?: GridSpan

  /**
   * @description 偏移值
   */
  offset?: GridSpan

  /**
   * @description 排序值
   */
  order?: GridSpan

  /**
   * @description 向左移动
   */
  pull?: GridSpan

  /**
   * @description 向右移动
   */
  push?: GridSpan

  /**
   * @description flex 配置
   */
  flex?: GridFlex
}

export type BreakpointColLayout = Partial<Record<Breakpoint, ColLayout | GridSpan>>

export interface ColProps extends
  BreakpointColLayout,
  ColLayout,
  HasChildren,
  HTMLAttributes<HTMLDivElement>,
  Pick<SemanticsStyled<''>, 'prefixCls' | 'className' | 'style'> {
  /**
   * @description 外部引用
   */
  ref?: Ref<HTMLDivElement>
}

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                        constants                        |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export const excludedColProps = [
  // extends
  'children',
  'prefixCls',
  'className',
  'style',
  // props
  'ref',
  'flex',
  'span',
  'offset',
  'order',
  'pull',
  'push',
  ...BREAKPOINT_NAME,
  // events
] as const
