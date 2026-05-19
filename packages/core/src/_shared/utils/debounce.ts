import type { AnyFn } from '@mink-ui/shared/interface'

import { makeTimeout } from '@mink-ui/shared/dom/timer'
import { noop } from '@mink-ui/shared/function/noop'

export function debounce<F extends AnyFn>(func: F, delay: number) {
  let cleanup = noop

  function inner(this: unknown, ...args: any[]) {
    cleanup()

    cleanup = makeTimeout(delay, () => { func.apply(this, args) })
  }

  return [inner as F, () => { cleanup() }] as const
}
