import { jsx as _jsx } from "react/jsx-runtime";
import { betterDisplayName } from '../../../utils';
function TooltipArrow(props) {
    const { className, show, style } = props;
    return show ? _jsx("div", { className: className, style: style }) : null;
}
betterDisplayName(TooltipArrow, 'InternalTooltip.Arrow');
export default TooltipArrow;
