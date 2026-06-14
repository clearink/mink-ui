import type { ReactNode } from 'react'
import type { Breakpoint } from '../../_shared/hooks/use-breakpoint/_shared.props'
import type { GetSemanticsConfig } from '../../_shared/types/has-semantics'
import type { UniqueKey } from '../../_shared/types/unique-key'
import type { MasonryProps } from './masonry.props'

export type GutterValue = number

export type ColumnsValue = number

export type MasonryGutter = GutterValue | Partial<Record<Breakpoint, GutterValue>>

export type MasonryColumns = ColumnsValue | Partial<Record<Breakpoint, ColumnsValue>>

export interface MasonryItemType<V = any> {
  /**
   * @default 唯一标识
   */
  key: UniqueKey

  /**
   * @description 数据
   */
  data: V

  /**
   * @description 固定在第 n 列
   */
  column?: number

  /**
   * @description 子元素
   */
  children?: ReactNode
}

/**
 * @description 排序后的 MasonryItemType
 */
export interface MasonrySortedItemType<V = any> extends MasonryItemType<V> {
  /**
   * @description 排序
   */
  column: Required<MasonryItemType<V>>['column']
}

/**
 * |---------------------------------------------------------|
 * |                     global definition                   |
 * |---------------------------------------------------------|
 */

export interface MasonryGlobalConfig extends GetSemanticsConfig<MasonryProps> {}
