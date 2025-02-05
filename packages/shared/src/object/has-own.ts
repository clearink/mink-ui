const _hasOwnProperty = Object.prototype.hasOwnProperty

export function hasOwn(o: object, v: PropertyKey) {
  return _hasOwnProperty.call(o, v)
}
