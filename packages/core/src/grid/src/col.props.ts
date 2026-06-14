import type { HTMLAttributes, Ref } from 'react'
import type { HasChildren } from '../../_shared/types/has-children'
import type { HasSemanticsStyled } from '../../_shared/types/has-semantics'
import type { GridColLayout, ResponsiveGridColLayout } from './_shared.props'

import { BREAKPOINT_NAME } from '../../_shared/hooks/use-breakpoint/_shared.constant'
import { exhaustive } from '../../_shared/utils/exhaustive'

export interface ColInjectedProps extends
  GridColLayout,
  HasChildren,
  HasSemanticsStyled<'root', ColProps>,
  ResponsiveGridColLayout {
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
