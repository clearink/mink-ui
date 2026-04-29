import { Component, isValidElement } from 'react';
import { isFragment, isMemo } from 'react-is';
import { isFunction, isNullish } from '@mink-ui/shared';
export function fillRef(el, ref) {
    if (isFunction(ref))
        ref(el);
    else if (!isNullish(ref))
        ref.current = el;
}
export function mergeRefs(...refs) {
    return (el) => { refs.forEach((ref) => { fillRef(el, ref); }); };
}
export function supportRef(el) {
    if (isFragment(el) || !isValidElement(el))
        return false;
    const type = isMemo(el) ? el.type.type : el.type;
    if (isFunction(type) && !(type instanceof Component))
        return false;
    return true;
}
