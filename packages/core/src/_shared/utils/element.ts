import type { MayBe } from '@mink-ui/shared/interface'
import type { ContainerElement, GetContainerElement } from '../components/portal/src/_shared.props'

import { ownerComputedStyle, ownerDocument } from '@mink-ui/shared/dom/global'
import { isBrowser } from '@mink-ui/shared/dom/is-browser'
import { isFunction } from '@mink-ui/shared/is/is-function'
import { isNullish } from '@mink-ui/shared/is/is-nullish'
import { isObject } from '@mink-ui/shared/is/is-object'
import { isString } from '@mink-ui/shared/is/is-string'

/**
 * @description 寻找不为 static 的父级元素
 */
export function findNonStaticElement(element: Element) {
  let depth = 0
  let current = element.parentElement

  // 层级超过 5000 的 应该不存在吧
  while (current && depth++ < 5000) {
    const { position } = ownerComputedStyle(current)

    if (position !== 'static') return current

    current = current.parentElement
  }

  const root = ownerDocument(element)

  return root.documentElement || root.body
}

/**
 * @description 获取指定容器元素 (相关组件: Portal)
 */
export function findContainerElement<T extends ContainerElement>(target: GetContainerElement<T>): MayBe<T>
export function findContainerElement<T extends ContainerElement>(target: GetContainerElement<T>, defaultElement: T): MayBe<T>
export function findContainerElement<T extends ContainerElement>(
  target: GetContainerElement<T>,
  defaultElement?: T,
) {
  if (!isBrowser) return null

  if (isNullish(target)) return defaultElement

  if (isFunction(target)) return target()

  if (isString(target)) return ownerDocument().querySelector(target) as T

  if (isObject(target) && 'current' in target) return target.current

  return target
}
