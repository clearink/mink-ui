import type { ReactElement } from 'react'
import type { GroupTransitionEntry } from '../_shared.props'
import type { GroupTransitionProps } from '../group-transition.props'
import type { GroupTransitionControl } from './group-transition-control'

import { Children } from 'react'
import { fallback } from '@mink-ui/shared/function/fallback'
import { hasOwn } from '@mink-ui/shared/object/has-own'

/**
 * @description 获取进入和退出的元素
 */
export function diff<T extends ReactElement>(prev: T[], next: T[]) {
  const prevSet = new Set<T['key']>()

  const nextSet = new Set<T['key']>()

  Children.forEach(prev, (child): void => { prevSet.add(child.key) })

  Children.forEach(next, (child): void => { nextSet.add(child.key) })

  const enters = new Set<T['key']>()

  const exits = new Set<T['key']>()

  // next 有 prev 没有
  nextSet.forEach((key) => { if (!prevSet.has(key)) enters.add(key) })

  // prev 有 next 没有
  prevSet.forEach((key) => { if (!nextSet.has(key)) exits.add(key) })

  return [enters, exits] as const
}

// 并集且有序
export function union(
  entries: GroupTransitionControl['_entries'],
  enters: Set<ReactElement['key']>,
  children: GroupTransitionProps['children'],
) {
  const orders = new Map<ReactElement['key'], number>()

  const result: (GroupTransitionEntry | ReactElement)[] = []

  const map = new Map(entries.map(e => [e.key, e]))

  Children.forEach(children, (el, index) => {
    orders.set(el.key, index)

    result.push(map.get(el.key) || el)
  })

  let lastIndex = -1

  entries.forEach((item) => {
    const index = fallback(orders.get(item.key), -1)!

    if (index < 0) result.splice(++lastIndex, 0, item)
    else if (lastIndex < index) lastIndex = index
  })

  return result
}

export function isGroupTransitionEntry(item: GroupTransitionEntry | ReactElement): item is GroupTransitionEntry {
  return hasOwn(item, 'key') && hasOwn(item, 'raw') && hasOwn(item, 'node')
}
