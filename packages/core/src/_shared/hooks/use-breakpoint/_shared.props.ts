import type { BREAKPOINT_NAME } from './_shared.constant'

export type Breakpoint = typeof BREAKPOINT_NAME[number]

export type ScreenMatch<K = boolean> = Partial<Record<Breakpoint, K>>

export interface QueryMediaHandler<T> {
  (event: ScreenMatch): T
}
