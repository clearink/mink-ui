import { isObject } from '../is/is-object'

const _hasOwnProperty = Object.prototype.hasOwnProperty

export function hasOwn(o: object, v: PropertyKey) {
  return isObject(o) && _hasOwnProperty.call(o, v)
}
