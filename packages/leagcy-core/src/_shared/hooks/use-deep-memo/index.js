import { useMemo } from 'react';
import isEqual from 'react-fast-compare';
import { useConstant } from '../use-constant';
export function useDeepMemo(factory, deps) {
    const state = useConstant(() => ({ deps, value: factory() }));
    return useMemo(() => {
        if (!isEqual(state.deps, deps)) {
            state.deps = deps;
            state.value = factory();
        }
        return state.value;
    }, [deps, factory, state]);
}
