import type { InternalTooltipProps, OmittedInternalTooltipProps, PickedInternalTooltipProps } from '../tooltip.props'

import { useImperativeHandle, useMemo, useState } from 'react'
import { batch } from '@mink-ui/shared/function/batch'
import { pick } from '@mink-ui/shared/object/pick'

import { useConstant } from '../../../../hooks/use-constant'
import { useInvoke } from '../../../../hooks/use-invoke'
import { useCombinedSemantics } from '../../../../hooks/use-settings/use-combined'
import { TOOLTIP_MARK } from '../_shared.constant'
import { InternalTooltipContext } from '../_shared.context'
import { defaultInternalTooltipProps as defaultProps, tooltipOverlayProps } from '../tooltip.props'
import { TooltipControl } from '../utils/tooltip-control'
import { useTooltipCoords } from './use-tooltip-coords'
import { useTooltipHandlers } from './use-tooltip-handlers'
import { useTooltipIsOpen } from './use-tooltip-is-open'

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

  const [anchor, setAnchor] = useState<HTMLElement | null>(null)

  const ctrl = useConstant(() => new TooltipControl())

  useInvoke(() => { ctrl._bind((updater) => { setAnchor(updater) }) })

  const {
    isOpen,
    hasContentChanged,
    handleIsOpenChange,
  } = useTooltipIsOpen(ctrl, picked, omitted)

  const {
    anchorHandlers,
    popupHandlers,
  } = useTooltipHandlers(ctrl, picked, omitted, anchor, handleIsOpenChange)

  const {
    arrowCssAttrs,
    popupCssAttrs,
    hasCoordsChanged,
    handleTickedUpdate,
    handleFramedUpdate,
  } = useTooltipCoords(ctrl, picked, isOpen, anchor)

  const [cssNames, cssAttrs] = useCombinedSemantics(
    [
      omitted.classNames,
      { root: omitted.className },
    ],
    [
      omitted.styles,
      { root: omitted.style },
      { arrow: arrowCssAttrs },
      { popup: popupCssAttrs },
    ],
    { meta: { ...omitted, ...picked, isOpen } },
  )

  const handleEnqueue = useMemo(
    () => batch(topTooltipContext, ctrl.enqueue),
    [ctrl, topTooltipContext],
  )

  const overlayInherited = pick(props, tooltipOverlayProps)

  useImperativeHandle(ref, () => ({
    [TOOLTIP_MARK]: true,
    get anchor() { return anchor },
    get popup() { return ctrl.popup },
  }), [ctrl, anchor])

  return {
    picked,
    omitted,
    cssNames,
    cssAttrs,
    ctrl,
    isOpen,
    anchor,
    popupHandlers,
    anchorHandlers,
    overlayInherited,
    returnEmpty: hasContentChanged || hasCoordsChanged,
    handleEnqueue,
    handleTickedUpdate,
    handleFramedUpdate,
  }
}
