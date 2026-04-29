import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId } from 'react';
import { fallback, isNullish, pick } from '@mink-ui/shared';
import { FocusTrap, Overlay } from '../../_shared/components';
import { usePrefixCls, useSemanticStyles } from '../../_shared/hooks';
import { betterDisplayName, withDefaults } from '../../_shared/utils';
import Button from '../../button';
import useFormatClassNames from './hooks/use-format-class-names';
import { defaultDrawerProps } from './props';
const included = [
    'getContainer',
    'mask',
    'isOpen',
    'transitions',
    'keepMounted',
    'unmountOnExit',
];
function Drawer(_props) {
    const props = withDefaults(_props, defaultDrawerProps);
    const { children, footer, isOpen, title, onIsOpenChange, transitions = {} } = props;
    const ariaId = useId();
    const prefix = usePrefixCls();
    const prefixCls = `${prefix}-drawer`;
    const classNames = useFormatClassNames(prefixCls, props);
    const styles = useSemanticStyles(props);
    // const onEscapeDown = !props.closeOnEscape
    //   ? undefined
    //   : (e: React.KeyboardEvent<HTMLDivElement>) => {
    //       if (e.key === Keyboard.esc) return
    //       onIsOpenChange?.(!isOpen)
    //     }
    return (_jsx(Overlay, { ...pick(props, included), classNames: {
            mask: `${prefixCls}-mask`,
        }, transitions: {
            content: fallback(transitions.content, `${prefix}-slide-bottom`),
            mask: fallback(transitions.mask, `${prefix}-fade-in`),
        }, children: _jsx("div", { className: classNames.root, style: styles.root, "aria-labelledby": title ? ariaId : undefined, "aria-modal": "true", role: "dialog", children: _jsx(FocusTrap, { active: isOpen, children: _jsxs("div", { className: classNames.main, style: styles.main, children: [_jsx("button", { className: classNames.close, style: styles.close, "aria-label": "close", type: "button", onClick: () => onIsOpenChange?.(!isOpen), children: "X" }), _jsx("div", { className: classNames.header, style: styles.header, children: !isNullish(title) && (_jsx("span", { className: `${prefixCls}__title`, id: ariaId, children: title })) }), _jsx("div", { className: classNames.body, style: styles.body, children: children }), !isNullish(footer) && (_jsxs("div", { className: classNames.footer, style: styles.footer, children: [_jsx(Button, { children: "\u53D6\u6D88" }), _jsx(Button, { variant: "filled", children: "\u786E\u5B9A" })] }))] }) }) }) }));
}
betterDisplayName(Drawer);
export default Drawer;
