import { isUndefined } from '../is/is-undefined'

export function fallback<T>(a: T | undefined, fallback: T) {
  return isUndefined(a) ? fallback : a
}
