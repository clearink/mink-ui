import type { CommonStatus } from '../../../_shared/types'

import CheckCircleFilled from '@mink-ui/icons/CheckCircleFilled'
import CloseCircleFilled from '@mink-ui/icons/CloseCircleFilled'
import ExclamationCircleFilled from '@mink-ui/icons/ExclamationCircleFilled'
import InfoCircleFilled from '@mink-ui/icons/InfoCircleFilled'
import { hasOwn } from '@mink-ui/shared/object/has-own'

import { STATUS_ENUM } from '../_shared.constant'

/**
 * @description 是否为预设的 status
 */
export function isBuiltinStatus(value: any): value is CommonStatus {
  return hasOwn(STATUS_ENUM, value)
}

/**
 * @description 匹配预设 status 图标
 */
export function mapStatusIcon(status: any) {
  switch (status) {
    case STATUS_ENUM.info: return <InfoCircleFilled />

    case STATUS_ENUM.warning: return <ExclamationCircleFilled />

    case STATUS_ENUM.success: return <CheckCircleFilled />

    case STATUS_ENUM.error: return <CloseCircleFilled />

    default: return null
  }
}
