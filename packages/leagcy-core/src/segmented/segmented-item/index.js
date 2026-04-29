import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { usePrefixCls, useSemanticStyles } from '../../_shared/hooks';
import { betterDisplayName } from '../../_shared/utils';
import useFormatClassNames from './hooks/use-format-class-names';
function SegmentedItem(props, _ref) {
    const { checked, disabled, label, onChange, title, value } = props;
    const prefixCls = usePrefixCls('segmented-item');
    const classNames = useFormatClassNames(prefixCls, props);
    const styles = useSemanticStyles(props);
    return (_jsxs("label", { ref: _ref, className: classNames.root, style: styles.root, children: [_jsx("input", { className: classNames.radio, checked: checked, disabled: disabled, type: "radio", onChange: () => {
                    !disabled && onChange(value);
                } }), _jsx("div", { className: classNames.label, style: styles.label, title: title, children: label })] }));
}
betterDisplayName(SegmentedItem, 'Segmented.Item');
export default forwardRef(SegmentedItem);
