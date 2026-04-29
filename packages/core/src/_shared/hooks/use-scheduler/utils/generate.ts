import type { AnyFn } from '@mink-ui/shared/interface'

import { useEffect } from 'react'

import { useConstant } from '../../use-constant'
import { useEvent } from '../../use-event'
import { useIsMounted } from '../../use-is-mounted'
import { DeferredExecutor } from './executor'

export interface SchedulerHookOptions<T> {
  initial: T
  onCleanup: (id: string, executor: DeferredExecutor<T>) => any
  onExecute: (fn: AnyFn, executor: DeferredExecutor<T>) => string
  shouldUpdate: (id: string, executor: DeferredExecutor<T>) => boolean
}

export function makeSchedulerHook<Fn extends AnyFn, T>(options: SchedulerHookOptions<T>) {
  const { initial, onCleanup, onExecute, shouldUpdate } = options

  const executor = new DeferredExecutor(initial)

  const refresh = (state: any) => { state.id = '' }

  return (callback: AnyFn) => {
    const state = useConstant(() => ({ id: '', args: [] as any[] }))

    const isMounted = useIsMounted()

    useEffect(() => () => { onCleanup(state.id, executor); refresh(state) }, [state])

    return useEvent((...args: any[]) => {
      state.args = args

      // 当卸载时，不应进行调度逻辑
      if (!shouldUpdate(state.id, executor) || !isMounted()) return

      state.id = onExecute(() => { callback(...state.args); refresh(state) }, executor)
    }) as Fn
  }
}
