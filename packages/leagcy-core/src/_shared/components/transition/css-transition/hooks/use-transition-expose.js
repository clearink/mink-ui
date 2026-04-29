import { useImperativeHandle } from 'react';
import { isEntered, isEntering, isExited, isExiting } from '../../_shared.constant';
export default function useTransitionExpose(ref, refs) {
    useImperativeHandle(ref, () => ({
        get element() { return refs.instance; },
        get status() { return refs.status; },
        get isEntering() { return isEntering(refs.status); },
        get isEntered() { return isEntered(refs.status); },
        get isExiting() { return isExiting(refs.status); },
        get isExited() { return isExited(refs.status); },
    }), [refs]);
}
