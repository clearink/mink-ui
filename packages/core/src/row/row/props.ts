import type { HTMLAttributes } from 'react'

import type { Breakpoint } from '../../_shared/hooks/use-breakpoint/breakpoint'
import type { SemanticStyledProps } from '../../_shared/types'

export type AlignType = ['top', 'middle', 'bottom', 'stretch'][number]

export type JustifyType = [
  'start',
  'end',
  'center',
  'space-around',
  'space-between',
  'space-evenly',
][number]

export type Gutter = number | Partial<Record<Breakpoint, number>>

export interface RowProps extends SemanticStyledProps<'root'>, HTMLAttributes<HTMLDivElement> {
  align?: AlignType
  gutter?: [Gutter, Gutter] | Gutter
  justify?: JustifyType
  wrap?: boolean
}

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                      default props                      |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export const defaultRowProps: Partial<RowProps> = {
  gutter: 0,
  wrap: true,
}
