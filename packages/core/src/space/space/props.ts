import type { HTMLAttributes, ReactNode } from 'react'

import type { SemanticStyledProps } from '../../_shared/types'
import type { SizeType } from '../../config-provider/_shared.context'

type SpaceSize = number | SizeType | undefined

export interface SpaceProps extends SemanticStyledProps<'root'>, HTMLAttributes<HTMLDivElement> {
  align?: 'baseline' | 'center' | 'end' | 'start'
  direction?: 'horizontal' | 'vertical'
  size?: [SpaceSize, SpaceSize] | SpaceSize
  split?: ReactNode
  wrap?: boolean
}

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                      default props                      |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export const defaultSpaceProps: Partial<SpaceProps> = {
  direction: 'horizontal',
  size: 'small',
  wrap: false,
}
