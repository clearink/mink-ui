import type { ReactElement, ReactNode, RefCallback } from 'react'
import type { MayBe } from '@mink-ui/shared/interface'
import type { CssTransitionGetters } from '../_shared.props'

import { cloneElement, isValidElement } from 'react'
import { pushItem } from '@mink-ui/shared/array/push-item'

import { cn } from '../../../../libs/cn'
import { mergeRefs } from '../../../../utils/refs'

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
 * @description 判断两个 ReactNode 是否相等
 */
export function isNodeEqual(prev: ReactNode, next: ReactNode) {
  if (prev === next) return true

  if (!isValidElement(prev) || !isValidElement(next)) return false

  return prev.key === next.key
}

/**
 * @description 判断两个 ReactNode[] 是否相等
 */
export function isNodesEqual(prev: ReactNode[], next: ReactNode[]) {
  if (prev.length !== next.length) return false

  return prev.every((el, i) => isNodeEqual(el, next[i]))
}

/**
 * @description 格式化 transition 子元素
 */
export function normalizeCssTransitionChildren<E extends HTMLElement>(children: ReactElement<any>) {
  return (ref: RefCallback<E>, getters: CssTransitionGetters) => {
    return cloneElement(children, {
      ref: mergeRefs(ref, children.props.ref || (children as any).ref),
      className: cn(children.props.className, getters.names()),
      style: { ...children.props.style, ...getters.attrs() },
    })
  }
}
