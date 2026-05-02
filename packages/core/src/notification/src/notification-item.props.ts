import type { CSSProperties, ReactElement, ReactNode, Ref } from 'react'
import type { VoidFn } from '@mink-ui/shared/interface'
import type { CommonStatus, HasClosable, SemanticsStyled } from '../../_shared/types'
import type { GetSemanticsValues } from '../../_shared/types/styled'
import type { NotificationPlacement } from './_shared.props'
import type { NotificationListProps } from './notification-list.props'

import { exhaustive } from '../../_shared/utils/exhaustive'
import { defaultNotificationConfig } from './_shared.props'

export interface NotificationItemSharedConfig extends HasClosable {
  /**
   * @description 通知位置
   */
  placement?: NotificationPlacement

  /**
   * @description 持续时间
   * @default 4500ms
   */
  duration?: number

  /**
   * @description 是否展示进度条
   */
  showProgress?: boolean

  /**
   * @description 悬停时暂停进度条计时
   */
  pauseOnHover?: boolean
}

export interface NotificationItemMethodParams extends
  NotificationItemSharedConfig,
  Omit<SemanticsStyled<'root' | 'statusIcon' | 'closeBtn' | 'content' | 'title' | 'description' | 'progress'>, 'prefixCls'> {
  /**
   * @description 唯一表示
   */
  key?: ReactElement['key']

  /**
   * @description 提示的类型
   * @default info
   */
  type?: CommonStatus

  /**
   * @description 通知内容
   */
  title?: ReactNode

  /**
   * @description 提醒介绍
   */
  description?: ReactNode

  /**
   * @description 操作区域
   */
  action?: ReactNode

  /**
   * @description 自定义图标
   */
  icon?: ReactNode

  /**
   * @description 底部内部
   */
  footer?: ReactNode

  /**
   * @description a11y 适配
   */
  role?: 'alert' | 'status'

  /**
   * @description 关闭按钮点击事件
   */
  onClose?: VoidFn
}

export interface NotificationItemInjectedProps {
  /**
   * @description 外部引用
   */
  ref: Ref<HTMLDivElement>

  /**
   * @description 配置项
   */
  config: NotificationItemMethodParams & NotificationItemSharedConfig

  /**
   * @description
   */
  isExpanded: boolean

  /**
   * @description list 是否激活
   */
  rootHovering: boolean

  /**
   * @description 根节点命名空间
   */
  rootNamespace: string

  /**
   * @description 根节点样式名称
   */
  rootCssNames: Omit<GetSemanticsValues<NotificationListProps, string>, 'item'>

  /**
   * @description 根节点样式属性
   */
  rootCssAttrs: Omit<GetSemanticsValues<NotificationListProps, CSSProperties>, 'item'>

  /**
   * @description 点击关闭按钮的回调
   */
  onDismiss: (key: ReactElement['key']) => void
}

export interface NotificationItemProps extends NotificationItemInjectedProps {}

export type DefaultNames = 'placement' | 'duration' | 'showProgress' | 'pauseOnHover' | 'closable'

export type PickedNotificationItemConfig = Pick<NotificationItemProps['config'], DefaultNames>

export type OmittedNotificationItemConfig = Omit<NotificationItemProps['config'], DefaultNames>

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                        constants                        |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export const defaultNotificationItemConfig: PickedNotificationItemConfig = {
  placement: defaultNotificationConfig.placement,
  duration: defaultNotificationConfig.duration,
  showProgress: defaultNotificationConfig.showProgress,
  pauseOnHover: defaultNotificationConfig.pauseOnHover,
  closable: defaultNotificationConfig.closable,
}

export const sharedNotificationItmeProps = exhaustive<DefaultNames | keyof NotificationItemSharedConfig>()([
  // props
  'placement',
  'duration',
  'showProgress',
  'pauseOnHover',
  'closable',
  'closeIcon',
])
