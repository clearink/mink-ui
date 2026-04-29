import { isFunction, shallowEqual } from '@mink-ui/shared'

import { useExactState } from '../use-exact-state'

export interface WatchOptions<S> {
  compare: (current: S, previous: S) => boolean
  listener: (current: S, previous: S) => boolean | void
}

function formatOptions<S>(options: WatchOptions<S> | WatchOptions<S>['listener']): WatchOptions<S> {
  return isFunction(options)
    ? { compare: shallowEqual, listener: options }
    : options
}

function useWatchValue<S>(current: S, args: WatchOptions<S>): boolean
function useWatchValue<S>(current: S, args: WatchOptions<S>['listener']): boolean
function useWatchValue<S>(current: S, args: any): boolean {
  const { compare, listener } = formatOptions(args)

  const [value, update] = useExactState(() => current)

  const shouldUpdate = !compare(current, value)

  if (shouldUpdate) {
    listener(current, value)
    update(current)
  }

  return shouldUpdate
}

export { useWatchValue }
