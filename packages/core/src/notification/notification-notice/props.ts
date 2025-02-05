import type { HasClosable, NotificationPlacement, SemanticStyledProps, StatusType } from '@mink-ui/core/_shared/types'
import type { VoidFn } from '@mink-ui/shared'
import type { DOMAttributes, MouseEventHandler, ReactElement, ReactNode } from 'react'

// 调用 notification 函数时的参数
export interface NotificationProps extends HasClosable, DOMAttributes<HTMLDivElement>,
  SemanticStyledProps<'closeBtn' | 'content' | 'description' | 'icon' | 'message' | 'progress' | 'root'> {
  /**
   * @zh-CN 底部内容
   */
  footer?: ReactNode

  /**
   * @zh-CN 通知提醒内容
   * @required
   */
  description?: ReactNode

  /**
   * @zh-CN 默认4500毫秒后自动关闭, 配置为 null 则不会关闭
   * @default 4500
   */
  duration?: number

  /**
   * @zh-CN 自定义图标
   */
  icon?: ReactNode

  /**
   * @zh-CN 当前通知唯一标识
   */
  key?: ReactElement['key']

  /**
   * @zh-CN 通知提醒标题
   * @required
   */
  message: ReactNode

  /**
   * @zh-CN 点击通知时触发的函数
   */
  onClick?: MouseEventHandler<HTMLDivElement>

  /**
   * @zh-CN 通知关闭时触发
   */
  onClose?: () => void

  /**
   * @zh-CN 是否展示进度条
   * @default false
   */
  showProgress?: boolean

  /**
   * @zh-CN 悬停时暂停计时
   * @default true
   */
  pauseOnHover?: boolean

  /**
   * @zh-CN 主题状态
   * @enum
   */
  type?: StatusType

  /**
   * @zh-CN 弹出位置
   * @enum
   * @default topRight
   */
  placement?: NotificationPlacement

  /**
   * @zh-CN 供屏幕阅读器识别的通知内容语义，默认为 alert。此情况下屏幕阅读器会立即打断当前正在阅读的其他内容，转而阅读通知内容
   * @enum
   * @default alert
   */
  role?: 'alert' | 'status'

}

export interface NotificationNoticeProps extends NotificationProps {
  onClose: VoidFn
}

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                      default props                      |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export const defaultNotificationNoticeProps: Partial<NotificationNoticeProps> = {
  duration: 4500,
  placement: 'topRight',
  showProgress: false,
  pauseOnHover: true,
  closable: true,
}
