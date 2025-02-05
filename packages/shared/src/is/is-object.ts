import type { AnyObj } from '../interface'

export function isObject(obj: any): obj is AnyObj {
  return obj != null && typeof obj === 'object'
}
