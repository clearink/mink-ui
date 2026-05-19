import type { SemanticsStyled } from '../../_shared/types/styled'
import type { NotificationMethodParams, NotificationPlacement, NotificationStackConfig } from './_shared.props'
import type { NotificationItemInjectedProps } from './notification-item.props'

import { defaultNotificationConfig } from './_shared.props'

export interface NotificationListForwardedProps extends
  SemanticsStyled<'root' | 'item' | 'statusIcon' | 'closeBtn' | 'content' | 'title' | 'description' | 'progress', NotificationListProps> {
  /**
   * @description 距离窗口顶部距离
   */
  top?: number

  /**
   * @description 距离窗口底部距离
   */
  bottom?: number

  /**
   * @description 通知项间隔
   */
  gap?: number

  /**
   * @description 是否堆叠
   */
  stack?: boolean | Partial<NotificationStackConfig>

  /**
   * @description 最大显示数量
   */
  maxCount?: number
}

export interface NotificationListInjectedProps extends Pick<NotificationItemInjectedProps, 'onDismiss'> {
  /**
   * @description 通知列表
   */
  items: NotificationMethodParams[]

  /**
   * @description 弹出层位置
   */
  placement: NotificationPlacement

  /**
   * @description 通知完全关闭时的回调
   */
  onGroupExited: (placement: NotificationPlacement) => void
}

export interface NotificationListProps extends NotificationListForwardedProps, NotificationListInjectedProps {}

export type DefaultNames = 'top' | 'bottom' | 'gap' | 'stack' | 'maxCount' | 'placement'

export type PickedNotificationListProps = Pick<NotificationListProps, DefaultNames>

export type OmittedNotificationListProps = Omit<NotificationListProps, DefaultNames>

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                        constants                        |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export const defaultNotificationListProps: PickedNotificationListProps = {
  top: defaultNotificationConfig.top,
  bottom: defaultNotificationConfig.bottom,
  gap: defaultNotificationConfig.gap,
  stack: defaultNotificationConfig.stack,
  maxCount: defaultNotificationConfig.maxCount,
  placement: defaultNotificationConfig.placement!,
}
