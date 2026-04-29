import { isValidElement } from 'react';
import { isNullish } from '@mink-ui/shared';
export function isNodeEqual(current, next) {
    if (current === next)
        return true;
    if (!isValidElement(current) || !isValidElement(next))
        return false;
    // 此处不比较 node.type 因为组件明确以 key 为唯一标识
    return !isNullish(current.key) && current.key === next.key;
}
export function isNodesEqual(prev, next) {
    if (prev.length !== next.length)
        return false;
    return prev.every((el, i) => isNodeEqual(el, next[i]));
}
