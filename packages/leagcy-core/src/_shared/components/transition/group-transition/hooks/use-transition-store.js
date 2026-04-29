import { Children, cloneElement, createElement, useMemo } from 'react';
import { batch, omit } from '@mink-ui/shared';
import { useConstant, useForceUpdate } from '../../../../hooks';
import { makeUniqueId } from '../../../../utils';
import CssTransition from '../../css-transition';
import diff from '../utils/diff';
import union, { isGroupElementItem } from '../utils/union';
const excluded = ['children', 'onFinished', 'when', 'unmountOnExit'];
export class TransitionState {
    constructor(_props) {
        Object.defineProperty(this, "_props", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: _props
        });
        Object.defineProperty(this, "components", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "current", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "elements", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        this.current = _props.children;
    }
}
class TransitionAction {
    get _props() {
        return this.states._props;
    }
    get elements() {
        return this.states.elements;
    }
    get components() {
        return this.states.components;
    }
    constructor(forceUpdate, states) {
        Object.defineProperty(this, "forceUpdate", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: forceUpdate
        });
        Object.defineProperty(this, "states", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: states
        });
        Object.defineProperty(this, "uniqueId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: makeUniqueId('gt-')
        });
        Object.defineProperty(this, "makeElement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (element, props) => {
                const rawKey = element.key;
                const preset = omit(this._props, excluded);
                Object.assign(preset, props, {
                    ref: (instance) => {
                        if (!instance)
                            this.components.delete(rawKey);
                        else
                            this.components.set(rawKey, instance);
                    },
                    key: this.uniqueId(),
                    when: true,
                    unmountOnExit: true,
                });
                const node = createElement(CssTransition, preset, element);
                return { freeze: false, node, key: rawKey };
            }
        });
        Object.defineProperty(this, "cloneElement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ({ node, key }, freeze) => {
                // 拿到最新的回调函数
                const preset = omit(this._props, excluded);
                Object.assign(preset, { onExited: batch(preset.onExited, this.handleFinished) });
                if (freeze)
                    preset.when = false;
                return { freeze, node: cloneElement(node, preset), key };
            }
        });
        Object.defineProperty(this, "setInnerProps", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (value) => {
                this.states._props = value;
            }
        });
        Object.defineProperty(this, "setCurrent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (value) => {
                this.states.current = value;
            }
        });
        Object.defineProperty(this, "setElements", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (value) => {
                const map = new Map();
                value.forEach((item) => { map.set(item.node.key, item); });
                this.states.elements = Array.from(map.values());
            }
        });
        Object.defineProperty(this, "handleFinished", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                let isFinished = true;
                this.setElements(this.elements.filter((item) => {
                    const instance = this.components.get(item.key);
                    if (!instance)
                        return false;
                    if (instance.isExiting)
                        isFinished = false;
                    return !instance.isExited;
                }));
                isFinished && this._props.onFinished?.();
                isFinished && this.forceUpdate();
            }
        });
        Object.defineProperty(this, "updateElements", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const { children } = this._props;
                const [enters, exits] = diff(this.states.current, children);
                const allElements = union(this.elements, enters, children);
                const newElements = allElements.reduce((result, el) => {
                    result.push(isGroupElementItem(el)
                        ? this.cloneElement(el, exits.has(el.key))
                        : this.makeElement(el, { appear: true }));
                    return result;
                }, []);
                this.setElements(newElements);
                this.setCurrent(children);
                this.forceUpdate();
            }
        });
        Object.defineProperty(this, "renderNodes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (children) => {
                const map = new Map();
                Children.forEach(children, (child) => { map.set(child.key, child); });
                return this.elements.map((item) => {
                    const child = map.get(item.key);
                    if (item.freeze || !child)
                        return item.node;
                    if (child !== item.node.props.children) {
                        // 尽可能同步最新的数据
                        item.node = cloneElement(item.node, undefined, child);
                    }
                    return item.node;
                });
            }
        });
        states.elements = [];
        Children.forEach(states.current, (child) => {
            states.elements.push(this.makeElement(child));
        });
    }
}
export default function useTransitionStore(props) {
    const update = useForceUpdate();
    const states = useConstant(() => new TransitionState(props));
    const actions = useMemo(() => new TransitionAction(update, states), [update, states]);
    useMemo(() => { actions.setInnerProps(props); }, [actions, props]);
    return { actions, states };
}
