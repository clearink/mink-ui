import type { MayBe } from '../interface'

import { ownerDocument, ownerStyle } from './global'

// 强制回流
export function reflow(el?: MayBe<Element>) {
  if (el) return ownerStyle(el).opacity

  return ownerDocument().body.offsetHeight
}
