import type { ReactNode } from 'react'

import type { SemanticStyledProps } from '../../_shared/types'

export interface DividerProps extends SemanticStyledProps<'root' | 'text'> {
  align?: 'center' | 'left' | 'right'
  children?: ReactNode
  dashed?: boolean
  direction?: 'horizontal' | 'vertical'
  margin?: number | string
  plain?: boolean
}

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                      default props                      |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export const defaultDividerProps: Partial<DividerProps> = {
  align: 'center',
  dashed: false,
  direction: 'horizontal',
  plain: false,
}
