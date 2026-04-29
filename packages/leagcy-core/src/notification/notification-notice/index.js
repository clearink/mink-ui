import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useEffect, useMemo } from 'react';
import { isNullish } from '@mink-ui/shared';
import { getPresetStatusIcon } from '../../_shared/constants';
import { useClosableState, useDebounceTimeout, usePrefixCls, useSemanticStyles } from '../../_shared/hooks';
import { betterDisplayName, cls, withDefaults, withFallbackCloneElement } from '../../_shared/utils';
import useFormatClassNames from './hooks/use-format-class-names';
import { defaultNotificationNoticeProps } from './props';
function NotificationNotice(_props, _ref) {
    const props = withDefaults(_props, defaultNotificationNoticeProps);
    const { message, description, duration, type, showProgress, onClick, onClose } = props;
    const prefixCls = usePrefixCls('notification-notice');
    const classNames = useFormatClassNames(prefixCls, props);
    const styles = useSemanticStyles(props);
    // 需要手动控制,所以这里不能直接使用
    const handler = useDebounceTimeout(duration, onClose);
    useEffect(handler, [handler]);
    const handleClose = (e) => {
        e.stopPropagation();
        e.preventDefault();
        onClose();
    };
    const mergedStatusIcon = useMemo(async () => {
        const statusIcon = getPresetStatusIcon(type);
        return withFallbackCloneElement(statusIcon, {
            fallback: _jsx("span", { className: classNames.icon, children: statusIcon }),
            props: _original => ({
                className: cls(_original.className, classNames.icon),
                style: { ..._original.style, ...styles.icon },
            }),
        });
    }, [classNames.icon, styles.icon, type]);
    const [_, mergedCloseIcon] = useClosableState(props, undefined, {
        closeIconRender: icon => (_jsx("button", { className: classNames.closeBtn, style: styles.closeBtn, tabIndex: 0, type: "button", onClick: handleClose, children: icon })),
    });
    return (_jsxs("div", { ref: _ref, className: classNames.root, style: styles.root, onClick: onClick, children: [mergedStatusIcon, _jsxs("div", { className: classNames.content, children: [_jsx("div", { className: classNames.message, children: message }), !isNullish(description) && _jsx("div", { className: classNames.description, children: description })] }), mergedCloseIcon, !!showProgress && _jsx("progress", { className: classNames.progress, style: styles.progress })] }));
}
betterDisplayName(NotificationNotice, 'Notification.Notice');
export default forwardRef(NotificationNotice);
