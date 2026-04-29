import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { useSemanticStyles, useZIndex } from '../../../hooks';
import { betterDisplayName, cls, withDefaults } from '../../../utils';
import Portal from '../../portal';
import { CssTransition } from '../../transition';
import useOverlay from './hooks/use-overlay';
import { defaultOverlayProps } from './props';
function Overlay(_props, ref) {
    const props = withDefaults(_props, defaultOverlayProps);
    const { isOpen, keepMounted, getContainer, unmountOnExit, className, children, mask, zIndex, onEnter, onEntering, onEntered, onExit, onExiting, onExited, classNames = {}, transitions = {}, } = props;
    const styles = useSemanticStyles(props);
    const { returnEarly: returnEarly1, $content, isMounted, setIsMounted, } = useOverlay(props);
    const [returnEarly2, zLevel] = useZIndex(isMounted && !!isOpen, zIndex);
    // TODO: lock scroll
    if (returnEarly1 || returnEarly2 || !isMounted)
        return null;
    return (_jsx(Portal, { ref: ref, getContainer: getContainer, children: _jsxs("div", { className: cls(className, classNames.root), style: withDefaults(styles.root || {}, { position: 'absolute', zIndex: zLevel }), children: [!!mask && (_jsx(CssTransition, { classNames: transitions.mask, appear: true, when: isOpen, children: _jsx("div", { className: classNames.mask, style: styles.mask, "aria-hidden": "true" }) })), _jsx(CssTransition, { ref: $content, classNames: transitions.content, appear: true, when: isOpen, onEnter: (el, appearing) => {
                        onEnter?.(el, appearing);
                        setIsMounted(true);
                    }, onEntered: onEntered, onEntering: onEntering, onExit: onExit, onExited: (el) => {
                        onExited?.(el);
                        setIsMounted(!(unmountOnExit && !keepMounted));
                    }, onExiting: onExiting, children: children })] }) }));
}
betterDisplayName(Overlay);
export default forwardRef(Overlay);
