import type { VoidFn } from '@mink-ui/shared/interface'
import type { SetStateDispatch } from '../../../../types/state-dispatch'
import type { OverlayInstance } from '../../../overlay/src'
import type { InternalTooltipInstance } from '../tooltip.props'

import { pushItem } from '@mink-ui/shared/array/push-item'
import { removeItem } from '@mink-ui/shared/array/remove-item'
import { getShadowRoot } from '@mink-ui/shared/dom/shadow'
import { noop } from '@mink-ui/shared/function/noop'

import { isInternalTooltipInstance } from './helpers'

export class TooltipControl {
  private _change!: SetStateDispatch<HTMLElement | null>

  private _cleanup: VoidFn | null = null

  /**
   * @description 是否处于 popup 元素中
   */
  private _isInPopupElement = false

  /**
   * @description overlay 实例
   */
  public $overlay = { current: null as OverlayInstance | null }

  /**
   * @description 浮层元素
   */
  public $popup = { current: null as HTMLDivElement | null }

  /**
   * @description popup chain
   */
  public chain: Element[] = []

  /**
   * @description portal getter
   */
  public get portal() {
    return this.$overlay.current?.portal
  }

  /**
   * @description popup getter
   */
  public get popup() {
    return this.$popup.current
  }

  /**
   * @description 绑定最新的数据
   */
  public _bind = (change: TooltipControl['_change']) => {
    this._change = change
  }

  /**
   * @description anchor 元素 refCallback
   */
  public $anchor = (el: InternalTooltipInstance | HTMLElement | null) => {
    this._change(() => isInternalTooltipInstance(el) ? el.anchor : el)
  }

  /**
   * @description 添加实例
   */
  public enqueue = (el: Element | null) => {
    if (!el) return noop

    pushItem(this.chain, el)

    return () => { removeItem(this.chain, el) }
  }

  /**
   * @description 是否处于 popup chain 中
   */
  public inChain = (event: MouseEvent, anchor: Element | null) => {
    const { popup, chain } = this

    const el = event.target as Element

    const isInChain = (item: Element | null) => {
      if (!item) return false

      if (item === el || item.contains(el)) return true

      return getShadowRoot(item)?.host === el
    }

    return this._isInPopupElement || isInChain(anchor) || isInChain(popup) || chain.some(isInChain)
  }

  public pointerEnterPopup = () => {
    // this._isInPopupElement = true
  }

  public pointerLeavePopup = () => {
    // this._isInPopupElement = false
  }

  /**
   * @description 设置清理函数
   */
  public setCleanup = (fn: VoidFn) => {
    this._cleanup = fn
  }

  /**
   * @description 执行清理函数
   */
  public dispose = () => {
    this._cleanup?.()

    this._cleanup = null
  }

  /**
   * @description 销毁
   */
  public destroy = () => {
    this.dispose()

    this._isInPopupElement = false
  }
}
