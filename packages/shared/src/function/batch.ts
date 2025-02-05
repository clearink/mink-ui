import type { AnyFn, MayBe } from '../interface'

import { isFunction } from '../is/is-function'

export function batch<T extends AnyFn>(...funcs: MayBe<T>[]) {
  const filtered = funcs.filter(isFunction) as T[]

  return function batched(this: any, ...args: any[]) {
    const callbacks = filtered.map(fn => fn.apply(this, args)).filter(isFunction)

    if (!callbacks.length) return

    return function returned(this: any, ...args: any[]) {
      callbacks.forEach((fn) => { fn.apply(this, args) })
    }
  } as T
}
