import { useEffect } from 'react';
import { flushSync } from 'react-dom';
import { addClassNames, batch, delClassNames, fallback, getElementStyle, isUndefined, makeEventListener, makeTimeout, nextFrame, nextTick, } from '@mink-ui/shared';
import { useConstant, useEvent, useExactState, useWatchValue } from '../../../../hooks';
import { APPEAR, ENTER, ENTERED, ENTERING, EXIT, EXITED, EXITING, isAppear, isEntered, isExit, isExited, isRunning, } from '../../_shared.constant';
import runCounter from '../../utils/run-counter';
import collectTimeoutInfo from '../utils/collect';
import useFormatClassNames from './use-format-class-names';
import useFormatTimeouts from './use-format-timeouts';
export class CssTransitionRefs {
    constructor(props) {
        Object.defineProperty(this, "finishCleanup", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
        });
        Object.defineProperty(this, "isInitial", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "hasMounted", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "instance", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "status", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_status", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "reset", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                this.isInitial = true;
                this.status = this._status;
                this.finishCleanup?.();
                this.finishCleanup = undefined;
            }
        });
        const { appear, when } = props;
        this.status = !when || appear ? EXITED : ENTERED;
        this._status = this.status;
    }
}
export default function useCssTransition(props) {
    const { when, type, mountOnEnter, unmountOnExit, onEnter, onEntering, onEntered, onEnterCancel, onExit, onExiting, onExited, onExitCancel, } = props;
    const classNames = useFormatClassNames(props);
    const timeouts = useFormatTimeouts(props);
    const refs = useConstant(() => new CssTransitionRefs(props));
    const [isMounted, setIsMounted] = useExactState(() => {
        return when || !(unmountOnExit || mountOnEnter);
    });
    const [transitionClass, setTransitionClass] = useExactState(() => {
        return [classNames[isExited(refs.status) ? EXIT : ENTER].done];
    });
    const runFinishCleanup = () => {
        refs.finishCleanup?.();
        refs.finishCleanup = undefined;
    };
    const startTransition = (step) => {
        refs.status = isExit(step) ? EXITING : ENTERING;
    };
    const cancelTransition = (step) => {
        refs.status = isExit(step) ? EXITED : ENTERED;
    };
    const finishTransition = (step, unmountOnExit) => {
        refs.status = isExit(step) ? EXITED : ENTERED;
        runFinishCleanup();
        setIsMounted(!(unmountOnExit && isExit(step)));
    };
    const shouldTransition = useEvent((isInitial) => {
        const { status } = refs;
        if (isInitial && when && isExited(status))
            return APPEAR;
        if (!isInitial && when && isExited(status))
            return ENTER;
        if (!isInitial && !when && isEntered(status))
            return EXIT;
    });
    const runCssFinish = (el, step) => {
        finishTransition(step, unmountOnExit);
        const { from, active, to, done } = classNames[step];
        delClassNames(el, from, active, to);
        addClassNames(el, done);
        setTransitionClass([done]);
        // 回调函数在收尾工作结束调用
        isExit(step) ? onExited?.(el) : onEntered?.(el, isAppear(step));
    };
    const runCssCancel = (el, step) => {
        runFinishCleanup();
        if (!isRunning(refs.status))
            return;
        // 回调函数在收尾工作之前调用
        isExit(step) ? onExitCancel?.(el) : onEnterCancel?.(el, isAppear(step));
        cancelTransition(step);
    };
    const runCssListener = (el, step) => {
        const resolve = () => { runCssFinish(el, step); };
        const handler = (e) => { e.target === el && runCssFinish(el, step); };
        const collection = getElementStyle(el);
        const transition = collectTimeoutInfo(collection, 'transition');
        const animation = collectTimeoutInfo(collection, 'animation');
        const timeout = timeouts[step];
        if (transition.timeout <= 0 && animation.timeout <= 0) {
            return makeTimeout(fallback(timeout, 0), resolve);
        }
        if (type === 'transition' && transition.timeout > 0) {
            return batch(makeEventListener(el, 'transitionend', runCounter(transition.count, handler)), makeTimeout(fallback(timeout, transition.timeout) + 1, resolve));
        }
        if (type === 'animation' && animation.timeout > 0) {
            return batch(makeEventListener(el, 'animationend', runCounter(animation.count, handler)), makeTimeout(fallback(timeout, animation.timeout) + 1, resolve));
        }
        if (transition.timeout > animation.timeout) {
            return batch(makeEventListener(el, 'transitionend', runCounter(transition.count, handler)), makeTimeout(fallback(timeout, transition.timeout) + 1, resolve));
        }
        return batch(makeEventListener(el, 'animationend', runCounter(animation.count, handler)), makeTimeout(fallback(timeout, animation.timeout) + 1, resolve));
    };
    const runCssTransition = useEvent((el, step) => {
        const { active, from, to } = classNames[step];
        const runTickCleanup = nextTick(() => {
            startTransition(step);
            delClassNames(el, ...transitionClass);
            addClassNames(el, from);
            isExit(step) ? onExit?.(el) : onEnter?.(el, isAppear(step));
            addClassNames(el, active);
            flushSync(() => { setTransitionClass([from, active]); });
            return nextFrame(() => {
                delClassNames(el, from);
                addClassNames(el, to);
                isExit(step) ? onExiting?.(el) : onEntering?.(el, isAppear(step));
                setTransitionClass([active, to]);
                refs.finishCleanup = runCssListener(el, step);
            });
        });
        return () => {
            runTickCleanup();
            runCssCancel(el, step);
        };
    });
    useEffect(() => {
        const { instance, isInitial } = refs;
        if (isInitial)
            refs.isInitial = false;
        const step = shouldTransition(isInitial);
        if (isUndefined(step) || !instance)
            return;
        return runCssTransition(instance, step);
    }, [when, refs, shouldTransition, runCssTransition]);
    // 监听 unmountOnExit 与 mountOnEnter
    const returnEarly1 = useWatchValue(`${unmountOnExit}-${mountOnEnter}`, () => {
        if (!isExited(refs.status))
            return;
        const isMounted = !(unmountOnExit || (mountOnEnter && !refs.hasMounted));
        setIsMounted(isMounted);
    });
    // when 变化时需要保证页面处于渲染中,
    const returnEarly2 = useWatchValue(when, () => { setIsMounted(true); });
    return {
        returnEarly: returnEarly1 || returnEarly2,
        refs,
        isMounted,
        transitionClass,
    };
}
