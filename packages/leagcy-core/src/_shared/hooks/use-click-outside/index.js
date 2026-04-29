import { useEffect } from 'react';
import { getTargetElement } from '../../utils';
import { useEvent } from '../use-event';
import { useExactState } from '../use-exact-state';
export default function useClickOutside(target, handler) {
    const callback = useEvent(handler);
    const [el, set] = useExactState(null);
    useEffect(() => set(getTargetElement(target)), [set, target]);
    useEffect(() => {
        if (!el)
            return;
        console.log(el);
        // TODO...
    }, [el, callback]);
}
