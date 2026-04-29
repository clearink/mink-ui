import type { AnyFn } from '../interface'

export function execute<T extends AnyFn>(fn: T): ReturnType<T> {
  return fn()
}
