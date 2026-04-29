import { cloneElement, createElement, useMemo } from 'react';
import { atIndex, batch, omit } from '@mink-ui/shared';
import { useConstant, useForceUpdate } from '../../../../hooks';
import { makeUniqueId } from '../../../../utils';
import CssTransition from '../../css-transition';
import runCounter from '../../utils/run-counter';
import { isEnterDisabled, isExitDisabled } from '../utils/disabled';
const excluded = ['children', 'mode', 'when'];
export class TransitionState {
    constructor(_props) {
        Object.defineProperty(this, "_props", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: _props
        });
        Object.defineProperty(this, "current", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "elements", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "components", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        this.current = _props.children;
    }
}
export class TransitionAction {
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
            value: makeUniqueId('st-')
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
                });
                const node = createElement(CssTransition, preset, element);
                return { freeze: false, node, key: rawKey };
            }
        });
        Object.defineProperty(this, "cloneElement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ({ node, key }, props) => {
                // 拿到最新的回调函数
                const preset = omit(this._props, excluded);
                Object.assign(preset, props);
                return { freeze: true, node: cloneElement(node, preset), key };
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
                this.forceUpdate();
            }
        });
        Object.defineProperty(this, "runDefaultSwitch", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                this.setCurrent(this._props.children);
                const resolve = runCounter(2, () => {
                    this.setElements([atIndex(this.elements, -1)]);
                });
                const canNotEnter = isEnterDisabled(this.states);
                const canNotExit = isExitDisabled(this.states);
                if (canNotEnter)
                    resolve();
                if (canNotExit)
                    resolve();
                if (!(canNotEnter && canNotExit)) {
                    this.setElements([
                        this.cloneElement(atIndex(this.elements, -1), {
                            appear: true,
                            when: false,
                            onExited: batch(this._props.onExited, resolve),
                        }),
                        this.makeElement(this.states.current, {
                            appear: true,
                            onEntered: batch(this._props.onEntered, resolve),
                        }),
                    ]);
                }
            }
        });
        Object.defineProperty(this, "runInOutSwitch", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                this.setCurrent(this._props.children);
                const handleEntered = () => {
                    const handleExited = () => {
                        this.setElements([atIndex(this.elements, -1)]);
                    };
                    if (isExitDisabled(this.states)) {
                        handleExited();
                    }
                    else {
                        this.setElements([
                            this.cloneElement(atIndex(this.elements, 0), {
                                when: false,
                                onExited: batch(this._props.onExited, handleExited),
                            }),
                            atIndex(this.elements, -1),
                        ]);
                    }
                };
                const shouldImmediate = isEnterDisabled(this.states);
                this.setElements([
                    this.cloneElement(atIndex(this.elements, -1), null),
                    this.makeElement(this.states.current, {
                        appear: true,
                        onEntered: batch(this._props.onEntered, handleEntered),
                    }),
                ]);
                shouldImmediate && handleEntered();
            }
        });
        Object.defineProperty(this, "runOutInSwitch", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const handleExited = () => {
                    this.setCurrent(this._props.children);
                    this.setElements([
                        this.makeElement(this.states.current, { appear: true }),
                    ]);
                };
                if (isExitDisabled(this.states)) {
                    handleExited();
                }
                else {
                    this.setElements([
                        this.cloneElement(atIndex(this.elements, 0), {
                            appear: true,
                            when: false,
                            onExited: batch(this._props.onExited, handleExited),
                        }),
                    ]);
                }
            }
        });
        Object.defineProperty(this, "renderNodes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (child) => {
                return this.elements.map((item) => {
                    if (item.freeze || item.key !== child.key)
                        return item.node;
                    if (child !== item.node.props.children) {
                        // 尽可能同步最新的数据
                        item.node = cloneElement(item.node, undefined, child);
                    }
                    return item.node;
                });
            }
        });
        states.elements = [this.makeElement(states.current)];
    }
}
export default function useTransitionStore(props) {
    const update = useForceUpdate();
    const states = useConstant(() => new TransitionState(props));
    const actions = useMemo(() => new TransitionAction(update, states), [update, states]);
    useMemo(() => { actions.setInnerProps(props); }, [actions, props]);
    return { actions, states };
}
