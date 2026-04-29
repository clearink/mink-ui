import { useEffect, useMemo } from 'react';
import { makeTimeout } from '@mink-ui/shared';
import { useEvent } from '../use-event';
import { useExactState } from '../use-exact-state';
import { useMounted } from '../use-mounted';
// 防抖 函数
export function debounce(fn, delay) {
    let cleanup = () => { };
    function inner(...args) {
        cleanup();
        cleanup = makeTimeout(delay, () => { fn.apply(this, args); });
    }
    return [inner, () => { cleanup(); }];
}
// 防抖 hook
export function useDebounceTimeout(delay, fn) {
    const callback = useEvent(fn);
    const [debounced, clear] = useMemo(() => debounce(callback, delay), [callback, delay]);
    // 自动清除定时器
    useEffect(() => clear, [clear]);
    return debounced;
}
// 防抖 value
export function useDebounceValue(delay, value) {
    const [state, setState] = useExactState(value);
    const mounted = useMounted();
    const callback = useDebounceTimeout(delay, () => { mounted() && setState(value); });
    useEffect(callback, [callback, value]);
    return state;
}
export function useDebounceState(delay, initialState) {
    const [state, set] = useExactState(initialState);
    const setState = useDebounceTimeout(delay, set);
    return [state, setState];
}
