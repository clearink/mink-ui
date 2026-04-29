import { isObject } from '../is/is-object'
import { isUndefined } from '../is/is-undefined'

/**
 * @description source 中不存在或为 undefined 的字段由 partials 填充
 */
export function shallowMerge<T extends Record<string, any>, U extends Partial<T>>(source: T, ...partials: U[]) {
  const result = { ...source } as any

  for (let size = partials.length, i = 0; i < size; i++) {
    const partial = partials[i]

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
