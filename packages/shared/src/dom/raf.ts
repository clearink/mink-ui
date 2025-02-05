import type { VoidFn } from '../interface'

import { isFunction } from '../is/is-function'

export const now = typeof performance === 'undefined' ? () => Date.now() : () => performance.now()

export const raf: typeof requestAnimationFrame
  = typeof requestAnimationFrame === 'undefined'
    ? callback => (setTimeout(callback, 16.667, now()) as any)
    : requestAnimationFrame

export const caf: typeof cancelAnimationFrame
  = typeof cancelAnimationFrame === 'undefined'
    ? clearTimeout
    : cancelAnimationFrame

export function currFrame(callback: (time: number) => void | VoidFn) {
  const ids: [number, void | VoidFn] = [-1, undefined]

  ids[0] = raf((t) => { ids[1] = callback(t) })

  return () => { caf(ids[0]); isFunction(ids[1]) && ids[1]() }
}

export function nextFrame(callback: (time: number) => void | VoidFn) {
  const ids: [number, number, void | VoidFn] = [-1, -1, undefined]

  ids[0] = raf(() => { ids[1] = raf((t) => { ids[2] = callback(t) }) })

  return () => { caf(ids[0]); caf(ids[1]); isFunction(ids[2]) && ids[2]() }
}

export function loopFrame(callback: (time: number) => boolean) {
  let id: number

  const tick = (time: number) => { if (callback(time)) id = raf(tick) }

  id = raf(tick)

  return () => { caf(id) }
}

export function nextTick(callback: () => void | VoidFn) {
  const ids: [boolean, void | VoidFn] = [false, undefined]

  Promise.resolve()
    .then(() => { if (!ids[0]) ids[1] = callback() })
    .catch((e) => { setTimeout(() => { throw e }) })

  return () => { ids[0] = true; isFunction(ids[1]) && ids[1]() }
}
