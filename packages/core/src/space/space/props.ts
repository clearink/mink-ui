import type { SemanticStyledProps } from '@mink-ui/core/_shared/types'
import type { SizeType } from '@mink-ui/core/config-provider/_shared.context'
import type { HTMLAttributes, ReactNode } from 'react'

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
