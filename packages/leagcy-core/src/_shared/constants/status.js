import { jsx as _jsx } from "react/jsx-runtime";
import { CheckCircleFilled, CloseCircleFilled, ExclamationCircleFilled, InfoCircleFilled } from '@mink-ui/icons';
export const presetStatus = ['error', 'info', 'success', 'warning'];
export const presetStatusIcons = {
    success: _jsx(CheckCircleFilled, {}),
    info: _jsx(InfoCircleFilled, {}),
    error: _jsx(CloseCircleFilled, {}),
    warning: _jsx(ExclamationCircleFilled, {}),
};
export function getPresetStatusIcon(type) {
    return type ? presetStatusIcons[type] || null : null;
}
