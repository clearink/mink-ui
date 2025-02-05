import type { AnyFn } from '../interface'

export function execute(fn: AnyFn) {
  fn()
}
