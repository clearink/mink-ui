import type { CSSProperties } from 'react'
import type { AnyFn, VoidFn } from '@mink-ui/shared/interface'
import type { FocusTrapInstance } from '../../../_shared/components/focus-trap/src'
import type { ModalButtonType } from '../_shared.props'

import { getClientCoords } from '@mink-ui/shared/dom/rect'
import { getElementScale } from '@mink-ui/shared/dom/scale'
import { isThenable } from '@mink-ui/shared/is/is-promise'

import { EventChannel } from '../../../_shared/utils/event-channel'
import { globalPointerTracker } from './singleton-tracker'

// 添加全局事件，获取当前点击位置
globalPointerTracker.subscribe()

export class ModalLoadingControl {
  public $$channel = new EventChannel()

  public confirm = false

  public cancel = false

  public emit = (type: ModalButtonType, value: boolean) => {
    this[type] = value

    this.$$channel.emit(type, value)
  }

  public on = (type: ModalButtonType, fn: AnyFn) => {
    return this.$$channel.on(type, fn)
  }

  public resolve = (immediate: boolean, type: ModalButtonType, result: any, callback?: VoidFn) => {
    if (immediate || !isThenable(result)) return callback?.()

    this.emit(type, true)

    result.then(
      () => { this.emit(type, false); callback?.() },
      () => { this.emit(type, false) },
    )
  }

  public reset = () => {
    this.emit('confirm', false)

    this.emit('cancel', false)
  }
}

export class ModalControl {
  private _transform: CSSProperties | undefined = undefined

  public $wrapper = { current: null as HTMLDivElement | null }

  public $$loading = new ModalLoadingControl()

  public $trap = { current: null as FocusTrapInstance | null }

  private get wrapper() {
    return this.$wrapper.current
  }

  private get trap() {
    return this.$trap.current
  }

  /**
   * @description 将
   */
  public onEnter = (el: HTMLElement, fromPointer: boolean) => {
    this.trap?.focus()

    const position = globalPointerTracker.position

    if (!position || !fromPointer) return

    const coords = getClientCoords(el)

    const scale = getElementScale(this.wrapper!, 1000)

    // 未变化前的中心点
    const cx = coords.left + coords.width / 2 - el.offsetWidth / 2

    const cy = coords.top + coords.height / 2 - el.offsetHeight / 2

    const dx = (position.x - cx) / scale.sx

    const dy = (position.y - cy) / scale.sy

    this._transform = {
      transformOrigin: `${dx.toFixed(3)}px ${dy.toFixed(3)}px`,
    }

    return this._transform
  }

  public onEntering = () => this._transform

  public onExit = () => this._transform

  public onExiting = () => this._transform

  public reset = () => {
    this._transform = undefined
  }
}
