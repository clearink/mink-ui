import type { CSSProperties, ReactNode, Ref } from 'react'
import type { VoidFn } from '@mink-ui/shared/interface'
import type { CssTransitionGetters } from '../../_shared/components/transition/src'
import type { HasClosable } from '../../_shared/types/closable'
import type { CommonStatus } from '../../_shared/types/status'
import type { GetSemanticsValues, SemanticsStyled } from '../../_shared/types/styled'
import type { UniqueKey } from '../../_shared/types/unique-key'
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
  key?: UniqueKey

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
  config: NotificationItemMethodParams

  /**
   * @description 动画配置
   */
  getters: CssTransitionGetters

  /**
   * @description list 是否激活
   */
  listHovering: boolean

  /**
   * @description 外部命名空间
   */
  outerNamespace: string

  /**
   * @description 外部样式类名
   */
  outerCssNames: Omit<GetSemanticsValues<NotificationListProps, string>, 'item'>

  /**
   * @description 外部样式属性
   */
  outerCssAttrs: Omit<GetSemanticsValues<NotificationListProps, CSSProperties>, 'item'>

  /**
   * @description 外部样式变量
   */
  outerCssVars: Record<string, string> | undefined

  /**
   * @description 关闭通知回调
   */
  onDismiss: (key: UniqueKey) => void

  /**
   * @description 收集 DOM 元素
   */
  onCollect: (el: HTMLElement | null, item: NotificationItemMethodParams) => void
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
