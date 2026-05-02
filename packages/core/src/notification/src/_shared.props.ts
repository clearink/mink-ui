import type { ReactElement } from 'react'
import type { CommonStatus } from '../../_shared/types'
import type { NOTIFICATION_PLACEMENTS } from './_shared.constant'
import type { NotificationHolderSharedConfig } from './notification-holder.props'
import type { NotificationItemMethodParams, NotificationItemSharedConfig } from './notification-item.props'

import { ownerBody } from '@mink-ui/shared/dom/global'

export type NotificationPlacement = typeof NOTIFICATION_PLACEMENTS[number]

export type NotificationVariantMethods = Record<CommonStatus, (params: NotificationMethodParams) => void>

export interface NotificationHolderGroup {
  key: NotificationPlacement
  visible: boolean
  items: NotificationMethodParams[]
}

export interface NotificationStackConfig {
  /**
   * @description 折叠间隔
   */
  gap: number

  /**
   * @description 折叠偏移量
   */
  offset: number

  /**
   * @description 折叠阈值
   */
  threshold: number
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
  stack: true,
  duration: 4500,
  placement: 'topRight',
  showProgress: false,
  pauseOnHover: true,
  getContainer: () => ownerBody(),
  closable: true,
}

export const defaultNotificationStackConfig: NotificationStackConfig = {
  gap: 16,
  offset: 8,
  threshold: 3,
}
