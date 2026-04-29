import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { isNullish, omit } from '@mink-ui/shared';
import { usePrefixCls } from '../../_shared/hooks';
import { betterDisplayName, withDefaults } from '../../_shared/utils';
import { DisabledContext } from '../../config-provider/_shared.context';
import TouchEffect from '../../touch-effect';
import { CheckboxGroupContext } from '../_shared.context';
import useCheckboxValue from './hooks/use-checkbox-value';
import useFormatClassNames from './hooks/use-format-class-names';
const excluded = [
    'autoFocus',
    'children',
    'disabled',
    'checked',
    'defaultChecked',
    'indeterminate',
    'onChange',
];
function Checkbox(_props) {
    const group = CheckboxGroupContext.useState();
    const props = withDefaults({
        ..._props,
        disabled: _props.disabled || group.disabled,
    }, {
        disabled: DisabledContext.useState(),
    });
    const { children, disabled } = props;
    const prefixCls = usePrefixCls('checkbox');
    const [checked, setChecked, controlled] = useCheckboxValue(props);
    const classNames = useFormatClassNames(prefixCls, props, { checked });
    const attrs = omit(props, excluded);
    return (_jsx(TouchEffect, { component: "Checkbox", disabled: checked || disabled || controlled, selector: `.${prefixCls}__inner`, children: _jsxs("label", { ...attrs, className: classNames.root, children: [_jsx("input", { className: classNames.input, checked: !!checked, type: "checkbox", onChange: (e) => {
                        !disabled && setChecked(e.target.checked);
                    } }), _jsx("span", { className: classNames.inner }), !isNullish(children) && _jsx("span", { className: classNames.label, children: children })] }) }));
}
betterDisplayName(Checkbox);
export default Checkbox;
