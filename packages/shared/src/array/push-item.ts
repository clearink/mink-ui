import { isArray } from '../is/is-array'

export function pushItem<T>(array: T[], items: T | T[]) {
  if (isArray(items)) {
    for (let len = items.length, i = 0; i < len; i++) {
      array.push(items[i])
    }
  }
  else {
    array.push(items)
  }

  return array
}
