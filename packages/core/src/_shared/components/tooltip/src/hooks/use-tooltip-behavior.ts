import type { SetStateDispatch } from '../../../../types/state-dispatch'
import type { OmittedInternalTooltipProps, PickedInternalTooltipProps } from '../tooltip.props'
import type { TooltipControl } from '../utils/tooltip-control'

import { useEffect, useMemo } from 'react'
import { arrayEqual, batch, getShadowRoot, makeEventListener, ownerWindow, pick, toArray } from '@mink-ui/shared'
import { makeTimeout } from '@mink-ui/shared/dom/timer'
import { isUndefined } from '@mink-ui/shared/is/is-undefined'
import { shallowEqual } from '@mink-ui/shared/object/shallow-equal'

import { useComputed } from '../../../../hooks/use-computed'
import { useControlledState } from '../../../../hooks/use-controlled-state'
import { useEvent } from '../../../../hooks/use-event'
import { useWatchValue } from '../../../../hooks/use-watch-value'
import { isRenderable } from '../../../../utils/renderable'
import { injectedTriggerHandlerNames } from '../_shared.constant'
import { resolveInteractionHandlers } from '../utils/format'

export function useTooltipBehavior(
  ctrl: TooltipControl,
  picked: PickedInternalTooltipProps,
  omitted: OmittedInternalTooltipProps,
  triggerElement: HTMLElement | null,
) {
  const { trigger, openDelay, closeDelay } = picked
  const { content, isOpen: _isOpen, defaultIsOpen, onIsOpenChange } = omitted

  const hasContent = isRenderable(content)

  const [isOpen, setIsOpen] = useControlledState(
    !isUndefined(_isOpen) ? _isOpen && hasContent : _isOpen,
    () => !!(defaultIsOpen && hasContent),
    onIsOpenChange,
  )

  const actions = useComputed(() => new Set(toArray(trigger)), toArray(trigger), arrayEqual)

  const clickToHide = actions.has('click') || actions.has('contextMenu')

  const handleChange: SetStateDispatch<boolean> = useEvent((action) => {
    ctrl.dispose()

    const newIsOpen = hasContent && action(isOpen)

    const delay = (newIsOpen ? openDelay : closeDelay) ?? 0

    if (newIsOpen === isOpen) return

    if (delay <= 0) setIsOpen(newIsOpen)
    else ctrl.setCleanup(makeTimeout(delay, () => { setIsOpen(newIsOpen) }))
  })

  const [triggerHandlers, popupHandlers] = useMemo(
    () => resolveInteractionHandlers(actions, handleChange),
    [actions, handleChange],
  )

  const injectedHandlers = pick(omitted as any, injectedTriggerHandlerNames)

  const mergedTriggerHandlers = Object.entries(injectedHandlers).reduce((result, [k, v]) => {
    result[k] = batch(v, triggerHandlers[k])

    return result
  }, { ...triggerHandlers })

  const mergedPopupHandlers = { ...popupHandlers, onPointerDownCapture: ctrl.pointerEnterPopup }

  const hasContentChanged = useWatchValue(
    hasContent,
    (curr) => { setIsOpen(isOpen && curr) },
    (curr, prev) => !isOpen || shallowEqual(curr, prev),
  )

  useEffect(() => {
    if (!triggerElement || !clickToHide) return

    const shadowRoot = getShadowRoot(triggerElement)

    const thisWindow = ownerWindow(triggerElement)

    const handler = (event: MouseEvent) => {
      const isInChain = () => ctrl.inChain(event, triggerElement)
      // 关闭时不执行 isInChain
      handleChange(prev => !prev || isInChain() ? prev : false)
    }

    return batch(
      makeEventListener([thisWindow, shadowRoot], 'mousedown', handler, true),
      makeEventListener([thisWindow, shadowRoot], 'contextmenu', handler, true),
      makeEventListener(thisWindow, 'pointerdown', ctrl.pointerLeavePopup, true),
    )
  }, [ctrl, triggerElement, clickToHide, handleChange])

  useEffect(() => () => { ctrl.destroy() }, [ctrl])

  return {
    isOpen,
    triggerHandlers: mergedTriggerHandlers,
    popupHandlers: mergedPopupHandlers,
    hasContentChanged,
  }
}
