import { isNumber } from '@mink-ui/shared/is/is-number'

export function makeUniqueId(base: number): () => number
export function makeUniqueId(base: string): () => string
export function makeUniqueId(base: string | number): () => any {
  const numeric = isNumber(base)

  let id = numeric ? base : 0

  return numeric ? () => id++ : () => `${base}${id++}`
}
