import { getClientCoords, getElementStyle } from '@mink-ui/shared';
import { getPositionedElement } from '../../../utils';
function isScrollable(el) {
    const { overflow: o, overflowX: ox, overflowY: oy } = getElementStyle(el);
    const builtin = new Set(['auto', 'clip', 'hidden', 'scroll']);
    return builtin.has(o) || builtin.has(ox) || builtin.has(oy);
}
export function getScrollElements(element) {
    const elements = [];
    let current = element.parentElement;
    while (current) {
        if (isScrollable(current))
            elements.push(current);
        current = current.parentElement;
    }
    return elements;
}
export function getElementCoords(el) {
    const coords = getClientCoords(el);
    return {
        /** clientHeight */
        _height: el.clientHeight,
        /** clientWidth */
        _width: el.clientWidth,
        bottom: coords.bottom,
        el,
        height: coords.height,
        left: coords.left,
        right: coords.right,
        top: coords.top,
        width: coords.width,
    };
}
export function getPositionedCoords(el) {
    return getElementCoords(getPositionedElement(el));
}
