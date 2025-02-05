import type { AnyFn } from '@mink-ui/shared'

import { makeTimeout, noop } from '@mink-ui/shared'
import { useEffect, useMemo } from 'react'

import { useEvent } from '../use-event'
import { useExactState } from '../use-exact-state'
import { useMounted } from '../use-mounted'

// 节流 函数
export function throttle<F extends AnyFn>(fn: F, delay: number) {
  let cleanup = noop

  function inner(this: unknown, ...args: any[]) {
    if (cleanup !== noop) return

    const callback = () => { cleanup = noop; fn.apply(this, args) }

    cleanup = makeTimeout(delay, callback)
  }

  return [inner, () => { cleanup() }] as const
}

// 节流 hook
export function useThrottleTimeout<Fn extends AnyFn>(delay: number, fn: Fn) {
  const callback = useEvent(fn)

  const [throttled, clear] = useMemo(() => throttle(callback, delay), [callback, delay])

  // 自动清除定时器
  useEffect(() => clear, [clear])

  return throttled
}

// 节流 value
export function useThrottleValue<Value = any>(delay: number, value: Value) {
  const [state, setState] = useExactState(value)

  const mounted = useMounted()

  const callback = useThrottleTimeout(delay, () => { mounted() && setState(value) })

  useEffect(callback, [callback, value])

  return state
}

export function useThrottleState<S = undefined>(delay: number, initialState: (() => S) | S) {
  const [state, set] = useExactState(initialState)

  const setState = useThrottleTimeout(delay, set)

  return [state, setState] as const
}
