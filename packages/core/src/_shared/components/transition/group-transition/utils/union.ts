import { fallback, hasOwn } from '@mink-ui/shared'
import { type ReactElement, Children } from 'react'

import type { TransitionState } from '../hooks/use-transition-store'
import type { GroupElementItem } from '../props'

// 并集且有序
export default function union<E extends HTMLElement>(
  elements: TransitionState<E>['elements'],
  enters: Set<ReactElement['key']>,
  children: ReactElement[],
) {
  const orders = new Map<ReactElement['key'], number>()

  const result: (GroupElementItem | ReactElement)[] = []

  const map = new Map<ReactElement['key'], GroupElementItem>()

  elements.forEach((item) => { map.set(item.key, item) })

  Children.forEach(children, (el, index) => {
    if (orders.has(el.key))
      throw new Error(`two children with the same key, '${el.key}'. `)

    const item = enters.has(el.key) ? el : map.get(el.key)

    orders.set(el.key, index)

    result.push(item!)
  })

  let lastIndex = -1

  elements.forEach((item) => {
    const index = fallback(orders.get(item.key), -1)!

    if (index < 0) result.splice(++lastIndex, 0, item)
    else if (lastIndex < index) lastIndex = index
  })

  return result
}

export function isGroupElementItem(item: GroupElementItem | ReactElement): item is GroupElementItem {
  return hasOwn(item, 'node') && hasOwn(item, 'freeze')
}
