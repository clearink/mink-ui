import type { AnyObj } from '@mink-ui/shared/interface'
import type { SetStateDispatch } from '../../../../types/state-dispatch'
import type { PopupTriggerEvent } from '../_shared.props'

import { shallowMerge } from '@mink-ui/shared/object/shallow-merge'

import { getClickEvents, getFocusEvents, getHoverEvents, getMenusEvents } from './helpers'

/**
 * @description 根据触发动作解析出 trigger 和 popup 上的事件处理器
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
