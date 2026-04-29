export function swapIndex<T>(array: T[], from: number, to: number): void {
  if (from === to) return

  const temp = array[from]

  array[from] = array[to]

  array[to] = temp
}
