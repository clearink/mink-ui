import type { CommonStatus } from '../../_shared/types/status'
import type { NOTIFICATION_PLACEMENTS } from './_shared.constant'
import type { NotificationHolderSharedConfig } from './notification-holder.props'
import type { NotificationItemMethodParams, NotificationItemSharedConfig } from './notification-item.props'

import { ownerBody } from '@mink-ui/shared/dom/global'

export type NotificationPlacement = typeof NOTIFICATION_PLACEMENTS[number]

export type NotificationVariantMethods = Record<CommonStatus, (params: NotificationMethodParams) => void>

export interface NotificationHolderGroup {
  /**
   * @description 唯一标识
   */
  key: NotificationPlacement

  /**
   * @description 通知列表
   */
  items: NotificationMethodParams[]
}

export interface NotificationStackConfig {
  /**
   * @description 折叠偏移量
   */
  offset: number

  /**
   * @description 折叠阈值
   */
  threshold: number
}

export interface NotificationItemLayout {
  shift: number
  order: number
  clip: number
}

export interface NotificationHookMethods extends NotificationVariantMethods {
  open: (params: NotificationMethodParams) => void
  close: (key?: NotificationMethodParams['key']) => void
}

export interface NotificationGlobalMethods extends NotificationHookMethods {
  config: (config: NotificationConfig) => void
}

export interface NotificationConfig extends NotificationHolderSharedConfig, NotificationItemSharedConfig {}

export interface NotificationMethodParams extends NotificationItemMethodParams {}

export interface NotificationHookConfig extends NotificationConfig {}

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                        constants                        |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export const defaultNotificationConfig: Partial<NotificationConfig> = {
  top: 24,
  bottom: 24,
  gap: 16,
  stack: true,
  duration: 4500,
  placement: 'topRight',
  showProgress: false,
  pauseOnHover: true,
  getContainer: () => ownerBody(),
  closable: true,
}

export const defaultNotificationStackConfig: NotificationStackConfig = {
  offset: 8,
  threshold: 3,
}
