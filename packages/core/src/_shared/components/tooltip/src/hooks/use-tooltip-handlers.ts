import type { SetStateDispatch } from '../../../../types/state-dispatch'
import type { OmittedInternalTooltipProps, PickedInternalTooltipProps } from '../tooltip.props'
import type { TooltipControl } from '../utils/tooltip-control'

import { useEffect, useMemo } from 'react'
import { arrayEqual } from '@mink-ui/shared/array/array-equal'
import { toArray } from '@mink-ui/shared/array/to-array'
import { ownerWindow } from '@mink-ui/shared/dom/global'
import { makeEventListener } from '@mink-ui/shared/dom/listener'
import { getShadowRoot } from '@mink-ui/shared/dom/shadow'
import { batch } from '@mink-ui/shared/function/batch'
import { pick } from '@mink-ui/shared/object/pick'

import { useComputed } from '../../../../hooks/use-computed'
import { injectedAnchorHandlerNames } from '../_shared.constant'
import { resolveInteractionHandlers } from '../utils/format'

export function useTooltipHandlers(
  ctrl: TooltipControl,
  { trigger }: PickedInternalTooltipProps,
  omitted: OmittedInternalTooltipProps,
  anchor: HTMLElement | null,
  handleIsOpenChange: SetStateDispatch<boolean>,
) {
  const actions = useComputed(() => new Set(toArray(trigger)), toArray(trigger), arrayEqual)

  const clickToHide = actions.has('click') || actions.has('contextMenu')

  const [anchorHandlers, popupHandlers] = useMemo(
    () => resolveInteractionHandlers(actions, handleIsOpenChange),
    [actions, handleIsOpenChange],
  )

  const injectedHandlers = pick(omitted as any, injectedAnchorHandlerNames)

  const mergedAnchorHandlers = Object.entries(injectedHandlers).reduce((result, [k, v]) => {
    result[k] = batch(v, anchorHandlers[k])

    return result
  }, { ...anchorHandlers })

  const mergedPopupHandlers = { ...popupHandlers, onPointerDownCapture: ctrl.pointerEnterPopup }

  useEffect(() => {
    if (!anchor || !clickToHide) return

    const shadowRoot = getShadowRoot(anchor)

    const thisWindow = ownerWindow(anchor)

    const handler = (event: MouseEvent) => {
      const isInChain = () => ctrl.inChain(event, anchor)
      // 关闭时不执行 isInChain
      handleIsOpenChange(prev => !prev || isInChain() ? prev : false)
    }

    return batch(
      makeEventListener([thisWindow, shadowRoot], 'mousedown', handler, true),
      makeEventListener([thisWindow, shadowRoot], 'contextmenu', handler, true),
      makeEventListener(thisWindow, 'pointerdown', ctrl.pointerLeavePopup, true),
    )
  }, [ctrl, anchor, clickToHide, handleIsOpenChange])

  useEffect(() => () => { ctrl.destroy() }, [ctrl])

  return {
    anchorHandlers: mergedAnchorHandlers,
    popupHandlers: mergedPopupHandlers,
  }
}
