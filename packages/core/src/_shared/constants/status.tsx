import { CheckCircleFilled, CloseCircleFilled, ExclamationCircleFilled, InfoCircleFilled } from '@mink-ui/icons'

import type { StatusType } from '../types'

export const presetStatus: StatusType[] = ['error', 'info', 'success', 'warning']

export const presetStatusIcons: Record<StatusType, JSX.Element> = {
  success: <CheckCircleFilled />,
  info: <InfoCircleFilled />,
  error: <CloseCircleFilled />,
  warning: <ExclamationCircleFilled />,
}

export function getPresetStatusIcon(type?: StatusType) {
  return type ? presetStatusIcons[type] || null : null
}
