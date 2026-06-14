import type { HasSemanticsStyled } from '../../_shared/types/has-semantics'
import type { MasonryColumns, MasonryGutter, MasonryItemType, MasonrySortedItemType } from './_shared.props'
import type { MasonryItemForwardedProps } from './masonry-item.props'

export interface MasonryInjectedProps<V> extends
  HasSemanticsStyled<'root' | 'item', MasonryProps<V>>,
  MasonryItemForwardedProps<V> {
  /**
   * @description 数据项
   */
  items?: MasonryItemType<V>[]

  /**
   * @description 间距
   */
  gutter?: MasonryGutter | [MasonryGutter, MasonryGutter]

  /**
   * @description 列数
   */
  columns?: MasonryColumns

  /**
   * @description 监听子元素布局变化
   */
  observeItem?: boolean

  /**
   * @description 布局变化回调
   */
  onLayoutChange?: (sortedItems: MasonrySortedItemType<V>[]) => void
}

export interface MasonryProps<V = any> extends MasonryInjectedProps<V> {}

export type DefaultNames = 'items' | 'gutter' | 'columns'

export type PickedMasonryProps<V> = Pick<MasonryProps<V>, DefaultNames>

export type OmittedMasonryProps<V> = Omit<MasonryProps<V>, DefaultNames>

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                        constants                        |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export const defaultMasonryProps: PickedMasonryProps<any> = {
  gutter: 0,
  columns: 3,
}
