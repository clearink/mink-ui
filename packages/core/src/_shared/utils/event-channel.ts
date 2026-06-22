import type { AnyFn } from '@mink-ui/shared/interface'

export class EventChannel {
  private _subjects = new Map<string, Set<AnyFn>>()

  public on = (name: string, fn: AnyFn) => {
    const cache = this._subjects.get(name) || new Set()

    this._subjects.set(name, cache.add(fn))

    return () => { this.off(name, fn) }
  }

  public off = (name: string, fn: AnyFn) => {
    const cache = this._subjects.get(name)

    if (!cache) return

    cache.delete(fn)

    if (!cache.size) this._subjects.delete(name)
  }

  public emit = (name: string, ...args: any[]) => {
    const cache = this._subjects.get(name)

    if (!cache) return

    cache.forEach((fn) => { fn(...args) })
  }
}
