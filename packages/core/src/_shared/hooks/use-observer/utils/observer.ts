import { ownerWindow } from '@mink-ui/shared/dom/global'

type CoordsCallback = (el: Element) => void

class CoordsObserver {
  private _instance: ResizeObserver | null = null

  private _listeners = new Map<Element, Set<CoordsCallback>>()

  private _getInstance = () => {
    if (typeof ResizeObserver === 'undefined') return

    this._instance ??= new ResizeObserver((entries) => {
      entries.forEach(({ target }) => {
        const listeners = this._listeners.get(target)

        listeners?.forEach((fn) => { fn(target) })
      })
    })

    return this._instance
  }

  private _execute = () => {
    this._listeners.forEach((array, el) => {
      array.forEach((fn) => { fn(el) })
    })
  }

  private _append = (el: Element) => {
    ownerWindow(el).addEventListener('resize', this._execute)
  }

  private _remove = (el: Element) => {
    ownerWindow(el).removeEventListener('resize', this._execute)
  }

  public observe = (el: Element, callback: CoordsCallback) => {
    if (!this._listeners.size) this._append(el)

    if (!this._listeners.has(el)) {
      this._listeners.set(el, new Set())

      this._getInstance()?.observe(el, { box: 'border-box' })
    }

    {
      const listeners = this._listeners.get(el)

      listeners?.add(callback)
    }

    return () => {
      const listeners = this._listeners.get(el)

      listeners?.delete(callback)

      if (listeners && !listeners.size) {
        this._listeners.delete(el)

        this._getInstance()?.unobserve(el)
      }

      if (!this._listeners.size) this._remove(el)
    }
  }
}

export default new CoordsObserver()
