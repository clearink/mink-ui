import type { PickedInternalTooltipProps } from './tooltip.props'

export type PopupTriggerEvent = 'click' | 'contextMenu' | 'focus' | 'hover'

export type PopupPlacement = 'bottom' | 'bottomLeft' | 'bottomRight' | 'left' | 'leftBottom' | 'leftTop' | 'right' | 'rightBottom' | 'rightTop' | 'top' | 'topLeft' | 'topRight'

export interface PopupCoords {
  '--origin-x': string
  '--origin-y': string
  'transform': string
}

export interface ArrowCoords {
  left: number
  top: number
  transform: string
}

export interface ScreenCoords {
  /**
   * @description clientHeight
   */
  _ch: number

  /**
   * @description clientWidth
   */
  _cw: number

  /**
   * @description 屏幕高度
   */
  _sh: number

  /**
   * @description 屏幕宽度
   */
  _sw: number

  /**
   * @description arrow center 时需要调整的距离
   */
  _da: number

  /**
   * @description 水平方向偏移量
   */
  _dx: number

  /**
   * @description 水平方向偏移量
   */
  _dy: number

  /**
   * @description 主轴
   */
  main: MainAxis

  /**
   * @description 交叉轴
   */
  cross: CrossAxis
}

export interface ElementCoords {
  /**
   * @description 元素本身
   */
  _el: HTMLElement

  /**
   * @description clientHeight
   */
  _ch: number

  /**
   * @description clientWidth
   */
  _cw: number

  /**
   * @description height
   */
  h: number

  /**
   * @description width
   */
  w: number

  /**
   * @description top
   */
  t: number

  /**
   * @description right
   */
  r: number

  /**
   * @description bottom
   */
  b: number

  /**
   * @description left
   */
  l: number
}

export type OriginCoords = Pick<ArrowCoords, 'left' | 'top'>

export type HorizontalMainAxis = 'left' | 'right'
export type VerticalMainAxis = 'bottom' | 'top'
export type MainAxis = HorizontalMainAxis | VerticalMainAxis

export type HorizontalCrossAxis = 'bottom' | 'center' | 'top'
export type VerticalCrossAxis = 'center' | 'left' | 'right'
export type CrossAxis = HorizontalCrossAxis | VerticalCrossAxis

export interface IsOpenChangeEvent {
  (state: boolean): boolean
}

export interface IsOpenChangeHandler {
  (event: IsOpenChangeEvent): void
}

export interface GetScreenCoordsFunc {
  (picked: PickedInternalTooltipProps, popup: ElementCoords, trigger: ElementCoords): ScreenCoords
}

export interface keepArrowCenterFunc {
  (picked: PickedInternalTooltipProps, screen: ScreenCoords, trigger: ElementCoords): ScreenCoords
}

export interface OffsetScreenCoordsFunc {
  (picked: PickedInternalTooltipProps, screen: ScreenCoords): ScreenCoords
}

export interface ShiftPopupCoordsFunc {
  (picked: PickedInternalTooltipProps, screen: ScreenCoords, trigger: ElementCoords): ScreenCoords
}

export interface FlipPopupCoordsFunc {
  (picked: PickedInternalTooltipProps, screen: ScreenCoords, trigger: ElementCoords): ScreenCoords
}

export interface GetArrowCoordsFunc {
  (screen: ScreenCoords, trigger: ElementCoords): ArrowCoords
}

export interface GetOriginCoordsFunc {
  (screen: ScreenCoords, arrow: ArrowCoords): OriginCoords
}
