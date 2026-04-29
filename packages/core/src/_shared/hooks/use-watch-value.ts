import { isFunction } from '@mink-ui/shared/is/is-function'
import { shallowEqual } from '@mink-ui/shared/object/shallow-equal'

import { useExactState } from './use-exact-state'
import { useInvoke } from './use-invoke'

export interface WatchOptions<S> {
  compare: (current: S, previous: S) => boolean
  listener: (current: S, previous: S) => void
}

function normalizeOptions<S>(options: WatchOptions<S> | WatchOptions<S>['listener']): WatchOptions<S> {
  return isFunction(options)
    ? { compare: shallowEqual, listener: options }
    : options
}

export function useWatchValue<S>(current: S, args: WatchOptions<S>): boolean
export function useWatchValue<S>(current: S, args: WatchOptions<S>['listener']): boolean
export function useWatchValue<S>(current: S, args: any): boolean {
  const { compare, listener } = normalizeOptions(args)

  const [value, update] = useExactState(() => current)

  return useInvoke(() => {
    if (compare(current, value)) return false

    listener(current, value)

    update(current)

    return true
  })
}
