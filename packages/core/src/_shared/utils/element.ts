import type { ReactElement, ReactNode } from 'react'
import type { MayBe } from '@mink-ui/shared/interface'
import type { ContainerElement, GetContainerElement } from '../components/portal/src/_shared.props'

import { isFragment } from 'react-is'
import { isValidElement } from 'react'
import { ownerDocument, ownerStyle } from '@mink-ui/shared/dom/global'
import { isBrowser } from '@mink-ui/shared/dom/is-browser'
import { isFunction } from '@mink-ui/shared/is/is-function'
import { isNullish } from '@mink-ui/shared/is/is-nullish'
import { isObject } from '@mink-ui/shared/is/is-object'
import { isString } from '@mink-ui/shared/is/is-string'

/**
 * @description 判断是否为 Element
 */
export function isNodeElement(value: any): value is Element {
  return isObject(value) && value.nodeType === Node.ELEMENT_NODE
}

/**
 * @description 判断是否为 HTMLElement
 */
export function isHTMLElement(value: any): value is HTMLElement {
  return isObject(value) && value instanceof HTMLElement
}

/**
 * @description 判断元素是否可以滚动
 */
export function isScrollableElement(element: Element) {
  const excludes = new Set(['visible', 'hidden'])

  const { overflowX: ox, overflowY: oy } = ownerStyle(element)

  const canScrollX = element.scrollWidth > element.clientWidth && !excludes.has(ox)

  const canScrollY = element.scrollHeight > element.clientHeight && !excludes.has(oy)

  return canScrollX || canScrollY
}

/**
 * @description 是 ReactElement && 不是 Fragment
 */
export function isConcreteElement(node: ReactNode): node is ReactElement {
  return isValidElement(node) && !isFragment(node)
}

/**
 * @description 寻找元素的包含块（定位参考元素）
 * 包含块是 CSS 定位的参考坐标系；返回 null 代表以 viewport 为参考系
 *
 * 根据 CSS 规范，以下元素会为其后代创建包含块：
 * 1. position 不为 static 的元素（relative、absolute、fixed、sticky）
 * 2. transform 属性值不为 none 的元素
 * 3. filter 属性值不为 none 的元素
 * 4. perspective 属性值不为 none 的元素
 * 5. contain 属性包含 layout、paint、content 或 strict 的元素
 * 6. will-change 属性包含 transform、filter 或 perspective 的元素
 */
export function findContainBlock(element: Element) {
  let depth = 0
  let parent = element.parentElement

  const isFixed = ownerStyle(element).position === 'fixed'

  // 层级超过 5000 的 应该不存在吧
  while (parent && depth++ < 5000) {
    const styles = ownerStyle(parent)

    const contains = (styles.contain || '').split(/\s+/)

    const changes = (styles.willChange || '').split(/\s*,\s*/)

    const isContainBlock
      = (!isFixed && styles.position !== 'static')
        || styles.transform !== 'none'
        || styles.filter !== 'none'
        || styles.perspective !== 'none'
        || contains.includes('paint')
        || contains.includes('layout')
        || contains.includes('content')
        || contains.includes('strict')
        || changes.includes('transform')
        || changes.includes('filter')
        || changes.includes('perspective')

    if (isContainBlock) return parent

    parent = parent.parentElement
  }

  return null
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

/**
 * @description 寻找所有可滚动父级元素
 */
export function findScrollElements(element: Element | null) {
  const elements: HTMLElement[] = []

  let depth = 0
  let current = element?.parentElement

  // 层级超过 5000 的 应该不存在吧
  while (current && depth++ < 5000) {
    if (isScrollableElement(current)) {
      elements.push(current)
    }

    current = current.parentElement
  }

  return elements
}
