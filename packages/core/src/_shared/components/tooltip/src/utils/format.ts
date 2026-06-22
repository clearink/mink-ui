import type { AnyObj } from '@mink-ui/shared/interface'
import type { SetStateDispatch } from '../../../../types/state-dispatch'
import type { ElementCoords, PopupTriggerEvent, ViewportCoords } from '../_shared.props'

import { ownerDocument } from '@mink-ui/shared/dom/global'
import { getClientCoords } from '@mink-ui/shared/dom/rect'
import { getElementScale } from '@mink-ui/shared/dom/scale'
import { shallowMerge } from '@mink-ui/shared/object/shallow-merge'

import { findContainBlock } from '../../../../utils/element'
import { getClickEvents, getFocusEvents, getHoverEvents, getMenusEvents } from './helpers'

/**
 * @description 根据触发动作解析出 anchor 和 popup 上的事件处理器
 */
export function resolveInteractionHandlers(
  actions: Set<PopupTriggerEvent>,
  handleChange: SetStateDispatch<boolean>,
) {
  const handlers: [AnyObj, AnyObj][] = []

  if (actions.has('hover')) handlers.push(getHoverEvents(handleChange))

  if (actions.has('click')) handlers.push(getClickEvents(handleChange))

  if (actions.has('focus')) handlers.push(getFocusEvents(handleChange))

  if (actions.has('contextMenu')) handlers.push(getMenusEvents(handleChange))

  return handlers.reduce((result, tuple) => {
    result[0] = shallowMerge(result[0], tuple[0])
    result[1] = shallowMerge(result[1], tuple[1])
    return result
  }, [{}, {}])
}

/**
 * @description 解析元素位置信息
 */
export function resolveElementCoords(el: HTMLElement, measure: boolean): ElementCoords {
  const coords = getClientCoords(el)

  const { sx, sy } = measure ? getElementScale(el, 2000) : { sx: 1, sy: 1 }

  return {
    _el: el,
    w: coords.width,
    h: coords.height,
    t: coords.top,
    l: coords.left,
    b: coords.bottom,
    r: coords.right,
    sx,
    sy,
  }
}

/**
 * @description 获取 container 元素位置信息
 * 如果元素是 documentElement, 则需要重置 coords 数据
 */
export function resolveViewportCoords(el: HTMLElement): ViewportCoords {
  const doc = ownerDocument(el).documentElement

  const coords = doc === el ? null : getClientCoords(el)

  const scale = doc === el ? null : getElementScale(el, 2000)

  return {
    w: doc === el ? el.clientWidth : el.clientWidth * scale!.sx,
    h: doc === el ? el.clientHeight : el.clientHeight * scale!.sy,
    t: doc === el ? 0 : coords!.top,
    l: doc === el ? 0 : coords!.left,
    b: doc === el ? el.clientHeight : coords!.top + el.clientHeight * scale!.sy,
    r: doc === el ? el.clientWidth : coords!.left + el.clientWidth * scale!.sx,
  }
}

/**
 * @description 解析 popup 定位元素位置信息（找不到定位元素，默认为视口）
 */
export function resolveContainCoords(element: HTMLElement): Pick<ElementCoords, 'l' | 't'> {
  const block = findContainBlock(element)

  const coords = block ? getClientCoords(block) : { top: 0, left: 0 }

  return {
    t: coords.top,
    l: coords.left,
  }
}
