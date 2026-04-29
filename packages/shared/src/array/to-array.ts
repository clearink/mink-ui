import { isArray } from '../is/is-array'
import { isNullish } from '../is/is-nullish'

/**
 * @desc 严格条件下，不是数组的都将返回空数组。
 * 非严格模式下 null，undefined 才返回空数组。
 */
export function toArray<T>(value?: null | T | T[], strict = false): T[] {
  if (isArray(value)) return value

  return isNullish(value) || strict ? [] : [value]
}
