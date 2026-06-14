import { isArray } from '../is/is-array'

export function pushItem<T>(array: T[], items: T | T[]) {
  if (!isArray(items)) return (array.push(items), array)

  for (let len = items.length, i = 0; i < len; i++) {
    array.push(items[i])
  }

  return array
}
