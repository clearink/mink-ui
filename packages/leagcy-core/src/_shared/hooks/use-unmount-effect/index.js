import { useEffect } from 'react';
import { useEvent } from '../use-event';
export function useUnmountEffect(effect) {
    const callback = useEvent(effect);
    useEffect(() => callback, [callback]);
}
