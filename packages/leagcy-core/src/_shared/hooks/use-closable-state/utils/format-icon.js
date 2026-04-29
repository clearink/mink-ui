import { jsx as _jsx } from "react/jsx-runtime";
import { cloneElement, isValidElement } from 'react';
import { omit } from '@mink-ui/shared';
export default function formatIcon(closableConfig, defaultConfig) {
    const { closeIcon } = closableConfig;
    const { closeIconRender } = defaultConfig;
    const ariaAttrs = omit(closableConfig, ['closable', 'closeIcon', 'closeIconRender']);
    const icon = closeIconRender ? closeIconRender(closeIcon) : closeIcon;
    return isValidElement(icon) ? cloneElement(icon, ariaAttrs) : _jsx("span", { ...ariaAttrs, children: icon });
}
