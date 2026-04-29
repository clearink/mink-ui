export function pick<T extends Record<string, any>, K extends keyof T>(
  source: T,
  keys: readonly K[],
): Pick<T, K> {
  const result = {} as T

  for (let len = keys.length, i = 0; i < len; i++) {
    const key = keys[i]

    if (key in source) result[key] = source[key]
  }

  return result
}
