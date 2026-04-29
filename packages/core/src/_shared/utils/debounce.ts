import type { AnyFn } from '@mink-ui/shared/interface'

import { makeTimeout } from '@mink-ui/shared/dom/timer'

export function debounce<F extends AnyFn>(func: F, delay: number) {
  let params: any[] = []
  let context: unknown = null
  let cleanup = () => {}

  function inner(this: unknown, ...args: any[]) {
    cleanup()

    params = args
    // eslint-disable-next-line ts/no-this-alias
    context = this

    cleanup = makeTimeout(delay, () => { func.apply(context, params) })
  }

  return [inner as F, () => { cleanup() }] as const
}
