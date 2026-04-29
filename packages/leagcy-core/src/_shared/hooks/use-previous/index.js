import { useMemo } from 'react';
import { shallowUnequal } from '@mink-ui/shared';
import { useConstant } from '../use-constant';
export function usePrevious(value) {
    const state = useConstant(() => ({
        current: undefined,
        previous: undefined,
    }));
    return useMemo(() => {
        if (shallowUnequal(state.current, value)) {
            state.previous = state.current;
            state.current = value;
        }
        return state.previous;
    }, [state, value]);
}
