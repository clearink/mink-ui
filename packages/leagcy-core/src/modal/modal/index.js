import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId, useRef } from 'react';
import { fallback, isFunction, isNull, isNullish, pick } from '@mink-ui/shared';
import { FocusTrap, Overlay } from '../../_shared/components';
import { keyboard } from '../../_shared/constants';
import { useClosableState, usePrefixCls, useSemanticStyles } from '../../_shared/hooks';
import { betterDisplayName, cls, withDefaults } from '../../_shared/utils';
import Button from '../../button';
import { ConfigContext } from '../../config-provider/_shared.context';
import useFormatClassNames from './hooks/use-format-class-names';
import useWrapperVisible from './hooks/use-wrapper-visible';
import { defaultModalProps } from './props';
const included = [
    'getContainer',
    'mask',
    'isOpen',
    'transitions',
    'keepMounted',
    'unmountOnExit',
    'zIndex',
];
function Modal(_props) {
    const props = withDefaults(_props, defaultModalProps);
    const { children, footer, modalRender, onCancel, onOk, isOpen, title, transitions = {} } = props;
    const { modal: modalContext } = ConfigContext.useState();
    const [returnEarly, wrapperVisible, setWrapperVisible] = useWrapperVisible(isOpen);
    const $wrapper = useRef(null);
    const $trap = useRef(null);
    const ariaId = useId();
    const rootPrefixCls = usePrefixCls();
    const prefixCls = `${rootPrefixCls}-modal`;
    const classNames = useFormatClassNames(prefixCls, props, modalContext);
    const styles = useSemanticStyles(props, modalContext);
    const [_, mergedCloseIcon] = useClosableState(props, modalContext, {
        closeIconRender: icon => (_jsx("button", { className: classNames.closeBtn, style: styles.closeBtn, "aria-label": "close", type: "button", onClick: onCancel, children: icon })),
    });
    const onEscapeDown = !props.closeOnEscape
        ? undefined
        : (e) => {
            if (e.key !== keyboard.esc)
                return;
            e.stopPropagation();
            onCancel?.();
        };
    const onMaskClick = !props.maskClosable || !props.mask
        ? undefined
        : (e) => {
            if (e.target && e.target === $wrapper.current)
                onCancel?.();
        };
    const onTrapExit = !props.returnFocus
        ? undefined
        : (node) => {
            const el = node;
            if (el && isFunction(el.focus))
                el.focus();
        };
    if (returnEarly)
        return null;
    const contentNode = (_jsxs("div", { className: classNames.main, style: styles.main, children: [mergedCloseIcon, _jsx("div", { className: classNames.header, style: styles.header, children: !isNullish(title) && (_jsx("span", { className: `${prefixCls}__title`, id: ariaId, children: title })) }), _jsx("div", { className: classNames.body, style: styles.body, children: children }), !isNull(footer) && (_jsxs("div", { className: classNames.footer, style: styles.footer, children: [_jsx(Button, { onClick: onCancel, children: "\u53D6\u6D88" }), _jsx(Button, { variant: "filled", onClick: onOk, children: "\u786E\u5B9A" })] }))] }));
    return (_jsx(Overlay, { ...pick(props, included), classNames: { mask: `${prefixCls}-mask` }, transitions: {
            content: fallback(transitions.content, `${rootPrefixCls}-zoom-in`),
            mask: fallback(transitions.mask, `${rootPrefixCls}-fade-in`),
        }, onEnter: () => {
            console.log(wrapperVisible);
            setWrapperVisible(true);
            $trap.current?.focus();
            // el.$set('transform-origin', `${300}px ${450}px`)
        }, onEntered: () => {
            // el.$remove('transform-origin')
        }, onExit: () => {
            // el.$set('transform-origin', `${300}px ${450}px`)
        }, onExited: () => {
            setWrapperVisible(false);
            // el.$remove('transform-origin')
        }, children: (motion, transitionClass) => (_jsx("div", { ref: $wrapper, className: `${prefixCls}-wrapper`, style: { display: wrapperVisible ? undefined : 'none' }, tabIndex: -1, onClick: onMaskClick, onKeyDown: onEscapeDown, children: _jsx("div", { ref: motion, className: cls(classNames.root, transitionClass), style: styles.root, "aria-labelledby": title ? ariaId : undefined, "aria-modal": "true", role: "dialog", children: _jsx(FocusTrap, { ref: $trap, active: isOpen, onExit: onTrapExit, children: isFunction(modalRender) ? modalRender(contentNode) : contentNode }) }) })) }));
}
betterDisplayName(Modal);
export default Modal;
