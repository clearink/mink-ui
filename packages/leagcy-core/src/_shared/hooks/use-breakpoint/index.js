import { useEffect } from 'react';
import { isUndefined } from '@mink-ui/shared';
import { useEvent } from '../use-event';
import { useExactState } from '../use-exact-state';
import observer from './breakpoint-observer';
// 基础响应式断点 hooks
export function useBreakpoint(shouldUpdate) {
    const [matches, updateMatches] = useExactState(observer.getCurrentMatches);
    const handler = useEvent((query) => {
        if (isUndefined(shouldUpdate) || shouldUpdate(query))
            updateMatches(query);
    });
    useEffect(() => observer.subscribe(handler), [handler]);
    return matches;
}
