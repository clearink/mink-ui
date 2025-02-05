import { isString } from '../is/is-string'
import { capitalize } from './capitalize'

// 首字母大写
export function camelCase<T extends string>(str: T) {
  if (!isString(str)) return str

  return str.split('-').reduce((res, str, i) => {
    return res + (i === 0 ? str : capitalize(str))
  }, '')
}
