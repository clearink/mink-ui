import type { PortalProps } from '../../_shared/components/portal/src'
import type { NotificationHolderGroup } from './_shared.props'
import type { NotificationListForwardedProps, NotificationListProps } from './notification-list.props'

import { exhaustive } from '../../_shared/utils/exhaustive'

export interface NotificationHolderSharedProps extends NotificationListForwardedProps {
  /**
   * @description 自定义 portal 容器，为 false 表示不使用 portal
   */
  getContainer?: PortalProps['getContainer']
}

export interface NotificationHolderInjectedProps extends Pick<NotificationListProps, 'onDismiss' | 'onGroupExited'> {
  /**
   * @description 分组数据
   */
  groups: NotificationHolderGroup[]
}

export interface NotificationHolderProps extends NotificationHolderInjectedProps, NotificationHolderSharedProps {}

export type DefaultNames = 'getContainer'

export type PickedNotificationHolderProps = Pick<NotificationHolderProps, DefaultNames>

export type OmittedNotificationHolderProps = Omit<NotificationHolderProps, DefaultNames>

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                        constants                        |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export const sharedNotificationHolderProps = exhaustive<DefaultNames | keyof NotificationHolderSharedProps>()([
  // extends
  'prefixCls',
  'className',
  'classNames',
  'style',
  'styles',
  // props
  'top',
  'bottom',
  'gap',
  'stack',
  'maxCount',
  'getContainer',
])

export const excludedNotificationHolderProps = exhaustive<DefaultNames | keyof NotificationHolderInjectedProps>()([
  'getContainer',
  'groups',
  'onDismiss',
  'onGroupExited',
])
