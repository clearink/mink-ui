import { useEffect, useRef } from 'react';
import { useEvent } from '../../use-event';
export default function makeSchedulerHook(options) {
    const { initialValue, onCleanup, onScheduler, shouldPrevent } = options;
    return (callback) => {
        const ref = useRef(initialValue);
        useEffect(() => () => { onCleanup(ref.current); }, []);
        return useEvent((...args) => {
            if (shouldPrevent(ref.current))
                return;
            ref.current = onScheduler(() => { ref.current = initialValue; callback(...args); });
        });
    };
}
