import type { Breakpoint } from '@mink-ui/core/_shared/hooks/use-breakpoint/breakpoint'
import type { SemanticStyledProps } from '@mink-ui/core/_shared/types'
import type { LiteralUnion } from '@mink-ui/shared'
import type { HTMLAttributes } from 'react'

export type FlexType = LiteralUnion<'auto' | 'none', string> | number
export type ColSpanType = number
export interface ColSize {
  flex?: FlexType
  offset?: ColSpanType
  order?: ColSpanType
  pull?: ColSpanType
  push?: ColSpanType
  span?: ColSpanType
}
export type ResponsiveColSize = Record<Breakpoint, ColSize | ColSpanType>

export interface ColProps extends ColSize, HTMLAttributes<HTMLDivElement>, Partial<ResponsiveColSize>, SemanticStyledProps<'root'> {}
