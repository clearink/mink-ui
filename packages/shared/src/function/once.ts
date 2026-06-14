import type { AnyFn, VoidFn } from '../interface'

export interface OnceReturn<T extends AnyFn> {
  reset: VoidFn
  (...args: Parameters<T>): ReturnType<T>
}

export function once<T extends AnyFn>(fn: T): OnceReturn<T> {
  let called = false
  let result: ReturnType<T>

  function wrapped(this: any, ...args: Parameters<T>): ReturnType<T> {
    if (called) return result

    called = true

    result = fn.apply(this, args)

    return result
  }

  wrapped.reset = () => {
    called = false
    result = undefined as ReturnType<T>
  }

  return wrapped
}
