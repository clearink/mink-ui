import type { AnyObj } from '@mink-ui/shared/interface'
import type { SetStateDispatch } from '../../../../types/state-dispatch'

import { isObject } from '@mink-ui/shared/is/is-object'
import { hasOwn } from '@mink-ui/shared/object/has-own'

import { TOOLTIP_MARK } from '../_shared.constant'

/**
 * @description 获取触发元素
 */
export function getTriggerElement(value: any): HTMLElement | null {
  const isInternalInstance = isObject(value) && hasOwn(value, TOOLTIP_MARK)

  return isInternalInstance ? value.triggerElement : value
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
