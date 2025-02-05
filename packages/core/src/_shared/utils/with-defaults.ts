import type { MayBe } from '@mink-ui/shared'

import { isObject, isUndefined } from '@mink-ui/shared'

export function withDefaults<V extends Record<string, any>>(source: V, ...partials: MayBe<Partial<V>>[]) {
  const result = { ...source } as any

  for (let i = 0, len = partials.length; i < len; i++) {
    const partial = partials[i]

    if (!isObject(partial)) continue

    const keys = Object.keys(partial)

    for (let i = 0, len = keys.length; i < len; i++) {
      const k = keys[i]

      if (isUndefined(source[k])) result[k] = partial[k]
    }
  }
  return result as V
}
