import type { LiteralUnion } from '@mink-ui/shared/interface'
import type { Breakpoint } from '../../_shared/hooks/use-breakpoint/_shared.props'

export type GridAlign = 'top' | 'middle' | 'bottom' | 'stretch'

export type GridJustify = 'start' | 'center' | 'end' | 'space-around' | 'space-between' | 'space-evenly'

export type GutterValue = number | string

export type GridGutter = GutterValue | Partial<Record<Breakpoint, GutterValue>>

export type GridFlex = LiteralUnion<'auto' | 'none', string> | number

export type GridSpan = number
