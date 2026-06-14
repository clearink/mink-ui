import type { ResizeListener } from '../_shared.props'

import { ownerWindow } from '@mink-ui/shared/dom/global'
import { isBrowser } from '@mink-ui/shared/dom/is-browser'

class ResizeMonitor {
  private _instance: ResizeObserver | null = null

  private _listeners = new Map<Element, Set<ResizeListener>>()

  private _subscribers = 0

  private execute = () => {
    this._listeners.forEach((array, el) => { array.forEach((fn) => { fn(el) }) })
  }

  private getInstance = () => {
    if (typeof ResizeObserver === 'undefined') return

    this._instance ??= new ResizeObserver((entries) => {
      entries.forEach(({ target }) => {
        const listeners = this._listeners.get(target)

        listeners?.forEach((fn) => { fn(target) })
      })
    })

    return this._instance
  }

  private init = () => {
    if (typeof ResizeObserver !== 'undefined') return

    ownerWindow().addEventListener('resize', this.execute)
  }

  private dispose = () => {
    if (typeof ResizeObserver !== 'undefined') return

    ownerWindow().removeEventListener('resize', this.execute)
  }

  public subscribe = () => {
    if (!isBrowser) return

    this._subscribers++ === 0 && this.init()

    return () => {
      --this._subscribers === 0 && this.dispose()

      this._subscribers = Math.max(this._subscribers, 0)
    }
  }

  public activate = (el: Element, listener: ResizeListener) => {
    if (!this._listeners.has(el)) {
      this._listeners.set(el, new Set())

      this.getInstance()?.observe(el, { box: 'border-box' })
    }

    this._listeners.get(el)?.add(listener)

    return () => {
      const listeners = this._listeners.get(el)

      listeners?.delete(listener)

      if (listeners && !listeners.size) {
        this._listeners.delete(el)

        this.getInstance()?.unobserve(el)
      }
    }
  }
}

export const resizeMonitor = new ResizeMonitor()
