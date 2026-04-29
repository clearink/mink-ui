import type { Breakpoint, ScreenMatch } from '../_shared.props'

export function shouldScreenMatchUpdate(prev: ScreenMatch, next: ScreenMatch) {
  const keys = Object.keys(prev) as unknown as Breakpoint[]

  return keys.some(key => prev[key] !== next[key])
}
