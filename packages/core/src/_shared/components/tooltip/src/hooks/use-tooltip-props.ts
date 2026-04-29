import type { ArrowCoords, PopupCoords } from '../_shared.props'
import type { InternalTooltipProps, OmittedInternalTooltipProps, PickedInternalTooltipProps } from '../tooltip.props'

import { useMemo } from 'react'
import { batch } from '@mink-ui/shared/function/batch'
import { pick } from '@mink-ui/shared/object/pick'

import { useConstant } from '../../../../hooks/use-constant'
import { useEvent } from '../../../../hooks/use-event'
import { useExactState } from '../../../../hooks/use-exact-state'
import { useThrottleFrame, useThrottleTick } from '../../../../hooks/use-scheduler'
import { useCombinedSemantics } from '../../../../hooks/use-settings/use-combined'
import { overlayIncluded } from '../_shared.constant'
import { InternalTooltipContext } from '../_shared.context'
import { defaultInternalTooltipProps as defaultProps } from '../tooltip.props'
import aligners from '../utils/aligners'
import { TooltipControl } from '../utils/tooltip-control'
import { useTooltipEvents } from './use-tooltip-events'
import { useTooltipOpen } from './use-tooltip-open'
import { useWatchCoords } from './use-watch-coords'

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

  const [arrowCoords, setArrowCoords] = useExactState<Partial<ArrowCoords>>({
    transform: `translate3d(0, 0, 0) rotate(0)`,
  })

  const [popupCoords, setPopupCoords] = useExactState<Partial<PopupCoords>>({
    transform: `translate3d(0, 0, 0) rotate(0)`,
  })
  const { isOpen, hasContentChanged, isOpenChange } = useTooltipOpen(picked, omitted)

  const [triggerEvents, popupEvents] = useTooltipEvents(picked, control, isOpenChange)

  const [cssNames, cssAttrs] = useCombinedSemantics(
    [
      omitted.classNames,
      { root: omitted.className },
    ],
    [
      omitted.styles,
      { root: omitted.style },
    ],
  )

  const overlayProps = pick(omitted, overlayIncluded)

  const handleOnEnqueue = useMemo(() => {
    return batch(topTooltipContext, control.enqueue)
  }, [control, topTooltipContext])

  const handleOnUpdate = useEvent(() => {
    const { popup, trigger } = control

    if (!isOpen || !popup || !trigger) return

    const getCoords = aligners[picked.placement!] || aligners.top

    const { getArrowCoords, getPopupCoords } = getCoords(picked, popup, trigger)

    setArrowCoords(getArrowCoords(arrowCoords))

    setPopupCoords(getPopupCoords(popupCoords))
  })

  const hasCoordsChanged = useWatchCoords(picked, handleOnUpdate)

  const handleOnResize = useThrottleTick(handleOnUpdate)

  const handleOnScroll = useThrottleFrame(handleOnUpdate)

  return {
    picked,
    omitted,
    cssNames,
    cssAttrs,
    control,
    isOpen,
    arrowCoords,
    popupCoords,
    popupEvents,
    triggerEvents,
    overlayProps,
    returnEmpty: hasContentChanged || hasCoordsChanged,
    handleOnEnqueue,
    handleOnResize,
    handleOnScroll,
  }
}
