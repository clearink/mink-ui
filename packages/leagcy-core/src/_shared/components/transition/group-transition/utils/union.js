import { Children } from 'react';
import { fallback, hasOwn } from '@mink-ui/shared';
// 并集且有序
export default function union(elements, enters, children) {
    const orders = new Map();
    const result = [];
    const map = new Map();
    elements.forEach((item) => { map.set(item.key, item); });
    Children.forEach(children, (el, index) => {
        if (orders.has(el.key)) {
            throw new Error(`two children with the same key, '${el.key}'. `);
        }
        const item = enters.has(el.key) ? el : map.get(el.key);
        orders.set(el.key, index);
        result.push(item);
    });
    let lastIndex = -1;
    elements.forEach((item) => {
        const index = fallback(orders.get(item.key), -1);
        if (index < 0)
            result.splice(++lastIndex, 0, item);
        else if (lastIndex < index)
            lastIndex = index;
    });
    return result;
}
export function isGroupElementItem(item) {
    return hasOwn(item, 'node') && hasOwn(item, 'freeze');
}
