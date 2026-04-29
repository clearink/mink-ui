import { useConstant, useEvent, useExactState } from '../../../../hooks';
import aligners from '../utils/aligner';
export class TooltipRefs {
    constructor() {
        Object.defineProperty(this, "$popup", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: { current: null }
        });
        Object.defineProperty(this, "$trigger", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: { current: null }
        });
        Object.defineProperty(this, "chain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
    }
    get popup() {
        return this.$popup.current;
    }
    get trigger() {
        return this.$trigger.current;
    }
}
export default function useTooltip() {
    const refs = useConstant(() => new TooltipRefs());
    const [arrowCoords, setArrowCoords] = useExactState({
        transform: `translate3d(0, 0, 0) rotate(0)`,
    });
    const [popupCoords, setPopupCoords] = useExactState({
        transform: `translate3d(-1000vw, -1000vh, 0)`,
    });
    const updateCoords = useEvent((props) => {
        const { placement } = props;
        const { popup, trigger } = refs;
        if (!popup || !trigger)
            return;
        const getCoords = aligners[placement] || aligners.top;
        const [getArrowCoords, getPopupCoords] = getCoords(props, popup, trigger);
        setArrowCoords(getArrowCoords(arrowCoords));
        setPopupCoords(getPopupCoords(popupCoords));
    });
    return {
        refs,
        arrowCoords,
        setArrowCoords,
        popupCoords,
        setPopupCoords,
        updateCoords,
    };
}
