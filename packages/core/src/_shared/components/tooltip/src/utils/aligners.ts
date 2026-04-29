import type {
  ArrowCoords,
  CrossAxis,
  ElementCoords,
  FlipPopupCoordsFunc,
  GetArrowCoordsFunc,
  GetOriginCoordsFunc,
  GetScreenCoordsFunc,
  HorizontalCrossAxis,
  HorizontalMainAxis,
  keepArrowCenterFunc,
  MainAxis,
  OffsetScreenCoordsFunc,
  PopupCoords,
  PopupPlacement,
  ScreenCoords,
  ShiftPopupCoordsFunc,
  VerticalCrossAxis,
  VerticalMainAxis,
} from '../_shared.props'
import type { PickedInternalTooltipProps } from '../tooltip.props'

import isEqual from 'react-fast-compare'
import { ownerDocument } from '@mink-ui/shared/dom/global'
import { isArray } from '@mink-ui/shared/is/is-array'
import { isObject } from '@mink-ui/shared/is/is-object'

import { getElementCoords, getNonStaticCoords } from './element'

const _size = 8
const _sqrt = (_size / 2) * 1.414
const _px = _size
const _py = _size / 2
const _offset = _size / 2
const _effect = _size / 2

/* ****************************** screen coords ****************************** */

function getTopOrBottomScreenCoords(
  main: VerticalMainAxis,
  cross: VerticalCrossAxis,
): GetScreenCoordsFunc {
  return (props, popup, trigger) => {
    const dy = (props.arrow ? _effect : 0) + _offset

    const top = main === 'top' ? trigger.t - popup._ch - dy : trigger.b + dy

    const dx = trigger.w - popup._cw

    const left = trigger.l + (cross === 'left' ? 0 : cross === 'right' ? dx : dx / 2)

    const doc = ownerDocument(trigger._el)

    const root = doc.documentElement || doc.body

    return {
      _ch: popup._ch,
      _cw: popup._cw,
      _sh: root.clientHeight,
      _sw: root.clientWidth,
      _da: 0,
      _dx: left,
      _dy: top,
      main,
      cross,
    }
  }
}

function getLeftOrRightScreenCoords(
  main: HorizontalMainAxis,
  cross: HorizontalCrossAxis,
): GetScreenCoordsFunc {
  return (props, popup, trigger) => {
    const dx = (props.arrow ? _effect : 0) + _offset

    const left = main === 'left' ? trigger.l - popup._cw - dx : trigger.r + dx

    const dy = trigger.h - popup._ch

    const top = trigger.t + (cross === 'top' ? 0 : cross === 'bottom' ? dy : dy / 2)

    const doc = ownerDocument(trigger._el)

    const root = doc.documentElement || doc.body

    return {
      _ch: popup._ch,
      _cw: popup._cw,
      _sh: root.clientHeight,
      _sw: root.clientWidth,
      _da: 0,
      _dx: left,
      _dy: top,
      main,
      cross,
    }
  }
}

/* ****************************** arrow center ****************************** */

function keepTopOrBottomArrowCenter(): keepArrowCenterFunc {
  const getDeltaCoords = (screen: ScreenCoords, trigger: ElementCoords) => {
    const { cross } = screen

    const dx = trigger.w / 2 - _px - _size

    const sign = cross === 'left' ? 1 : cross === 'right' ? -1 : 0

    return [screen._dx + sign * dx, dx] as const
  }

  return (props, screen, trigger) => {
    const { arrow } = props

    if (!(isObject(arrow) && arrow.pointAtCenter)) return screen

    const [_dx, _da] = getDeltaCoords(screen, trigger)

    return { ...screen, _dx, _da }
  }
}

function keepLeftOrRightArrowCenter(): keepArrowCenterFunc {
  const getDeltaCoords = (screen: ScreenCoords, trigger: ElementCoords) => {
    const { cross } = screen

    const dy = trigger.h / 2 - _py - _size

    const sign = cross === 'top' ? 1 : cross === 'bottom' ? -1 : 0

    return [screen._dy + sign * dy, dy] as const
  }

  return (props, screen, trigger) => {
    const { arrow } = props

    if (!(isObject(arrow) && arrow.pointAtCenter)) return screen

    const [_dy, _da] = getDeltaCoords(screen, trigger)

    return { ...screen, _da, _dy }
  }
}

/* ****************************** popup offset ****************************** */

function offsetTopOrBottomPopupCoords(): OffsetScreenCoordsFunc {
  return ({ offset }, screen) => {
    const { _dx, _dy, main } = screen

    const [h, v] = isArray(offset) ? offset : [offset, 0]

    const sign = main === 'top' ? -1 : 1

    return {
      ...screen,
      _dx: _dx + (h || 0) * sign,
      _dy: _dy + (v || 0) * sign,
    }
  }
}

function offsetLeftOrRightPopupCoords(): OffsetScreenCoordsFunc {
  return ({ offset }, screen) => {
    const { _dx, _dy, main } = screen

    const [h, v] = isArray(offset) ? offset : [offset, 0]

    const sign = main === 'left' ? -1 : 1

    return {
      ...screen,
      _dx: _dx + (h || 0) * sign,
      _dy: _dy + (v || 0) * sign,
    }
  }
}

/* ****************************** shift coords ****************************** */

function shiftTopOrBottomPopupCoords(): ShiftPopupCoordsFunc {
  const getDeltaCoords = (screen: ScreenCoords, trigger: ElementCoords) => {
    const min = (_px + _size) * 2 + screen._da

    const max = screen._sw - screen._cw

    if (screen._dx <= 0) return Math.min(trigger.r - min, 0)

    if (screen._dx >= max) return Math.max(trigger.l - screen._cw + min, max)

    return screen._dx
  }

  return (props, screen, trigger) => {
    const { shift } = props

    if (!shift || (isObject(shift) && shift.horizontal === false)) return screen

    const _dx = getDeltaCoords(screen, trigger)

    return { ...screen, _dx }
  }
}

function shiftLeftOrRightPopupCoords(): ShiftPopupCoordsFunc {
  const getDeltaCoords = (screen: ScreenCoords, trigger: ElementCoords) => {
    const min = (_py + _size) * 2 + screen._da

    const max = screen._sh - screen._ch

    if (screen._dy <= 0) return Math.min(trigger.b - min, 0)

    if (screen._dy >= max) return Math.max(trigger.t - screen._ch + min, max)

    return screen._dy
  }

  return (props, screen, trigger) => {
    const { shift } = props

    if (!shift || (isObject(shift) && shift.vertical === false)) return screen

    const _dy = getDeltaCoords(screen, trigger)

    return { ...screen, _dy }
  }
}

/* ****************************** flip coords ****************************** */

function flipTopOrBottomPopupCoords(): FlipPopupCoordsFunc {
  const getDeltaCoords = (screen: ScreenCoords, trigger: ElementCoords): [number, MainAxis] => {
    const { _ch, _sh, _dy, main } = screen

    const max = _ch + _dy

    if (main === 'top' && _dy > 0) return [_dy, main]

    if (main === 'bottom' && max < _sh) return [_dy, main]

    // TODO: 保证有足够的空间

    return [trigger.b + trigger.t - max, main === 'bottom' ? 'top' : 'bottom']
  }

  return (props, screen, trigger) => {
    const { flip } = props

    if (!flip || (isObject(flip) && flip.vertical === false)) return screen

    const [_dy, _main] = getDeltaCoords(screen, trigger)

    return { ...screen, _dy, main: _main }
  }
}

function flipLeftOrRightPopupCoords(): FlipPopupCoordsFunc {
  const getDeltaCoords = (screen: ScreenCoords, trigger: ElementCoords): [number, MainAxis] => {
    const { _cw, _sw, _dx, main } = screen

    const max = _cw + _dx

    if (main === 'left' && _dx > 0) return [_dx, main]

    if (main === 'right' && max < _sw) return [_dx, main]

    // TODO: 保证有足够的空间

    return [trigger.r + trigger.l - max, main === 'left' ? 'right' : 'left']
  }

  return (props, screen, trigger) => {
    const { flip } = props

    if (!flip || (isObject(flip) && flip.horizontal === false)) return screen

    const [_dx, _main] = getDeltaCoords(screen, trigger)

    return { ...screen, _dx, main: _main }
  }
}

/* ****************************** arrow coords ****************************** */

function getTopOrBottomArrowCoords(): GetArrowCoordsFunc {
  return (screen: ScreenCoords, trigger: ElementCoords) => {
    const { main, cross } = screen

    const rotate = main === 'top' ? 0 : 180

    const top = (main === 'top' ? screen._ch : 0) - _size

    const delta = _px + _size * 2

    const min = Math.max(trigger.l, screen._dx - screen._da)

    const max = Math.min(trigger.r, screen._dx + screen._cw + screen._da)

    let left = -screen._dx

    if (cross === 'left') left += min + _px + screen._da
    else if (cross === 'right') left += max - delta - screen._da
    else left += (min + max) / 2 - _size

    return { left, top, transform: `rotate(${rotate}deg)` }
  }
}

function getLeftOrRightArrowCoords(): GetArrowCoordsFunc {
  return (screen, trigger) => {
    const { main, cross } = screen

    const rotate = main === 'left' ? 270 : 90

    const left = (main === 'left' ? screen._cw : 0) - _size

    const delta = _py + _size * 2

    const min = Math.max(trigger.t, screen._dy - screen._da)

    const max = Math.min(trigger.b, screen._dy + screen._ch + screen._da)

    let top = -screen._dy

    if (cross === 'top') top += min + _py + screen._da
    else if (cross === 'bottom') top += max - delta - screen._da
    else top += (min + max) / 2 - _size

    return { left, top, transform: `rotate(${rotate}deg)` }
  }
}

/* ****************************** origin coords ****************************** */

function getTopOrBottomOriginCoords(): GetOriginCoordsFunc {
  return (screen, arrow) => {
    const sign = screen.main === 'top' ? 1 : -1

    return {
      top: arrow.top + _size + sign * _sqrt,
      left: arrow.left + _size,
    }
  }
}

function getLeftOrRightOriginCoords(): GetOriginCoordsFunc {
  return (screen, arrow) => {
    const sign = screen.main === 'left' ? 1 : -1

    return {
      top: arrow.top + _size,
      left: arrow.left + _size + sign * _sqrt,
    }
  }
}
/* ****************************** coords getter ****************************** */

function makePopupCoordsGetter(curr: PopupCoords) {
  return (prev: Partial<PopupCoords>) => isEqual(prev, curr) ? prev : curr
}

function makeArrowCoordsGetter(curr: ArrowCoords) {
  return (prev: Partial<ArrowCoords>) => isEqual(prev, curr) ? prev : curr
}

/* ****************************** aligner ****************************** */

function aligner(main: MainAxis, cross: CrossAxis) {
  const isTopOrBottom = main === 'top' || main === 'bottom'

  const getScreenCoords = isTopOrBottom
    ? getTopOrBottomScreenCoords(main, cross as VerticalCrossAxis)
    : getLeftOrRightScreenCoords(main, cross as HorizontalCrossAxis)

  const keepArrowCenter = isTopOrBottom
    ? keepTopOrBottomArrowCenter()
    : keepLeftOrRightArrowCenter()

  const offsetPopupCoords = isTopOrBottom
    ? offsetTopOrBottomPopupCoords()
    : offsetLeftOrRightPopupCoords()

  const shiftPopupCoords = isTopOrBottom
    ? shiftTopOrBottomPopupCoords()
    : shiftLeftOrRightPopupCoords()

  const flipPopupCoords = isTopOrBottom
    ? flipTopOrBottomPopupCoords()
    : flipLeftOrRightPopupCoords()

  const getArrowCoords = isTopOrBottom
    ? getTopOrBottomArrowCoords()
    : getLeftOrRightArrowCoords()

  const getOriginCoords = isTopOrBottom
    ? getTopOrBottomOriginCoords()
    : getLeftOrRightOriginCoords()

  return (picked: PickedInternalTooltipProps, popup: HTMLElement, trigger: HTMLElement) => {
    // 依次获得各个元素的位置信息
    const triggerCoords = getElementCoords(trigger)

    const popupCoords = getElementCoords(popup)

    const nonStaticCoords = getNonStaticCoords(popup)

    let screenCoords = getScreenCoords(picked, popupCoords, triggerCoords)

    screenCoords = offsetPopupCoords(picked, screenCoords)

    screenCoords = keepArrowCenter(picked, screenCoords, triggerCoords)

    screenCoords = shiftPopupCoords(picked, screenCoords, triggerCoords)

    screenCoords = flipPopupCoords(picked, screenCoords, triggerCoords)

    const arrowCoords = getArrowCoords(screenCoords, triggerCoords)

    const originCoords = getOriginCoords(screenCoords, arrowCoords)

    return {
      getArrowCoords: makeArrowCoordsGetter({
        left: 0,
        top: 0,
        transform: `translate3d(${arrowCoords.left}px, ${arrowCoords.top}px, 0)`
          + ` ${arrowCoords.transform}`,
      }),
      getPopupCoords: makePopupCoordsGetter({
        '--origin-x': `${originCoords.left.toFixed(2)}px`,
        '--origin-y': `${originCoords.top.toFixed(2)}px`,
        'transform': 'translate3d('
          + `${screenCoords._dx - nonStaticCoords.l}px,`
          + `${screenCoords._dy - nonStaticCoords.t}px,`
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
