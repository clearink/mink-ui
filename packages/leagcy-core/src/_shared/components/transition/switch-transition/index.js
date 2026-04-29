import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useWatchValue } from '../../../hooks';
import { betterDisplayName } from '../../../utils';
import { isNodeEqual } from '../utils/node-equal';
import useTransitionStore from './hooks/use-transition-store';
function SwitchTransition(props) {
    const { children, mode } = props;
    const { actions, states } = useTransitionStore(props);
    const returnEarly = useWatchValue(children, () => {
        if (isNodeEqual(states.current, children))
            return;
        if (mode === 'out-in')
            actions.runOutInSwitch();
        else if (mode === 'in-out')
            actions.runInOutSwitch();
        else
            actions.runDefaultSwitch();
    });
    return returnEarly ? null : _jsx(_Fragment, { children: actions.renderNodes(children) });
}
betterDisplayName(SwitchTransition);
export default SwitchTransition;
