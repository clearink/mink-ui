import { isString } from '../is/is-string'

// 首字母大写
export function capitalize<T extends string>(str: T) {
  if (!isString(str)) return str

  return `${str.charAt(0).toUpperCase()}${str.slice(1)}` as Capitalize<T>
}
