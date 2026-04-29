import type { MayBe } from '../interface'

import { toArray } from '../array/to-array'

type EventMap = DocumentEventMap | HTMLElementEventMap | SVGElementEventMap | WindowEventMap

export function makeEventListener<E extends Node | Window, K extends keyof EventMap>(
  targets: E | MayBe<E>[],
  type: K,
  listener: (event: EventMap[K]) => any,
  options?: AddEventListenerOptions | boolean,
) {
  const elements = toArray(targets).filter(Boolean) as E[]

  elements.forEach((el) => { el.addEventListener(type, listener as any, options) })

  return () => {
    elements.forEach((el) => { el.removeEventListener(type, listener as any, options) })
  }
}
