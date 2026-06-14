export function findIndex<T>(
  arr: T[],
  better: (a: T, b: T) => boolean,
) {
  if (arr.length === 0) return -1

  let best = 0

  for (let i = 0; i < arr.length; i++) {
    if (better(arr[i], arr[best])) {
      best = i
    }
  }

  return best
}
