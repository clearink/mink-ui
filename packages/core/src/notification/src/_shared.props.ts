import type { GetSemanticsConfig } from '../../_shared/types/has-semantics'
import type { CommonStatus } from '../../_shared/types/status'
import type { UniqueKey } from '../../_shared/types/unique-key'
import type { NOTIFICATION_PLACEMENTS } from './_shared.constant'
import type { NotificationHolderSharedConfig } from './notification-holder.props'
import type { NotificationItemSharedConfig, NotificationItemSharedParams } from './notification-item.props'

export type NotificationSemanticNames = 'root' | 'item' | 'statusIcon' | 'closeBtn' | 'content' | 'title' | 'description' | 'progress'

export type NotificationPlacement = typeof NOTIFICATION_PLACEMENTS[number]

export type NotificationVariantMethods = Record<CommonStatus, (params: NotificationMethodParams) => void>

export interface NotificationHookMethods extends NotificationVariantMethods {
  open: (params: NotificationMethodParams) => void
  close: (key?: NotificationMethodParams['key']) => void
}

export interface NotificationGlobalMethods extends NotificationHookMethods {
  config: (config: Partial<NotificationConfig>) => void
}

export interface NotificationMethodParams extends NotificationItemSharedParams {}

export interface NotificationHolderGroup {
  /**
   * @description 唯一标识
   */
  key: NotificationPlacement

  /**
   * @description 通知列表
   */
  items: Map<UniqueKey, NotificationItemSharedParams>
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
 * |                     global definition                   |
 * |---------------------------------------------------------|
 */

export interface NotificationConfig extends NotificationHolderSharedConfig, NotificationItemSharedConfig {}
export interface NotificationGlobalConfig extends GetSemanticsConfig<NotificationConfig>,
  Pick<NotificationConfig, 'closable' | 'getContainer'> {}

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
