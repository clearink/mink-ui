import { isBrowser, isFunction, isNullish, isObject, isString, ownerDocument } from '@mink-ui/shared';
export function getTargetElement(...args) {
    const [target, defaultElement] = args;
    if (!isBrowser)
        return null;
    if (isNullish(target))
        return defaultElement;
    if (isFunction(target))
        return target();
    if (isString(target))
        return ownerDocument().querySelector(target);
    if (isObject(target) && 'current' in target)
        return target.current;
    return target;
}
