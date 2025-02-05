import CheckCircleFilled from '@mink-ui/icons/lib/icons/CheckCircleFilled'
import CloseCircleFilled from '@mink-ui/icons/lib/icons/CloseCircleFilled'
import ExclamationCircleFilled from '@mink-ui/icons/lib/icons/ExclamationCircleFilled'
import InfoCircleFilled from '@mink-ui/icons/lib/icons/InfoCircleFilled'

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
