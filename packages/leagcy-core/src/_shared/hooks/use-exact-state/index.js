import { useState } from 'react';
import { isFunction, shallowEqual } from '@mink-ui/shared';
import { useEvent } from '../use-event';
function useExactState(initialState) {
    const [state, update] = useState(initialState);
    const setState = useEvent((action) => {
        const next = isFunction(action) ? action(state) : action;
        if (!shallowEqual(state, next))
            update(next);
    });
    return [state, setState];
}
export { useExactState };
