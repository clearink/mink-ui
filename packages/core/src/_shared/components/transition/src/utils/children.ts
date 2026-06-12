import type { ManagedTransitionEntry, UniqueTransitionItem } from '../_shared.props'
import type { GroupTransitionControl } from './group-transition-control'

import { fallback } from '@mink-ui/shared/function/fallback'

/**
 * @description 获取进入和退出的元素
 */
export function diff<T extends UniqueTransitionItem>(prev: T[], next: T[]) {
  const pKeys = new Set(prev.map(item => item.key))

  const nKeys = new Set(next.map(item => item.key))

  const enters = new Set<T['key']>()

  const exits = new Set<T['key']>()

  // next 有 prev 没有
  nKeys.forEach((key) => { if (!pKeys.has(key)) enters.add(key) })

  // prev 有 next 没有
  pKeys.forEach((key) => { if (!nKeys.has(key)) exits.add(key) })

  return [enters, exits] as const
}

// 并集且有序
export function union(
  entries: GroupTransitionControl['_entries'],
  items: UniqueTransitionItem[],
) {
  const orders = new Map<UniqueTransitionItem['key'], number>()

  const result: (ManagedTransitionEntry | UniqueTransitionItem)[] = []

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
