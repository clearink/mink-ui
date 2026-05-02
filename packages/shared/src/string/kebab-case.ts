import { isString } from '../is/is-string'

// 驼峰转短横线
export function kebabCase<T extends string>(str: T) {
  if (!isString(str)) return str

  return str.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)
}
