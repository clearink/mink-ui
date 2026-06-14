import type { CSSProperties } from 'react'
import type { AnyObj } from '@mink-ui/shared/interface'
import type { ScreenMatch } from '../../../_shared/hooks/use-breakpoint/_shared.props'
import type { UniqueKey } from '../../../_shared/types/unique-key'
import type { MasonryItemType, MasonrySortedItemType } from '../_shared.props'
import type { MasonryProps } from '../masonry.props'

import { findIndex } from '@mink-ui/shared/array/find-index'
import { toArray } from '@mink-ui/shared/array/to-array'
import { fallback } from '@mink-ui/shared/function/fallback'
import { isNullish } from '@mink-ui/shared/is/is-nullish'
import { isObject } from '@mink-ui/shared/is/is-object'
import { clamp } from '@mink-ui/shared/number/clamp'
import { shallowEqual } from '@mink-ui/shared/object/shallow-equal'

import { resolveBreakpointValue } from '../../../_shared/hooks/use-breakpoint/utils/helpers'
import { defaultMasonryProps } from '../masonry.props'

/**
 * @description 解析 Masonry 列数
 */
export function resolveMasonryColumns(matches: ScreenMatch, columns: MasonryProps['columns']) {
  const result = (() => {
    if (isNullish(columns)) return defaultMasonryProps.columns as number

    if (!isObject(columns)) return fallback(columns, defaultMasonryProps.columns as number)!

    return fallback(resolveBreakpointValue(matches, columns), columns.xs, 1)!
  })()

  return clamp(result, 1, Infinity)
}

/**
 * @description 解析 Masonry 间距 (未设置垂直间距默认与水平间距相等)
 */
export function resolveMasonryGutter(matches: ScreenMatch, gutter: MasonryProps['gutter']) {
  const { hGutter, vGutter } = (() => {
    const [horizontal, vertical] = toArray(gutter)

    const hGutter = fallback(resolveBreakpointValue(matches, horizontal), 0)!

    const vGutter = fallback(resolveBreakpointValue(matches, vertical), hGutter)!

    return { hGutter, vGutter }
  })()

  return {
    hGutter: clamp(hGutter, 0, Infinity),
    vGutter: clamp(vGutter, 0, Infinity),
  }
}

/**
 * @description 解析 Masonry 布局
 */
export function resolveMasonryLayouts<V>(
  items: MasonryItemType<V>[],
  sizes: Map<UniqueKey, number>,
  cols: number,
  hGutter: number,
  vGutter: number,
) {
  const rootCssVars: CSSProperties = { height: 0 }

  const itemCssVars = new Map<UniqueKey, AnyObj>()
  const itemLayouts: MasonrySortedItemType<V>[] = []

  const groups = Array.from({ length: cols }, () => ({ total: 0 }))

  for (let least = 0, i = 0; i < items.length; i++) {
    const { key, column } = items[i]

    const height = sizes.get(key) || 0

    // 如果指定在某列则直接使用, 否则放到当前最短列
    const cursor = clamp(fallback(column, least)!, 0, cols - 1)

    const delta = groups[cursor].total ? vGutter : 0

    groups[cursor].total += height + delta

    // 如果放入的是当前最短列，则重新扫描最短列
    if (cursor === least) least = findIndex(groups, (a, b) => a.total < b.total)

    itemCssVars.set(key, {
      '--masonry-item-width': `calc((100% - ${hGutter * (cols - 1)}px) / ${cols})`,
      '--masonry-item-top': `${groups[cursor].total - height}px`,
      '--masonry-item-left': `calc((100% + ${hGutter}px) / ${cols} * ${cursor} )`,
    })

    itemLayouts.push({ ...items[i], key, column: cursor })
  }

  rootCssVars.height = groups.reduce((prev, curr) => Math.max(prev, curr.total), 0)

  return { rootCssVars, itemCssVars, itemLayouts }
}

/**
 * @description 判断 Masonry 布局是否相等
 */
export function isItemLayoutsEqual<T extends MasonrySortedItemType>(prev: T[], next: T[]) {
  if (prev.length !== next.length) return false

  return prev.every((item, i) =>
    shallowEqual(item.key, next[i].key)
    && shallowEqual(item.column, next[i].column),
  )
}
