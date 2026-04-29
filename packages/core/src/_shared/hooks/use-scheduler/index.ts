import type { AnyFn } from '@mink-ui/shared/interface'

import { caf, nextTick, raf } from '@mink-ui/shared/dom/raf'
import { execute } from '@mink-ui/shared/function/execute'
import { noop } from '@mink-ui/shared/function/noop'

import { makeSchedulerHook } from './utils/generate'

type SchedulerHook = <F extends AnyFn>(callback: F) => F

export const useThrottleTick: SchedulerHook = makeSchedulerHook({
  initial: noop,
  onCleanup: (id, executor) => executor.cleanup(id, execute),
  onExecute: (fn, executor) => executor.execute(fn, nextTick),
  shouldUpdate: id => id === '',
})

export const useDebounceTick: SchedulerHook = makeSchedulerHook({
  initial: noop,
  onCleanup: (id, executor) => executor.cleanup(id, execute),
  onExecute: (fn, executor) => executor.execute(fn, nextTick),
  shouldUpdate: (id, executor) => ((executor.cleanup(id, execute), true)),
})

export const useThrottleFrame: SchedulerHook = makeSchedulerHook({
  initial: -1,
  onCleanup: (id, executor) => executor.cleanup(id, caf),
  onExecute: (fn, executor) => executor.execute(fn, raf),
  shouldUpdate: id => id === '',
})

export const useDebounceFrame: SchedulerHook = makeSchedulerHook({
  initial: -1,
  onCleanup: (id, executor) => executor.cleanup(id, caf),
  onExecute: (fn, executor) => executor.execute(fn, raf),
  shouldUpdate: (id, executor) => ((executor.cleanup(id, caf), true)),
})
