import type { ArrowCoords, PopupCoords } from '../_shared.props'
import type { InternalTooltipProps, OmittedInternalTooltipProps, PickedInternalTooltipProps } from '../tooltip.props'

import isEqual from 'react-fast-compare'
import { useImperativeHandle, useMemo, useState } from 'react'
import { batch } from '@mink-ui/shared/function/batch'
import { shallowEqual } from '@mink-ui/shared/object/shallow-equal'

import { useConstant } from '../../../../hooks/use-constant'
import { useEvent } from '../../../../hooks/use-event'
import { useInvoke } from '../../../../hooks/use-invoke'
import { useThrottleFrame, useThrottleTick } from '../../../../hooks/use-scheduler'
import { useCombinedSemantics } from '../../../../hooks/use-settings/use-combined'
import { useWatchValue } from '../../../../hooks/use-watch-value'
import { TOOLTIP_MARK } from '../_shared.constant'
import { InternalTooltipContext } from '../_shared.context'
import { defaultInternalTooltipProps as defaultProps } from '../tooltip.props'
import aligners from '../utils/aligners'
import { TooltipControl } from '../utils/tooltip-control'
import { useTooltipBehavior } from './use-tooltip-behavior'

export function useInternalTooltipProps(props: InternalTooltipProps) {
  const topTooltipContext = InternalTooltipContext.use()

  const {
    ref,
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

  const [arrowCoords, setArrowCoords] = useState<Partial<ArrowCoords>>({
    transform: `translate3d(0, 0, 0) rotate(0)`,
  })

  const [popupCoords, setPopupCoords] = useState<Partial<PopupCoords>>({
    transform: `translate3d(0, 0, 0) rotate(0)`,
  })

  const [triggerElement, setTriggerElement] = useState<HTMLElement | null>(null)

  const ctrl = useConstant(() => new TooltipControl())

  useInvoke(() => { ctrl._bind((updater) => { setTriggerElement(updater) }) })

  const {
    isOpen,
    popupHandlers,
    triggerHandlers,
    hasContentChanged,
  } = useTooltipBehavior(ctrl, picked, omitted, triggerElement)

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
    const { popupElement } = ctrl

    if (!isOpen || !popupElement || !triggerElement) return

    const getCoords = aligners[picked.placement!] || aligners.top

    const { getArrowCoords, getPopupCoords } = getCoords(picked, popupElement, triggerElement)

    setArrowCoords(getArrowCoords)

    setPopupCoords(getPopupCoords)
  })

  const handleResize = useThrottleTick(handleUpdate)

  const handleScroll = useThrottleFrame(handleUpdate)

  const handleEnqueue = useMemo(() => batch(topTooltipContext, ctrl.enqueue), [ctrl, topTooltipContext])

  // 影响布局的属性会被 watch
  const hasCoordsChanged = useWatchValue(
    [triggerElement, { placement, offset, arrow, shift, flip }] as const,
    handleUpdate,
    (curr, prev) => !isOpen || (shallowEqual(curr[0], prev[0]) && isEqual(curr[1], prev[1])),
  )

  useImperativeHandle(ref, () => ({
    [TOOLTIP_MARK]: true,
    get triggerElement() { return triggerElement },
    get popupElement() { return ctrl.popupElement },
  }), [ctrl, triggerElement])

  return {
    picked,
    omitted,
    cssNames,
    cssAttrs,
    ctrl,
    isOpen,
    popupHandlers,
    triggerElement,
    triggerHandlers,
    returnEmpty: hasContentChanged || hasCoordsChanged,
    handleResize,
    handleScroll,
    handleEnqueue,
  }
}
