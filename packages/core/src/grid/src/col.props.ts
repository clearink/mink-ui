import type { HTMLAttributes, Ref } from 'react'
import type { HasChildren, SemanticsStyled } from '../../_shared/types'
import type { BresponsiveGridColLayout, GridColLayout } from './_shared.props'

import { BREAKPOINT_NAME } from '../../_shared/hooks/use-breakpoint/_shared.constant'
import { exhaustive } from '../../_shared/utils/exhaustive'

export interface ColInjectedProps extends
  BresponsiveGridColLayout,
  GridColLayout,
  HasChildren,
  SemanticsStyled<'root'> {
  /**
   * @description 外部引用
   */
  ref?: Ref<HTMLDivElement>
}

export interface ColProps extends ColInjectedProps, HTMLAttributes<HTMLDivElement> {}

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                        constants                        |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export const excludedColProps = exhaustive<keyof ColInjectedProps>()([
  // extends
  'children',
  'prefixCls',
  'className',
  'classNames',
  'style',
  'styles',
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
])
