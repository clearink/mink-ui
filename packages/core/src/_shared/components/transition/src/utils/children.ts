import type { ManagedTransitionEntry, UniquedTransitionItem } from '../_shared.props'
import type { GroupTransitionControl } from './group-transition-control'

import { fallback } from '@mink-ui/shared/function/fallback'

/**
 * @description 获取进入和退出的元素
 */
export function diff<T extends UniquedTransitionItem>(prev: T[], next: T[]) {
  const pset = new Set(prev.map(item => item.key))

  const nset = new Set(next.map(item => item.key))

  const enters = new Set<T['key']>()

  const exits = new Set<T['key']>()

  // next 有 prev 没有
  nset.forEach((key) => { if (!pset.has(key)) enters.add(key) })

  // prev 有 next 没有
  pset.forEach((key) => { if (!nset.has(key)) exits.add(key) })

  return [enters, exits] as const
}

// 并集且有序
export function union(
  entries: GroupTransitionControl['_entries'],
  items: UniquedTransitionItem[],
) {
  const orders = new Map<UniquedTransitionItem['key'], number>()

  const result: (ManagedTransitionEntry | UniquedTransitionItem)[] = []

  const map = new Map(entries.map(e => [e.key, e]))

  items.forEach((item, index) => {
    orders.set(item.key, index)

    result.push(map.get(item.key) || item)
  })

  let lastIndex = -1

  entries.forEach((item) => {
    const index = fallback(orders.get(item.key), -1)!

    if (index < 0) result.splice(++lastIndex, 0, item)
    else if (lastIndex < index) lastIndex = index
  })

  return result
}
