import type { CommonStatus } from '../../_shared/types/status'
import type { UniqueKey } from '../../_shared/types/unique-key'
import type { NOTIFICATION_PLACEMENTS } from './_shared.constant'
import type { NotificationHolderSharedProps } from './notification-holder.props'
import type { NotificationItemMethodConfig, NotificationItemSharedProps } from './notification-item.props'

export type NotificationPlacement = typeof NOTIFICATION_PLACEMENTS[number]

export type NotificationVariantMethods = Record<CommonStatus, (params: NotificationMethodParams) => void>

export interface NotificationHookMethods extends NotificationVariantMethods {
  open: (params: NotificationMethodParams) => void
  close: (key?: NotificationMethodParams['key']) => void
}

export interface NotificationGlobalMethods extends NotificationHookMethods {
  config: (config: Partial<NotificationConfig>) => void
}

export interface NotificationMethodParams extends NotificationItemMethodConfig {}

export interface NotificationConfig extends NotificationHolderSharedProps, NotificationItemSharedProps {}

export interface NotificationHolderGroup {
  /**
   * @description 唯一标识
   */
  key: NotificationPlacement

  /**
   * @description 通知列表
   */
  items: Map<UniqueKey, NotificationMethodParams>
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
  closable: true,
}

export const defaultNotificationStackConfig: NotificationStackConfig = {
  offset: 8,
  threshold: 3,
}
