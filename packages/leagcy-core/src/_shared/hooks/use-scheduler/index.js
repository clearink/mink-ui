import { caf, execute, nextTick, noop, raf } from '@mink-ui/shared';
import makeSchedulerHook from './utils/make-hook';
export const useThrottleTick = makeSchedulerHook({
    initialValue: noop,
    onCleanup: execute,
    onScheduler: nextTick,
    shouldPrevent: fn => fn !== noop,
});
export const useDebounceTick = makeSchedulerHook({
    initialValue: noop,
    onCleanup: execute,
    onScheduler: nextTick,
    shouldPrevent: fn => ((fn(), false)),
});
export const useThrottleFrame = makeSchedulerHook({
    initialValue: -1,
    onCleanup: caf,
    onScheduler: raf,
    shouldPrevent: id => id !== -1,
});
export const useDebounceFrame = makeSchedulerHook({
    initialValue: -1,
    onCleanup: caf,
    onScheduler: raf,
    shouldPrevent: id => ((caf(id), false)),
});
