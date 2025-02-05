import type { DOMAttributes } from 'react'

import { getShadowRoot, shallowMerge } from '@mink-ui/shared'

import type { TooltipRefs } from '../hooks/use-tooltip'
import type useTooltipOpen from '../hooks/use-tooltip-open'
import type { TriggerEvent } from '../props'

import { getClickEvents, getContextMenuEvents, getFocusEvents, getHoverEvents } from './events'

export function isInPopupChain(event: MouseEvent, refs: TooltipRefs) {
  const el = event.target as Element
  const { trigger, popup, chain } = refs

  const isInChain = (item: Element | null) =>
    item && (item === el || item.contains(el) || getShadowRoot(item)?.host === el)

  return isInChain(trigger) || isInChain(popup) || chain.some(item => isInChain(item))
}

export function formatTriggerEvents(
  actions: Set<TriggerEvent>,
  setIsOpen: ReturnType<typeof useTooltipOpen>[1],
) {
  const events: [DOMAttributes<HTMLElement>, DOMAttributes<HTMLElement>][] = []

  if (actions.has('hover')) events.push(getHoverEvents(setIsOpen))

  if (actions.has('click')) events.push(getClickEvents(setIsOpen))

  if (actions.has('focus')) events.push(getFocusEvents(setIsOpen))

  if (actions.has('contextMenu')) events.push(getContextMenuEvents(setIsOpen))

  return events.reduce((result, tuple) => {
    result[0] = shallowMerge(result[0], tuple[0])
    result[1] = shallowMerge(result[1], tuple[1])
    return result
  }, [{}, {}])
}
