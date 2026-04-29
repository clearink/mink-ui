import { cloneElement, forwardRef, useEffect, useRef } from 'react';
import { batch } from '@mink-ui/shared';
import { useComposeRefs, useResizeObserver } from '../../../hooks';
import { betterDisplayName } from '../../../utils';
import { getScrollElements } from '../utils/elements';
function TooltipTrigger(props, _ref) {
    const { children, events, onResize, onScroll, isOpen } = props;
    const dom = useRef(null);
    useResizeObserver(dom, onResize);
    useEffect(() => {
        if (!dom.current || !isOpen)
            return;
        const elements = getScrollElements(dom.current);
        elements.forEach((el) => { el.addEventListener('scroll', onScroll, { passive: true }); });
        return () => { elements.forEach((el) => { el.removeEventListener('scroll', onScroll); }); };
    }, [isOpen, onScroll]);
    const ref = useComposeRefs(children.ref, _ref, dom);
    const cloneProps = Object.entries(events).reduce((result, [key, fn]) => {
        result[key] = batch(fn, children.props[key]);
        return result;
    }, {});
    return cloneElement(children, { ref, ...cloneProps });
}
betterDisplayName(TooltipTrigger, 'InternalTooltip.Trigger');
export default forwardRef(TooltipTrigger);
