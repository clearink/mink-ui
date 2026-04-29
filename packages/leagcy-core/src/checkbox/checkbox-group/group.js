import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { omit } from '@mink-ui/shared';
import { usePrefixCls } from '../../_shared/hooks';
import useFormatClassNames from './hooks/use-format-class-names';
const excluded = ['children'];
function CheckboxGroup(props) {
    const { children } = props;
    const prefixCls = usePrefixCls('checkbox-group');
    const classNames = useFormatClassNames(prefixCls, props);
    const attrs = omit(props, excluded);
    return (_jsxs("div", { ...attrs, className: classNames.root, children: [_jsx("input", { type: "checkbox" }), _jsx("span", { children: children })] }));
}
export default CheckboxGroup;
