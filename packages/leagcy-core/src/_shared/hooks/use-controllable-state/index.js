import { isFunction, isUndefined, shallowUnequal } from '@mink-ui/shared';
import { useEvent } from '../use-event';
import { useExactState } from '../use-exact-state';
export function useControllableProp(prop, state) {
    const controlled = !isUndefined(prop);
    return [controlled ? prop : state, controlled];
}
export function useControllableState(props) {
    const { defaultValue, onChange, shouldUpdate = shallowUnequal, value } = props;
    const [internal, setInternal] = useExactState(defaultValue);
    const [external, controlled] = useControllableProp(value, internal);
    const setState = useEvent((state) => {
        const next = isFunction(state) ? state(external) : state;
        if (!shouldUpdate(external, next))
            return;
        if (!controlled)
            setInternal(next);
        onChange && onChange(next);
    });
    return [external, setState, controlled];
}
