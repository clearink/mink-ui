import type { MayBe } from '../interface'

import { isNullish } from '../is/is-nullish'

export function coalesce<T>(a: MayBe<T>, value: T) {
  return isNullish(a) ? value : a
}
