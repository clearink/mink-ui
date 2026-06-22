import type { PortalInstance } from '../../../portal/src'
import type {
  ArrowCssAttrs,
  CrossAxis,
  ElementCoords,
  FlipPopupCoordsFunction,
  GetArrowCoordsFunction,
  GetLayoutCoordsFunction,
  GetOriginCoordsFunction,
  HorizontalCrossAxis,
  HorizontalMainAxis,
  keepArrowCenterFunction,
  LayoutCoords,
  MainAxis,
  OffsetPopupCoordsFunction,
  PopupCssAttrs,
  PopupPlacement,
  ShiftPopupCoordsFunction,
  VerticalCrossAxis,
  VerticalMainAxis,
} from '../_shared.props'
import type { PickedInternalTooltipProps } from '../tooltip.props'

import isEqual from 'react-fast-compare'
import { isArray } from '@mink-ui/shared/is/is-array'
import { isObject } from '@mink-ui/shared/is/is-object'

import { units } from '../_shared.constant'
import { resolveContainCoords, resolveElementCoords, resolveViewportCoords } from './format'
import { findViewportElement } from './helpers'

/* ****************************** layout coords ****************************** */

function getTopOrBottomLayoutCoords(
  main: VerticalMainAxis,
  cross: VerticalCrossAxis,
): GetLayoutCoordsFunction {
  return ({ arrow }, portal, popup, anchor) => {
    const effect = units.effect * popup.sx
    const offset = units.offset * popup.sx

    const dx = anchor.w - popup.w

    const dy = (arrow ? effect : 0) + offset

    const left = anchor.l + (cross === 'left' ? 0 : cross === 'right' ? dx : dx / 2)

    const top = main === 'top' ? anchor.t - popup.h - dy : anchor.b + dy

    const view = findViewportElement(portal, popup._el)

    return {
      _dx: left,
      _dy: top,
      _da: 0,
      main,
      view: resolveViewportCoords(view),
    }
  }
}

function getLeftOrRightLayoutCoords(
  main: HorizontalMainAxis,
  cross: HorizontalCrossAxis,
): GetLayoutCoordsFunction {
  return ({ arrow }, portal, popup, anchor) => {
    const effect = units.effect * popup.sx
    const offset = units.offset * popup.sx

    const dx = (arrow ? effect : 0) + offset

    const dy = anchor.h - popup.h

    const left = main === 'left' ? anchor.l - popup.w - dx : anchor.r + dx

    const top = anchor.t + (cross === 'top' ? 0 : cross === 'bottom' ? dy : dy / 2)

    const view = findViewportElement(portal, popup._el)

    return {
      _dx: left,
      _dy: top,
      _da: 0,
      main,
      view: resolveViewportCoords(view),
    }
  }
}

/* ****************************** arrow center ****************************** */

function keepTopOrBottomArrowCenter(cross: VerticalCrossAxis): keepArrowCenterFunction {
  const shouldUpdate = ({ arrow }: PickedInternalTooltipProps) => {
    return isObject(arrow) && !!arrow.pointAtCenter
  }

  const getCoordsValues = (layout: LayoutCoords, popup: ElementCoords, anchor: ElementCoords) => {
    const gapx = units.gapx * popup.sx
    const base = units.base * popup.sx

    const delta = anchor.w / 2 - (gapx + base)

    const sign = cross === 'left' ? 1 : cross === 'right' ? -1 : 0

    return [layout._dx + sign * delta, delta] as const
  }

  return (picked, layout, popup, anchor) => {
    if (!shouldUpdate(picked)) return layout

    const [_dx, _da] = getCoordsValues(layout, popup, anchor)

    return { ...layout, _dx, _da }
  }
}

function keepLeftOrRightArrowCenter(cross: HorizontalCrossAxis): keepArrowCenterFunction {
  const shouldUpdate = ({ arrow }: PickedInternalTooltipProps) => {
    return isObject(arrow) && !!arrow.pointAtCenter
  }

  const getCoordsValues = (layout: LayoutCoords, popup: ElementCoords, anchor: ElementCoords) => {
    const gapy = units.gapy * popup.sy
    const base = units.base * popup.sy

    const delta = anchor.h / 2 - (gapy + base)

    const sign = cross === 'top' ? 1 : cross === 'bottom' ? -1 : 0

    return [layout._dy + sign * delta, delta] as const
  }

  return (picked, layout, popup, anchor) => {
    if (!shouldUpdate(picked)) return layout

    const [_dy, _da] = getCoordsValues(layout, popup, anchor)

    return { ...layout, _dy, _da }
  }
}

/* ****************************** popup offset ****************************** */

function offsetTopOrBottomPopupCoords(main: VerticalMainAxis): OffsetPopupCoordsFunction {
  return ({ offset }, layout) => {
    const [h, v] = isArray(offset) ? offset : [offset, 0]

    const sign = main === 'top' ? -1 : 1

    const dx = layout._dx + (h || 0) * sign
    const dy = layout._dy + (v || 0) * sign

    return { ...layout, _dx: dx, _dy: dy }
  }
}

function offsetLeftOrRightPopupCoords(main: HorizontalMainAxis): OffsetPopupCoordsFunction {
  return ({ offset }, layout) => {
    const [h, v] = isArray(offset) ? offset : [offset, 0]

    const sign = main === 'left' ? -1 : 1

    const dx = layout._dx + (h || 0) * sign

    const dy = layout._dy + (v || 0) * sign

    return { ...layout, _dx: dx, _dy: dy }
  }
}

/* ****************************** shift coords ****************************** */

function shiftTopOrBottomPopupCoords(): ShiftPopupCoordsFunction {
  const shouldUpdate = ({ shift }: PickedInternalTooltipProps) => {
    return !!shift && !(isObject(shift) && shift.horizontal === false)
  }

  const getCoordsValues = (layout: LayoutCoords, popup: ElementCoords, anchor: ElementCoords) => {
    const gapx = units.gapx * popup.sx
    const base = units.base * popup.sx

    const delta = layout._da + (gapx + base) * 2

    const min = layout.view.l

    const max = layout.view.r - popup.w

    if (layout._dx <= min) return Math.min(anchor.r - delta, min)

    if (layout._dx >= max) return Math.max(anchor.l - popup.w + delta, max)

    return layout._dx
  }

  return (picked, layout, popup, anchor) => {
    if (!shouldUpdate(picked)) return layout

    const _dx = getCoordsValues(layout, popup, anchor)

    return { ...layout, _dx }
  }
}

function shiftLeftOrRightPopupCoords(): ShiftPopupCoordsFunction {
  const shouldUpdate = ({ shift }: PickedInternalTooltipProps) => {
    return !!shift && !(isObject(shift) && shift.vertical === false)
  }

  const getCoordsValues = (layout: LayoutCoords, popup: ElementCoords, anchor: ElementCoords) => {
    const gapy = units.gapy * popup.sy
    const base = units.base * popup.sy

    const delta = layout._da + (gapy + base) * 2

    const min = layout.view.t

    const max = layout.view.b - popup.h

    if (layout._dy <= min) return Math.min(anchor.b - delta, min)

    if (layout._dy >= max) return Math.max(anchor.t + delta - popup.h, max)

    return layout._dy
  }

  return (picked, layout, popup, anchor) => {
    if (!shouldUpdate(picked)) return layout

    const _dy = getCoordsValues(layout, popup, anchor)

    return { ...layout, _dy }
  }
}

/* ****************************** flip coords ****************************** */

function flipTopOrBottomPopupCoords(main: VerticalMainAxis): FlipPopupCoordsFunction {
  const shouldUpdate = ({ flip }: PickedInternalTooltipProps) => {
    return !!flip && !(isObject(flip) && flip.vertical === false)
  }

  const getCoordsValues = (layout: LayoutCoords, popup: ElementCoords, anchor: ElementCoords): [number, MainAxis] => {
    const delta = layout._dy + popup.h

    const min = layout.view.t

    const max = layout.view.b - popup.h

    if (main === 'top' && layout._dy >= min) return [layout._dy, main]

    if (main === 'bottom' && layout._dy <= max) return [layout._dy, main]

    return [anchor.t + anchor.b - delta, main === 'bottom' ? 'top' : 'bottom']
  }

  return (picked, layout, popup, anchor) => {
    if (!shouldUpdate(picked)) return layout

    const [_dy, main] = getCoordsValues(layout, popup, anchor)

    return { ...layout, _dy, main }
  }
}

function flipLeftOrRightPopupCoords(main: HorizontalMainAxis): FlipPopupCoordsFunction {
  const shouldUpdate = ({ flip }: PickedInternalTooltipProps) => {
    return !!flip && !(isObject(flip) && flip.horizontal === false)
  }

  const getCoordsValues = (layout: LayoutCoords, popup: ElementCoords, anchor: ElementCoords): [number, MainAxis] => {
    const delta = layout._dx + popup.w

    const min = layout.view.l

    const max = layout.view.r - popup.w

    if (main === 'left' && layout._dx >= min) return [layout._dx, main]

    if (main === 'right' && layout._dx <= max) return [layout._dx, main]

    return [anchor.r + anchor.l - delta, main === 'left' ? 'right' : 'left']
  }

  return (picked, layout, popup, anchor) => {
    if (!shouldUpdate(picked)) return layout

    const [_dx, main] = getCoordsValues(layout, popup, anchor)

    return { ...layout, _dx, main }
  }
}

/* ****************************** arrow coords ****************************** */

function getTopOrBottomArrowCoords(cross: VerticalCrossAxis): GetArrowCoordsFunction {
  return (layout: LayoutCoords, popup: ElementCoords, anchor: ElementCoords) => {
    const gapx = units.gapx * popup.sx
    const base = units.base * popup.sx

    const delta = gapx + base * 2

    const rotate = layout.main === 'top' ? 0 : 180

    const top = (layout.main === 'top' ? popup.h : 0) - base

    const min = Math.max(anchor.l, layout._dx - layout._da)

    const max = Math.min(anchor.r, layout._dx + popup.w + layout._da)

    let left = -layout._dx

    if (cross === 'left') left += min + gapx + layout._da
    else if (cross === 'right') left += max - delta - layout._da
    else left += (min + max) / 2 - base

    return { l: left, t: top, rotate }
  }
}

function getLeftOrRightArrowCoords(cross: HorizontalCrossAxis): GetArrowCoordsFunction {
  return (layout, popup, anchor) => {
    const gapy = units.gapy * popup.sy
    const base = units.base * popup.sy

    const delta = gapy + base * 2

    const rotate = layout.main === 'left' ? 270 : 90

    const left = (layout.main === 'left' ? popup.w : 0) - base

    const min = Math.max(anchor.t, layout._dy - layout._da)

    const max = Math.min(anchor.b, layout._dy + popup.h + layout._da)

    let top = -layout._dy

    if (cross === 'top') top += min + gapy + layout._da
    else if (cross === 'bottom') top += max - delta - layout._da
    else top += (min + max) / 2 - base

    return { l: left, t: top, rotate }
  }
}

/* ****************************** origin coords ****************************** */

function getTopOrBottomOriginCoords(): GetOriginCoordsFunction {
  return (layout, popup, arrow) => {
    const base = units.base * popup.sy
    const sqrt = units.sqrt * popup.sy

    const sign = layout.main === 'top' ? 1 : -1

    const top = arrow.t + base + sign * sqrt

    const left = arrow.l + base

    return { t: top, l: left }
  }
}

function getLeftOrRightOriginCoords(): GetOriginCoordsFunction {
  return (layout, popup, arrow) => {
    const base = units.base * popup.sx
    const sqrt = units.sqrt * popup.sx

    const sign = layout.main === 'left' ? 1 : -1

    const left = arrow.l + base + sign * sqrt

    const top = arrow.t + base

    return { t: top, l: left }
  }
}
/* *************************** coords updater *************************** */

function makePopupCoordsUpdater(curr: PopupCssAttrs) {
  return (prev: Partial<PopupCssAttrs>) => isEqual(prev, curr) ? prev : curr
}

function makeArrowCoordsUpdater(curr: ArrowCssAttrs) {
  return (prev: Partial<ArrowCssAttrs>) => isEqual(prev, curr) ? prev : curr
}

/* ****************************** aligner ****************************** */

function aligner(main: MainAxis, cross: CrossAxis) {
  const isTopOrBottom = main === 'top' || main === 'bottom'

  const getLayoutCoords = isTopOrBottom
    ? getTopOrBottomLayoutCoords(main, cross as VerticalCrossAxis)
    : getLeftOrRightLayoutCoords(main, cross as HorizontalCrossAxis)

  const keepArrowCenter = isTopOrBottom
    ? keepTopOrBottomArrowCenter(cross as VerticalCrossAxis)
    : keepLeftOrRightArrowCenter(cross as HorizontalCrossAxis)

  const offsetPopupCoords = isTopOrBottom
    ? offsetTopOrBottomPopupCoords(main)
    : offsetLeftOrRightPopupCoords(main)

  const shiftPopupCoords = isTopOrBottom
    ? shiftTopOrBottomPopupCoords()
    : shiftLeftOrRightPopupCoords()

  const flipPopupCoords = isTopOrBottom
    ? flipTopOrBottomPopupCoords(main)
    : flipLeftOrRightPopupCoords(main)

  const getArrowCoords = isTopOrBottom
    ? getTopOrBottomArrowCoords(cross as VerticalCrossAxis)
    : getLeftOrRightArrowCoords(cross as HorizontalCrossAxis)

  const getOriginCoords = isTopOrBottom
    ? getTopOrBottomOriginCoords()
    : getLeftOrRightOriginCoords()

  return (
    picked: PickedInternalTooltipProps,
    portal: PortalInstance,
    popup: HTMLElement,
    anchor: HTMLElement,
  ) => {
    const anchorCoords = resolveElementCoords(anchor, false)

    const popupCoords = resolveElementCoords(popup, true)

    const containCoords = resolveContainCoords(popup)

    let layoutCoords = getLayoutCoords(picked, portal, popupCoords, anchorCoords)

    layoutCoords = offsetPopupCoords(picked, layoutCoords)

    layoutCoords = keepArrowCenter(picked, layoutCoords, popupCoords, anchorCoords)

    layoutCoords = shiftPopupCoords(picked, layoutCoords, popupCoords, anchorCoords)

    layoutCoords = flipPopupCoords(picked, layoutCoords, popupCoords, anchorCoords)

    const arrowCoords = getArrowCoords(layoutCoords, popupCoords, anchorCoords)

    const originCoords = getOriginCoords(layoutCoords, popupCoords, arrowCoords)

    return {
      arrowUpdater: makeArrowCoordsUpdater({
        top: 0,
        left: 0,
        transformOrigin: 'center center',
        transform: 'translate3d('
          + `${(arrowCoords.l / popupCoords.sx).toFixed(3)}px,`
          + `${(arrowCoords.t / popupCoords.sy).toFixed(3)}px,`
          + `0) rotate(${arrowCoords.rotate}deg)`,
      }),
      popupUpdater: makePopupCoordsUpdater({
        'top': 0,
        'left': 0,
        'position': 'absolute',
        '--origin-x': `${(originCoords.l / popupCoords.sx).toFixed(3)}px`,
        '--origin-y': `${(originCoords.t / popupCoords.sy).toFixed(3)}px`,
        'transform': 'translate3d('
          + `${((layoutCoords._dx - containCoords.l) / popupCoords.sx).toFixed(3)}px,`
          + `${((layoutCoords._dy - containCoords.t) / popupCoords.sy).toFixed(3)}px,`
          + '0)',
      }),
    }
  }
}

const aligners: Record<PopupPlacement, ReturnType<typeof aligner>> = {
  bottom: aligner('bottom', 'center'),
  bottomLeft: aligner('bottom', 'left'),
  bottomRight: aligner('bottom', 'right'),
  left: aligner('left', 'center'),
  leftBottom: aligner('left', 'bottom'),
  leftTop: aligner('left', 'top'),
  right: aligner('right', 'center'),
  rightBottom: aligner('right', 'bottom'),
  rightTop: aligner('right', 'top'),
  top: aligner('top', 'center'),
  topLeft: aligner('top', 'left'),
  topRight: aligner('top', 'right'),
}

export default aligners
