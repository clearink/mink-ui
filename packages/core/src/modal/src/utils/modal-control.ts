import type { CSSProperties } from 'react'
import type { AnyFn, VoidFn } from '@mink-ui/shared/interface'
import type { FocusTrapInstance } from '../../../_shared/components/focus-trap/src'
import type { ModalButtonType } from '../_shared.props'

import { isThenable } from '@mink-ui/shared/is/is-promise'

import { EventChannel } from '../../../_shared/utils/event-channel'
import { globalPointerTracker } from './singleton'

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
  public $$loading = new ModalLoadingControl()

  public $trap = { current: null as FocusTrapInstance | null }

  public transform: CSSProperties | undefined = undefined

  public get trap() {
    return this.$trap.current
  }

  public prepare = (el: HTMLElement) => {
    this.trap?.focus()

    const position = globalPointerTracker.position

    if (!position) return this.transform

    const rect = el.getBoundingClientRect()

    const dx = position.x - rect.left - (rect.width - el.offsetWidth) / 2
    const dy = position.y - rect.top - (rect.height - el.offsetHeight) / 2

    this.transform = { transformOrigin: `${dx}px ${dy}px` }

    return this.transform
  }

  public reset = () => {
    this.transform = undefined
  }
}
