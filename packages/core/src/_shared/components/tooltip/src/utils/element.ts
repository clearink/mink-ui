import type { ElementCoords } from '../_shared.props'

import { ownerComputedStyle } from '@mink-ui/shared/dom/global'
import { getClientCoords } from '@mink-ui/shared/dom/rect'

import { findNonStaticElement } from '../../../../utils/element'

const fixed = new Set(['auto', 'clip', 'hidden', 'scroll'])

function scrollable(el: Element) {
  const { overflow: o, overflowX: ox, overflowY: oy } = ownerComputedStyle(el)

  return fixed.has(o) || fixed.has(ox) || fixed.has(oy)
}

/**
 * @description 获取可滚动元素
 */
export function getScrollElements(element: Element) {
  const result: HTMLElement[] = []

  let depth = 0
  let current = element.parentElement

  // 层级超过 5000 的 应该不存在吧
  while (current && depth++ < 5000) {
    if (scrollable(current))result.push(current)

    current = current.parentElement
  }

  return result
}

/**
 * @description 获取元素位置信息
 */
export function getElementCoords(el: HTMLElement): ElementCoords {
  const coords = getClientCoords(el)

  return {
    _el: el,
    _ch: el.clientHeight,
    _cw: el.clientWidth,
    h: coords.height,
    w: coords.width,
    t: coords.top,
    r: coords.right,
    b: coords.bottom,
    l: coords.left,
  }
}

/**
 * @description 获取定位元素位置信息
 */
export function getNonStaticCoords(el: Element) {
  return getElementCoords(findNonStaticElement(el))
}
