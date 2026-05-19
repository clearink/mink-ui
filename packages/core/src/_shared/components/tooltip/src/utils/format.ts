import type { AnyFn } from '@mink-ui/shared/interface'
import type { SetStateDispatch } from '../../../../types/state-dispatch'
import type { PopupTriggerEvent } from '../_shared.props'

import { shallowMerge } from '@mink-ui/shared/object/shallow-merge'

import { getClickEvents, getFocusEvents, getHoverEvents, getMenusEvents } from './generate'

/**
 * @description 格式化 popup 触发事件
 */
export function formatTriggerEvents(
  actions: Set<PopupTriggerEvent>,
  handleChange: SetStateDispatch<boolean>,
) {
  const events: Record<string, AnyFn>[][] = []

  if (actions.has('hover')) events.push(getHoverEvents(handleChange))

  if (actions.has('click')) events.push(getClickEvents(handleChange))

  if (actions.has('focus')) events.push(getFocusEvents(handleChange))

  if (actions.has('contextMenu')) events.push(getMenusEvents(handleChange))

  return events.reduce((result, tuple) => {
    result[0] = shallowMerge(result[0], tuple[0])
    result[1] = shallowMerge(result[1], tuple[1])
    return result
  }, [{}, {}])
}
