import type { AnyObj } from '@mink-ui/shared/interface'
import type { SetStateDispatch } from '../../../../types/state-dispatch'
import type { PortalInstance } from '../../../portal/src'
import type { InternalTooltipInstance } from '../tooltip.props'

import { ownerDocument } from '@mink-ui/shared/dom/global'
import { isObject } from '@mink-ui/shared/is/is-object'
import { hasOwn } from '@mink-ui/shared/object/has-own'

import { isHTMLElement, isScrollableElement } from '../../../../utils/element'
import { TOOLTIP_MARK } from '../_shared.constant'

/**
 * @description 判断是否是 Tooltip 实例
 */
export function isInternalTooltipInstance(value: any): value is InternalTooltipInstance {
  return isObject(value) && hasOwn(value, TOOLTIP_MARK)
}

/**
 * @description hover 触发时 popup 需要的事件
 */
export function getHoverEvents(dispatch: SetStateDispatch<boolean>): [AnyObj, AnyObj] {
  const onMouseEnter = () => { dispatch(() => true) }

  const onMouseLeave = () => { dispatch(() => false) }

  return [
    { onMouseEnter, onMouseLeave },
    { onMouseEnter, onMouseLeave },
  ]
}

/**
 * @description click 触发时 popup 需要的事件
 */
export function getClickEvents(dispatch: SetStateDispatch<boolean>): [AnyObj, AnyObj] {
  const onClick = () => { dispatch(prev => !prev) }

  return [{ onClick }, {}]
}

/**
 * @description focus 触发时 popup 需要的事件
 */
export function getFocusEvents(dispatch: SetStateDispatch<boolean>): [AnyObj, AnyObj] {
  const onFocus = () => { dispatch(() => true) }

  const onBlur = () => { dispatch(() => false) }

  return [{ onBlur, onFocus }, {}]
}

/**
 * @description contextmenu 触发时 popup 需要的事件
 */
export function getMenusEvents(dispatch: SetStateDispatch<boolean>): [AnyObj, AnyObj] {
  const onContextMenu = (e: Event) => { e.preventDefault(); dispatch(prev => !prev) }

  return [{ onContextMenu }, {}]
}

/**
 * @description 寻找视口元素(如果找到了 body, 返回 html)
 */
export function findViewportElement(portal: PortalInstance, local: HTMLElement) {
  let depth = 0

  // portal = false 时，不适用 createPortal
  let current = isHTMLElement(portal) ? portal : portal === false ? local.parentElement : null

  const doc = ownerDocument(current)

  const html = doc.documentElement

  // 层级超过 5000 的 应该不存在吧
  while (current && depth++ < 5000) {
    if (current === doc.body || current === html) return html

    if (isScrollableElement(current)) return current

    current = current.parentElement
  }

  return html
}
