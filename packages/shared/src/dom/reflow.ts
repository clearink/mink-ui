import type { MayBe } from '../interface'

import { ownerBody } from './global'

// 强制回流
export function reflow(el?: MayBe<Element>) {
  if (el) return getComputedStyle(el).opacity

  return ownerBody().offsetHeight
}
