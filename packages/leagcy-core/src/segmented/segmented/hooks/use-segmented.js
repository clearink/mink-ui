import { getClientCoords, reflow } from '@mink-ui/shared';
import { useConstant, useExactState, useWatchValue } from '../../../_shared/hooks';
class SegmentedRefs {
    constructor() {
        Object.defineProperty(this, "$group", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: { current: null }
        });
        Object.defineProperty(this, "$thumb", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: { current: null }
        });
        Object.defineProperty(this, "items", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "inTransition", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "reset", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                this.inTransition = false;
            }
        });
    }
    get group() {
        return this.$group.current;
    }
    get thumb() {
        return this.$thumb.current;
    }
}
export default function useSegmented(active) {
    const refs = useConstant(() => new SegmentedRefs());
    const [history, setHistory] = useExactState([null, active]);
    const [showThumb, setShowThumb] = useExactState(false);
    const updateThumbStyles = (el, itemCoords) => {
        const groupCoords = getClientCoords(refs.group);
        const delta = itemCoords.left - groupCoords.left;
        el.style.setProperty('transform', `translate3d(${delta}px, 0, 0)`);
        el.style.setProperty('width', `${itemCoords.width}px`);
    };
    const keepThumbStyles = () => {
        if (!refs.thumb || !refs.inTransition)
            return;
        const target = refs.items.get(active);
        if (!target || !refs.group)
            return;
        updateThumbStyles(refs.thumb, getClientCoords(target));
    };
    const handleEnter = (el) => {
        const from = refs.items.get(history[0]);
        if (!from || !refs.group)
            return;
        refs.inTransition = true;
        el.style.setProperty('transition-duration', '0s', 'important');
        updateThumbStyles(el, getClientCoords(from));
        reflow(el);
        el.style.removeProperty('transition-duration');
    };
    const handleEntering = (el) => {
        const target = refs.items.get(history[1]);
        if (!target || !refs.group)
            return;
        updateThumbStyles(el, getClientCoords(target));
    };
    const handleEntered = (el) => {
        refs.inTransition = false;
        el.style.removeProperty('transform');
        el.style.removeProperty('width');
        setShowThumb(false);
    };
    const returnEarly = useWatchValue(active, () => {
        setHistory([history[1], active]);
        setShowThumb(true);
        keepThumbStyles();
    });
    return {
        returnEarly,
        refs,
        showThumb,
        handleEnter,
        handleEntering,
        handleEntered,
    };
}
