import type { AnyFn } from '../interface'

export function isFunction(obj: any): obj is AnyFn {
  return typeof obj === 'function'
}
