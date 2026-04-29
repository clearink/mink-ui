import { cloneElement, isValidElement } from 'react';
import { isFunction } from '@mink-ui/shared';
export async function withFallbackCloneElement(node, options) {
    const { fallback, props } = options;
    if (!isValidElement(node))
        return fallback;
    return cloneElement(node, isFunction(props) ? props(node.props || {}) : props);
}
