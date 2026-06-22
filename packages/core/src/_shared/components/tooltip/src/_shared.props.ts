import type { PortalInstance } from '../../portal/src'
import type { PickedInternalTooltipProps } from './tooltip.props'

export type PopupTriggerEvent = 'click' | 'contextMenu' | 'focus' | 'hover'

export type PopupPlacement = 'bottom' | 'bottomLeft' | 'bottomRight' | 'left' | 'leftBottom' | 'leftTop' | 'right' | 'rightBottom' | 'rightTop' | 'top' | 'topLeft' | 'topRight'

export interface PopupCssAttrs {
  'left': number
  'top': number
  'position': 'absolute'
  'transform': string
  '--origin-x': string
  '--origin-y': string
}

export interface ArrowCssAttrs {
  left: number
  top: number
  transformOrigin: 'center center'
  transform: string
}

export interface LayoutCoords {
  /**
   * @description popup delta x
   */
  _dx: number

  /**
   * @description popup delta y
   */
  _dy: number

  /**
   * @description arrow delta
   */
  _da: number

  /**
   * @description 主轴
   */
  main: MainAxis

  /**
   * @description viewport 坐标信息
   */
  view: ViewportCoords
}

export interface ElementCoords {
  /**
   * @description html 元素
   */
  _el: HTMLElement

  /**
   * @description rect height
   */
  h: number

  /**
   * @description rect width
   */
  w: number

  /**
   * @description rect top
   */
  t: number

  /**
   * @description rect right
   */
  r: number

  /**
   * @description rect bottom
   */
  b: number

  /**
   * @description rect left
   */
  l: number

  /**
   * @description 水平缩放
   */
  sx: number

  /**
   * @description 垂直缩放
   */
  sy: number
}

export interface ViewportCoords {
  /**
   * @description viewport height ( rect.width 去除滚动区域)
   */
  h: number

  /**
   * @description viewport width
   */
  w: number

  /**
   * @description viewport top
   */
  t: number

  /**
   * @description viewport right
   */
  r: number

  /**
   * @description viewport bottom
   */
  b: number

  /**
   * @description viewport left
   */
  l: number
}

export interface ArrowCoords {
  /**
   * @description arrow left
   */
  l: number

  /**
   * @description arrow top
   */
  t: number

  /**
   * @description arrow rotate
   */
  rotate: number
}

export type HorizontalMainAxis = 'left' | 'right'
export type VerticalMainAxis = 'bottom' | 'top'
export type MainAxis = HorizontalMainAxis | VerticalMainAxis

export type HorizontalCrossAxis = 'bottom' | 'center' | 'top'
export type VerticalCrossAxis = 'center' | 'left' | 'right'
export type CrossAxis = HorizontalCrossAxis | VerticalCrossAxis

export interface GetLayoutCoordsFunction {
  (picked: PickedInternalTooltipProps, portal: PortalInstance, popup: ElementCoords, anchor: ElementCoords): LayoutCoords
}

export interface keepArrowCenterFunction {
  (picked: PickedInternalTooltipProps, layout: LayoutCoords, popup: ElementCoords, anchor: ElementCoords): LayoutCoords
}

export interface OffsetPopupCoordsFunction {
  (picked: PickedInternalTooltipProps, layout: LayoutCoords): LayoutCoords
}

export interface ShiftPopupCoordsFunction {
  (picked: PickedInternalTooltipProps, layout: LayoutCoords, popup: ElementCoords, anchor: ElementCoords): LayoutCoords
}

export interface FlipPopupCoordsFunction {
  (picked: PickedInternalTooltipProps, layout: LayoutCoords, popup: ElementCoords, anchor: ElementCoords): LayoutCoords
}

export interface GetArrowCoordsFunction {
  (layout: LayoutCoords, popup: ElementCoords, anchor: ElementCoords): ArrowCoords
}

export interface GetOriginCoordsFunction {
  (layout: LayoutCoords, popup: ElementCoords, arrow: ArrowCoords): Omit<ArrowCoords, 'rotate'>
}
