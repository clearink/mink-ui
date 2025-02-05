import { ownerWindow } from './global'

export type ResizeCallback = (el: Element) => void

class ElementResizeObserver {
  private _addWindowResizeHandler = (el: Element) => {
    ownerWindow(el).addEventListener('resize', this._handleResize)
  }

  private _handleResize = () => {
    this._listeners.forEach((listeners, el) => {
      listeners.forEach((fn) => { fn(el) })
    })
  }

  private _instance: null | ResizeObserver = null

  private _listeners = new Map<Element, Set<ResizeCallback>>()

  private _removeWindowResizeHandler = (el: Element) => {
    ownerWindow(el).removeEventListener('resize', this._handleResize)
  }

  observe = (el: Element, callback: ResizeCallback) => {
    if (!this._listeners.size) this._addWindowResizeHandler(el)

    if (!this._listeners.has(el)) {
      this._listeners.set(el, new Set())

      this._getInstance()?.observe(el, { box: 'border-box' })
    }

    {
      const listeners = this._listeners.get(el)

      listeners && listeners.add(callback)
    }

    return () => {
      const listeners = this._listeners.get(el)

      listeners && listeners.delete(callback)

      if (listeners && !listeners.size) {
        this._listeners.delete(el)

        this._getInstance()?.unobserve(el)
      }

      if (!this._listeners.size) this._removeWindowResizeHandler(el)
    }
  }

  private _getInstance() {
    if (typeof ResizeObserver === 'undefined') return

    this._instance = this._instance || new ResizeObserver((entries) => {
      entries.forEach(({ target }) => {
        const listeners = this._listeners.get(target)

        listeners && listeners.forEach((fn) => { fn(target) })
      })
    })

    return this._instance
  }
}

export const observe = new ElementResizeObserver().observe
