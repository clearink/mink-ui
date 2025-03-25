export function isArrayEqual<T extends any[]>(a: T, b: T) {
  return a.length === b.length && a.every((e, i) => e === b[i])
}
