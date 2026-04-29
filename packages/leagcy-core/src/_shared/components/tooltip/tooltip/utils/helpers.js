import { getShadowRoot, shallowMerge } from '@mink-ui/shared';
import { getClickEvents, getContextMenuEvents, getFocusEvents, getHoverEvents } from './events';
export function isInPopupChain(event, refs) {
    const el = event.target;
    const { trigger, popup, chain } = refs;
    const isInChain = (item) => item && (item === el || item.contains(el) || getShadowRoot(item)?.host === el);
    return isInChain(trigger) || isInChain(popup) || chain.some(item => isInChain(item));
}
export function formatTriggerEvents(actions, setIsOpen) {
    const events = [];
    if (actions.has('hover'))
        events.push(getHoverEvents(setIsOpen));
    if (actions.has('click'))
        events.push(getClickEvents(setIsOpen));
    if (actions.has('focus'))
        events.push(getFocusEvents(setIsOpen));
    if (actions.has('contextMenu'))
        events.push(getContextMenuEvents(setIsOpen));
    return events.reduce((result, tuple) => {
        result[0] = shallowMerge(result[0], tuple[0]);
        result[1] = shallowMerge(result[1], tuple[1]);
        return result;
    }, [{}, {}]);
}
