export function exhaustive<T extends string>() {
  return <const U extends T[]>(
    arr: U,
    ..._check: Exclude<T, U[number]> extends never ? [] : [Exclude<T, U[number]>]
  ) => arr
}
