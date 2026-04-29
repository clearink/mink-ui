import { isFunction, shallowEqual } from '@mink-ui/shared';
import { useExactState } from '../use-exact-state';
function formatOptions(options) {
    return isFunction(options)
        ? { compare: shallowEqual, listener: options }
        : options;
}
function useWatchValue(current, args) {
    const { compare, listener } = formatOptions(args);
    const [value, update] = useExactState(() => current);
    const shouldUpdate = !compare(current, value);
    if (shouldUpdate) {
        listener(current, value);
        update(current);
    }
    return shouldUpdate;
}
export { useWatchValue };
