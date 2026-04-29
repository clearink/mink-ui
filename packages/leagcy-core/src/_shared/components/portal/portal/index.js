import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';
import { isNullish, ownerBody } from '@mink-ui/shared';
import { useExactState } from '../../../hooks';
import { betterDisplayName, getTargetElement } from '../../../utils';
function Portal(props, ref) {
    const { children, getContainer: _container } = props;
    const [container, set] = useExactState(() => getTargetElement(_container, ownerBody()));
    useImperativeHandle(ref, () => container, [container]);
    useEffect(() => { set(getTargetElement(_container, ownerBody())); }, [_container, set]);
    if (isNullish(container))
        return null;
    if (container === false)
        return _jsx(_Fragment, { children: children });
    return createPortal(children, container);
}
betterDisplayName(Portal);
export default forwardRef(Portal);
