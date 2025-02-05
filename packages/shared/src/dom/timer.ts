import type { VoidFn } from '../interface'

export function makeTimeout(ms: number, callback: VoidFn) {
  const id = setTimeout(callback, ms) as unknown as number

  return () => { clearTimeout(id) }
}
