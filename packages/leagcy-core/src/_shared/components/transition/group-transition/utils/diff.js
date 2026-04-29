import { Children } from 'react';
/**
 * @description 找出本次变更需要进行入场和离场动画的元素
 */
export default function diff(prev, next) {
    const prevSet = new Set();
    const nextSet = new Set();
    Children.forEach(prev, (child) => { prevSet.add(child.key); });
    Children.forEach(next, (child) => { nextSet.add(child.key); });
    const enters = new Set();
    const exits = new Set();
    // next 有 prev 没有
    nextSet.forEach((key) => { if (!prevSet.has(key))
        enters.add(key); });
    // prev 有 next 没有
    prevSet.forEach((key) => { if (!nextSet.has(key))
        exits.add(key); });
    return [enters, exits];
}
