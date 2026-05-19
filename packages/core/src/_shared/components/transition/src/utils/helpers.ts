import type { MayBe } from '@mink-ui/shared/interface'
import type { ManagedTransitionEntry, UniqueTransitionItem } from '../_shared.props'
import type { GroupTransitionProps } from '../group-transition.props'

import { pushItem } from '@mink-ui/shared/array/push-item'
import { hasOwn } from '@mink-ui/shared/object/has-own'

import { ENTRY_MARK } from '../_shared.constant'

/**
 * @description 更新元素 classname
 */
export function updateClassNames(el: HTMLElement | null, classNames: MayBe<string>[]) {
  if (!el) return

  classNames
    .reduce((acc, cur) => cur ? pushItem(acc, cur.split(/\s+/)) : acc, [] as MayBe<string>[])
    .forEach(name => name && el.classList.add(name))
}

/**
 * @description 删除元素 classname
 */
export function removeClassNames(el: HTMLElement | null, classNames: MayBe<string>[]) {
  if (!el) return

  classNames
    .reduce((acc, cur) => cur ? pushItem(acc, cur.split(/\s+/)) : acc, [] as MayBe<string>[])
    .forEach(name => name && el.classList.remove(name))
}

/**
 * @description 运行指定次数触发回调
 */
export function runCounter(counter: number, callback: (...args: any) => void) {
  let count = 0

  return (...args: any) => { ++count >= counter && callback(...args) }
}

/**
 * @description 判断两个 item 是否相等
 */
export function isItemEqual<T extends UniqueTransitionItem>(
  prev: T,
  next: T,
) {
  return prev.key === next.key
}

/**
 * @description 判断两个 items 是否相等
 */
export function isItemsEqual<T extends UniqueTransitionItem>(prev: T[], next: T[]) {
  if (prev.length !== next.length) return false

  return prev.every((item, index) => isItemEqual(item, next[index]))
}

/**
 * @description 格式化 transition 子元素
 */
export function normalizeCssTransitionChildren<T extends UniqueTransitionItem>(
  children: GroupTransitionProps<T>['children'],
  item: T,
) {
  return (ref: any, getters: any) => children(ref, getters, item)
}

/**
 * @description 判断是否为 ManagedTransitionEntry
 */
export function isManagedTransitionEntry(
  item: UniqueTransitionItem | ManagedTransitionEntry,
): item is ManagedTransitionEntry {
  return hasOwn(item, ENTRY_MARK)
}
