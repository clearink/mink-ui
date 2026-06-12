import { rawType } from '../object/raw-type'
import { isFunction } from './is-function'
import { isObject } from './is-object'

export function isPromise(obj: any): obj is Promise<any> {
  return rawType(obj) === 'Promise'
}

export function isThenable(obj: any): obj is PromiseLike<any> {
  return rawType(obj) === 'Promise' || (isObject(obj) && isFunction(obj.then))
}
