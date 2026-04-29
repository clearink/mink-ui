import { useEffect, useMemo } from 'react';
import { batch, getShadowRoot, makeEventListener, ownerWindow, toArray } from '@mink-ui/shared';
import { useDeepMemo, useEvent } from '../../../../hooks';
import { formatTriggerEvents, isInPopupChain } from '../utils/helpers';
// 触发事件
export default function useTooltipEvents(options) {
    const { refs, trigger, setIsOpen } = options;
    const actions = useDeepMemo(() => new Set(toArray(trigger)), [trigger]);
    const clickToHide = actions.has('click') || actions.has('contextMenu');
    const handleHidden = useEvent((event) => {
        const isInChain = () => isInPopupChain(event, refs);
        setIsOpen(isOpen => !isOpen || isInChain() ? isOpen : false);
    });
    useEffect(() => {
        const element = refs.trigger;
        if (!element || !clickToHide)
            return;
        const shadowRoot = getShadowRoot(element);
        const thisWindow = ownerWindow(element);
        return batch(makeEventListener(thisWindow, 'mousedown', handleHidden, true), makeEventListener(thisWindow, 'contextmenu', handleHidden, true), shadowRoot && makeEventListener(shadowRoot, 'mousedown', handleHidden, true), shadowRoot && makeEventListener(shadowRoot, 'contextmenu', handleHidden, true));
    }, [refs, clickToHide, handleHidden]);
    return useMemo(() => formatTriggerEvents(actions, setIsOpen), [actions, setIsOpen]);
}
