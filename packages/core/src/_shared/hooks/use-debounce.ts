import type { AnyFn } from '@mink-ui/shared/interface'

import { useEffect, useMemo } from 'react'

import { debounce } from '../utils/debounce'
import { useEvent } from './use-event'
import { useExactState } from './use-exact-state'
import { useIsMounted } from './use-is-mounted'

export function useDebounceTimeout<F extends AnyFn>(delay: number, fn: F) {
  const callback = useEvent(fn)

  const [debounced, cleanup] = useMemo(() => debounce(callback, delay), [callback, delay])

  // 清除定时器
  useEffect(() => cleanup, [cleanup])

  return debounced
}

export function useDebounceValue<Value>(delay: number, value: Value) {
  const [state, update] = useExactState(() => value)

  const isMounted = useIsMounted()

  const callback = useDebounceTimeout(delay, () => { isMounted() && update(value) })

  useEffect(() => { callback() }, [value, callback])

  return state
}

export function useDebounceState<State>(delay: number, initialState: State | (() => State)) {
  const [state, update] = useExactState(initialState)

  return [state, useDebounceTimeout(delay, update)] as const
}
