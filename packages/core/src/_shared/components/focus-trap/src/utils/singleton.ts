import type { FocusTrapItem } from '../_shared.props'

import { atIndex } from '@mink-ui/shared/array/at-index'
import { isBrowser } from '@mink-ui/shared/dom/is-browser'
import { makeEventListener } from '@mink-ui/shared/dom/listener'
import { noop } from '@mink-ui/shared/function/noop'

class FocusTrapStack {
  private _stack: FocusTrapItem[] = []

  private _subscribers = 0

  private _keydownCleanup = noop

  private _focusinCleanup = noop

  private init = (root: Document) => {
    const getTopHandler = (type: keyof FocusTrapItem) => (e: any) => {
      const topListeners = atIndex(this._stack, -1)

      topListeners && topListeners[type](e)
    }

    this._keydownCleanup = makeEventListener(root, 'keydown', getTopHandler('onKeyDown'), true)

    this._focusinCleanup = makeEventListener(root, 'focusin', getTopHandler('onFocusIn'))
  }

  private dispose = () => {
    this._keydownCleanup()

    this._focusinCleanup()
  }

  public subscribe = (root: Document) => {
    if (!isBrowser) return noop

    this._subscribers++ === 0 && this.init(root)

    return () => {
      --this._subscribers === 0 && this.dispose()

      this._subscribers = Math.max(this._subscribers, 0)
    }
  }

  public register = (item: FocusTrapItem) => {
    this._stack.push(item)

    return () => {
      this._stack = this._stack.filter(e => e !== item)
    }
  }
}

export const focusTrapStack = new FocusTrapStack()
