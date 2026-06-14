import type { EscHandlerItem } from '../_shared.props'

import { atIndex } from '@mink-ui/shared/array/at-index'
import { ownerWindow } from '@mink-ui/shared/dom/global'
import { isBrowser } from '@mink-ui/shared/dom/is-browser'
import { makeEventListener } from '@mink-ui/shared/dom/listener'
import { now } from '@mink-ui/shared/dom/raf'
import { noop } from '@mink-ui/shared/function/noop'

import { isPressKey } from '../../../utils/keyboard'

class EscStack {
  private _stack: EscHandlerItem[] = []

  private _lockDuration = 200

  private _lastEndTime = 0

  private _subscribers = 0

  private _keydownCleanup = noop

  private _composeCleanup = noop

  private init = () => {
    const root = ownerWindow()

    this._composeCleanup = makeEventListener(root, 'compositionend', () => {
      this._lastEndTime = now()
    })

    this._keydownCleanup = makeEventListener(root, 'keydown', (event) => {
      if (!isPressKey(event.key, 'esc') || event.isComposing) return

      if (now() - this._lastEndTime < this._lockDuration) return

      atIndex(this._stack, -1)?.(event)
    })
  }

  private dispose = () => {
    this._keydownCleanup()

    this._composeCleanup()
  }

  public subscribe = () => {
    if (!isBrowser) return

    this._subscribers++ === 0 && this.init()

    return () => {
      --this._subscribers === 0 && this.dispose()

      this._subscribers = Math.max(this._subscribers, 0)
    }
  }

  public activate = (active: boolean, item: EscHandlerItem) => {
    if (!active) return

    this._stack.push(item)

    return () => {
      this._stack = this._stack.filter(e => e !== item)
    }
  }
}

// TODO: 后续可能会监听其余的按键，这里先打个标记。
export const escStack = new EscStack()
