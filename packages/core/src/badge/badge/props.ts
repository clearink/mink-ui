import type { HasChildren, SemanticStyledProps } from '@mink-ui/core/_shared/types'
import type { CSSProperties, ReactNode } from 'react'

export interface BadgeProps extends HasChildren,
  SemanticStyledProps<'indicator' | 'root'> {
  color?: string
  count?: ReactNode
  dot?: boolean
  hidden?: boolean
  maxCount?: number
  offset?: [number, number]
  size?: 'default' | 'small'
  status?: 'default' | 'error' | 'processing' | 'success' | 'warning'
  style?: CSSProperties
  text?: ReactNode
  title?: ReactNode
}

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                      default props                      |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export const defaultBadgeProps: Partial<BadgeProps> = {
  maxCount: 99,
}
