import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { usePrefixCls, useSemanticStyles } from '../../_shared/hooks';
import { betterDisplayName } from '../../_shared/utils';
import Tooltip from '../../tooltip';
import useFormatClassNames from './hooks/use-format-class-names';
function Popover(props) {
    const prefix = usePrefixCls();
    const prefixCls = `${prefix}-tooltip`;
    const classNames = useFormatClassNames(prefixCls, props);
    const styles = useSemanticStyles(props);
    return (_jsx(Tooltip, { ...props, classNames: classNames, styles: styles, content: (_jsxs(_Fragment, { children: [_jsx("div", { className: classNames.title, children: "title" }), _jsx("div", { className: classNames.content, children: "content" })] })) }));
}
betterDisplayName(Popover);
export default Popover;
