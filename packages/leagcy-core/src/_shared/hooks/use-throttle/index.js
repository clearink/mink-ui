import { useEffect, useMemo } from 'react';
import { makeTimeout, noop } from '@mink-ui/shared';
import { useEvent } from '../use-event';
import { useExactState } from '../use-exact-state';
import { useMounted } from '../use-mounted';
// 节流 函数
export function throttle(fn, delay) {
    let cleanup = noop;
    function inner(...args) {
        if (cleanup !== noop)
            return;
        const callback = () => { cleanup = noop; fn.apply(this, args); };
        cleanup = makeTimeout(delay, callback);
    }
    return [inner, () => { cleanup(); }];
}
// 节流 hook
export function useThrottleTimeout(delay, fn) {
    const callback = useEvent(fn);
    const [throttled, clear] = useMemo(() => throttle(callback, delay), [callback, delay]);
    // 自动清除定时器
    useEffect(() => clear, [clear]);
    return throttled;
}
// 节流 value
export function useThrottleValue(delay, value) {
    const [state, setState] = useExactState(value);
    const mounted = useMounted();
    const callback = useThrottleTimeout(delay, () => { mounted() && setState(value); });
    useEffect(callback, [callback, value]);
    return state;
}
export function useThrottleState(delay, initialState) {
    const [state, set] = useExactState(initialState);
    const setState = useThrottleTimeout(delay, set);
    return [state, setState];
}
