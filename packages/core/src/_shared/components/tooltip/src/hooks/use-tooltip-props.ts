import type { ArrowCoords, PopupCoords } from '../_shared.props'
import type { InternalTooltipProps, OmittedInternalTooltipProps, PickedInternalTooltipProps } from '../tooltip.props'

import isEqual from 'react-fast-compare'
import { useMemo, useState } from 'react'
import { batch } from '@mink-ui/shared/function/batch'

import { useConstant } from '../../../../hooks/use-constant'
import { useEvent } from '../../../../hooks/use-event'
import { useThrottleFrame, useThrottleTick } from '../../../../hooks/use-scheduler'
import { useCombinedSemantics } from '../../../../hooks/use-settings/use-combined'
import { useWatchValue } from '../../../../hooks/use-watch-value'
import { InternalTooltipContext } from '../_shared.context'
import { defaultInternalTooltipProps as defaultProps } from '../tooltip.props'
import aligners from '../utils/aligners'
import { TooltipControl } from '../utils/tooltip-control'
import { useTooltipEvents } from './use-tooltip-events'
import { useTooltipOpen } from './use-tooltip-open'

export function useInternalTooltipProps(props: InternalTooltipProps) {
  const topTooltipContext = InternalTooltipContext.use()

  const {
    placement = defaultProps.placement,
    trigger = defaultProps.trigger,
    arrow = defaultProps.arrow,
    flip = defaultProps.flip,
    shift = defaultProps.shift,
    offset = defaultProps.offset,
    openDelay = defaultProps.openDelay,
    closeDelay = defaultProps.closeDelay,
  } = props

  const omitted = props as OmittedInternalTooltipProps
  const picked: PickedInternalTooltipProps = {
    placement,
    trigger,
    arrow,
    flip,
    shift,
    offset,
    openDelay,
    closeDelay,
  }

  const control = useConstant(() => new TooltipControl())

  const [arrowCoords, setArrowCoords] = useState<Partial<ArrowCoords>>({
    transform: `translate3d(0, 0, 0) rotate(0)`,
  })

  const [popupCoords, setPopupCoords] = useState<Partial<PopupCoords>>({
    transform: `translate3d(0, 0, 0) rotate(0)`,
  })
  const { isOpen, hasContentChanged, handleIsOpenChange } = useTooltipOpen(picked, omitted)

  const [triggerEvents, popupEvents] = useTooltipEvents(picked, control, handleIsOpenChange)

  const [cssNames, cssAttrs] = useCombinedSemantics(
    [
      omitted.classNames,
      { root: omitted.className },
    ],
    [
      omitted.styles,
      { root: omitted.style },
      { arrow: arrowCoords },
      { wrapper: popupCoords },
    ],
    { meta: { ...omitted, ...picked, isOpen } },
  )

  const handleUpdate = useEvent(() => {
    const { popup, trigger } = control

    if (!isOpen || !popup || !trigger) return

    const getCoords = aligners[picked.placement!] || aligners.top

    const { getArrowCoords, getPopupCoords } = getCoords(picked, popup, trigger)

    setArrowCoords(getArrowCoords)

    setPopupCoords(getPopupCoords)
  })

  const handleResize = useThrottleTick(handleUpdate)

  const handleScroll = useThrottleFrame(handleUpdate)

  const handleEnqueue = useMemo(() => batch(topTooltipContext, control.enqueue), [control, topTooltipContext])

  // 影响布局的属性会被 watch
  const hasCoordsChanged = useWatchValue(
    [placement, offset, arrow, shift, flip],
    handleUpdate,
    (curr, prev) => !isOpen || isEqual(curr, prev),
  )

  return {
    picked,
    omitted,
    cssNames,
    cssAttrs,
    control,
    isOpen,
    popupEvents,
    triggerEvents,
    returnEmpty: hasContentChanged || hasCoordsChanged,
    handleResize,
    handleScroll,
    handleEnqueue,
  }
}
