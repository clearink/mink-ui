export function arrayEqual<T extends unknown[]>(a: T, b: T) {
  return a.length === b.length && a.every((e, i) => e === b[i])
}
