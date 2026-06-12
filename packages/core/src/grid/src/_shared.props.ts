import type { LiteralUnion } from '@mink-ui/shared/interface'
import type { Breakpoint } from '../../_shared/hooks/use-breakpoint/_shared.props'

export type GridAlign = 'top' | 'middle' | 'bottom' | 'stretch'

export type GridJustify = 'start' | 'center' | 'end' | 'space-around' | 'space-between' | 'space-evenly'

export type GutterValue = number | string

export type GridGutter = GutterValue | Partial<Record<Breakpoint, GutterValue>>

export type GridFlex = LiteralUnion<'auto' | 'none', string> | number

export type GridSpan = number

/**
 * @description 布局配置
 */
export interface GridColLayout {
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

export type ResponsiveGridColLayout = Partial<Record<Breakpoint, GridColLayout | GridSpan>>
