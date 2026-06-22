import type { ArrowCssAttrs, PopupCssAttrs } from '../_shared.props'
import type { PickedInternalTooltipProps } from '../tooltip.props'
import type { TooltipControl } from '../utils/tooltip-control'

import isEqual from 'react-fast-compare'
import { useState } from 'react'
import { shallowEqual } from '@mink-ui/shared/object/shallow-equal'

import { useThrottleFrame, useThrottleTick } from '../../../../hooks/use-scheduler'
import { useWatchValue } from '../../../../hooks/use-watch-value'
import aligners from '../utils/aligners'

export function useTooltipCoords(
  ctrl: TooltipControl,
  picked: PickedInternalTooltipProps,
  isOpen: boolean,
  anchor: HTMLElement | null,
) {
  const { placement, offset, arrow, shift, flip } = picked

  const [arrowCssAttrs, setArrowCssAttrs] = useState<Partial<ArrowCssAttrs>>({
    left: 0,
    top: 0,
    transformOrigin: `center center`,
    transform: `translate3d(0, 0, 0) rotate(0)`,
  })

  const [popupCssAttrs, setPopupCssAttrs] = useState<Partial<PopupCssAttrs>>({
    top: 0,
    left: 0,
    position: 'absolute',
    transform: `translate3d(0, 0, 0) rotate(0)`,
  })

  const handleCoordsUpdate = () => {
    const { portal, popup } = ctrl

    if (!isOpen || !popup || !anchor) return

    const getUpdaters = aligners[placement!] || aligners.top

    const { arrowUpdater, popupUpdater } = getUpdaters(picked, portal, popup, anchor)

    setArrowCssAttrs(arrowUpdater)

    setPopupCssAttrs(popupUpdater)
  }

  const handleTickedUpdate = useThrottleTick(handleCoordsUpdate)
  const handleFramedUpdate = useThrottleFrame(handleCoordsUpdate)

  const hasCoordsChanged = useWatchValue(
    [anchor, { placement, offset, arrow, shift, flip }] as const,
    handleCoordsUpdate,
    (curr, prev) => !isOpen || (shallowEqual(curr[0], prev[0]) && isEqual(curr[1], prev[1])),
  )

  return {
    arrowCssAttrs,
    popupCssAttrs,
    hasCoordsChanged,
    handleTickedUpdate,
    handleFramedUpdate,
  }
}
