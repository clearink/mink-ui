import { isObject } from '../is/is-object'
import { isUndefined } from '../is/is-undefined'

/**
 * @description 浅合并
 */
export function shallowMerge<T extends Record<string, any>>(...sources: Partial<T>[]): T {
  const result = { ...sources[0] } as any

  for (let i = 1; i < sources.length; i++) {
    const partial = sources[i]

    if (!isObject(partial)) continue

    const keys = Object.keys(partial)

    for (let len = keys.length, j = 0; j < len; j++) {
      const key = keys[j]

      if (!isUndefined(result[key])) continue

      result[key] = partial[key]
    }
  }

  return result as T
}
