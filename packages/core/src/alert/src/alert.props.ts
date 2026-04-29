import type { HTMLAttributes, ReactNode, Ref } from 'react'
import type { CommonStatus, HasClosable, SemanticsStyled } from '../../_shared/types'

export interface AlertProps extends
  HasClosable,
  HTMLAttributes<HTMLDivElement>,
  SemanticsStyled<'root' | 'icon' | 'action' | 'closeBtn' | 'content' | 'description' | 'message'> {
  /**
   * @description 外部引用
   */
  ref?: Ref<{ nativeElement: HTMLDivElement | null }>

  /**
   * @description 提示的类型(banner 模式下默认值为 warning)
   * @default info
   */
  type?: CommonStatus

  /**
   * @description 警告提示内容
   */
  message?: ReactNode

  /**
   * @description 警告提示的辅助性文字介绍
   */
  description?: ReactNode

  /**
   * @description 操作节点
   */
  action?: ReactNode

  /**
   * @description 用作顶部公告
   */
  banner?: boolean

  /**
   * @description 自定义图标，showIcon 为 true 时有效
   */
  icon?: ReactNode

  /**
   * @description 是否显示辅助图标(banner 模式下强制为true)
   */
  showIcon?: boolean

  /**
   * @description 关闭按钮点击事件
   */
  onClose?: () => void

  /**
   * @description 关闭动画结束后触发
   */
  onClosed?: () => void
}

export type DefaultNames = 'showIcon' | 'type'

export type PickedAlertProps = Pick<AlertProps, DefaultNames>

export type OmittedAlertProps = Omit<AlertProps, DefaultNames>

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                        constants                        |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export const defaultAlertProps: PickedAlertProps = {
  showIcon: false,
  type: 'info',
}

export const excludedAlertProps = [
  // extends
  'prefixCls',
  'className',
  'classNames',
  'style',
  'styles',
  'closeIcon',
  'closable',
  // props
  'ref',
  'type',
  'message',
  'description',
  'action',
  'banner',
  'icon',
  'showIcon',
] as const
