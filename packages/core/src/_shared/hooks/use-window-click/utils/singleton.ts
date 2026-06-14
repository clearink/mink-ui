import type { VoidFn } from '@mink-ui/shared/interface'
import type { ClickListener } from '../_shared.props'

import { ownerDocument } from '@mink-ui/shared/dom/global'
import { isBrowser } from '@mink-ui/shared/dom/is-browser'
import { makeEventListener } from '@mink-ui/shared/dom/listener'

class ClickSubject {
  private _listeners = new Set<ClickListener>()

  private _subscribers = 0

  private _cleanup: VoidFn | null = null

  private init = () => {
    const root = ownerDocument().documentElement

    this._cleanup = makeEventListener(root, 'click', (e) => {
      this._listeners.forEach((listener) => { listener(e) })
    }, true)
  }

  private dispose = () => {
    this._cleanup?.()

    this._cleanup = null
  }

  public subscribe = () => {
    if (!isBrowser) return

    this._subscribers++ === 0 && this.init()

    return () => {
      --this._subscribers === 0 && this.dispose()

      this._subscribers = Math.max(this._subscribers, 0)
    }
  }

  public activate = (active: boolean, listener: ClickListener) => {
    if (!active) return

    this._listeners.add(listener)

    return () => {
      this._listeners.delete(listener)
    }
  }
}

export const clickSubject = new ClickSubject()
