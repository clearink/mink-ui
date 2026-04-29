import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { forwardRef, useImperativeHandle } from 'react';
import { useWatchValue } from '../../../hooks';
import { betterDisplayName } from '../../../utils';
import { isNodesEqual } from '../utils/node-equal';
import useTransitionStore from './hooks/use-transition-store';
function GroupTransition(props, ref) {
    const { children } = props;
    const { actions, states } = useTransitionStore(props);
    useImperativeHandle(ref, () => ({
        get components() { return states.components; },
    }), [states]);
    const returnEarly = useWatchValue(children, () => {
        if (isNodesEqual(states.current, children))
            return;
        actions.updateElements();
    });
    return returnEarly ? null : _jsx(_Fragment, { children: actions.renderNodes(children) });
}
betterDisplayName(GroupTransition);
export default forwardRef(GroupTransition);
