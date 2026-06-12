import type { AnyFn, VoidFn } from '@mink-ui/shared/interface'
import type { DeferredExecutor } from './utils/executor'

export type SchedulerHook = <F extends AnyFn>(callback: F) => F

export interface SchedulerHookOptions<T> {
  initial: T
  onCleanup: (id: string, executor: DeferredExecutor<T>) => any
  onExecute: (fn: VoidFn, executor: DeferredExecutor<T>) => string
  shouldUpdate: (id: string, executor: DeferredExecutor<T>) => boolean
}
