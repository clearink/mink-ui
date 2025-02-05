import { rawType } from '../object/raw-type'
import { isFunction } from './is-function'
import { isObject } from './is-object'

export function isPromiseLike(obj: any): obj is PromiseLike<any> {
  return rawType(obj) === 'Promise' || (isObject(obj) && isFunction(obj.then))
}
