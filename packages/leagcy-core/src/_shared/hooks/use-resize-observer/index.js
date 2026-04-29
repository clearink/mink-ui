import { useEffect, useRef } from 'react';
import { observe, shallowEqual } from '@mink-ui/shared';
import { getTargetElement } from '../../utils';
import { useEvent } from '../use-event';
export function useResizeObserver(target, handler) {
    const callback = useEvent(handler);
    const previousElement = useRef(null);
    useEffect(() => () => {
        previousElement.current = null;
    }, []);
    useEffect(() => {
        const targetElement = getTargetElement(target);
        if (shallowEqual(targetElement, previousElement.current)) {
            return;
        }
        previousElement.current = targetElement;
        if (targetElement)
            return observe(targetElement, callback);
    }, [callback, target]);
}
