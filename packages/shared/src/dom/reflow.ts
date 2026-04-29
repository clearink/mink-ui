import type { MayBe } from '../interface'

import { ownerBody, ownerComputedStyle } from './global'

// 强制回流
export function reflow(el?: MayBe<Element>) {
  if (el) return ownerComputedStyle(el).opacity

  return ownerBody().offsetHeight
}
