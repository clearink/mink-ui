import { atIndex } from '@mink-ui/shared';
export function isExitDisabled(states) {
    const { components, elements } = states;
    const { key } = atIndex(elements, 0);
    const instance = components.get(key);
    return !instance || instance.isExited;
}
export function isEnterDisabled(states) {
    const { components, elements } = states;
    if (elements.length < 2)
        return false;
    const { key } = atIndex(elements, -1);
    const instance = components.get(key);
    return !instance || instance.isEntered;
}
