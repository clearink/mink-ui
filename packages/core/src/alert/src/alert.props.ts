import type { HTMLAttributes, ReactNode, Ref } from 'react'
import type { VoidFn } from '@mink-ui/shared/interface'
import type { HasClosable } from '../../_shared/types/closable'
import type { CommonStatus } from '../../_shared/types/status'
import type { SemanticsStyled } from '../../_shared/types/styled'

import { exhaustive } from '../../_shared/utils/exhaustive'

export interface AlertInjectedProps extends
  HasClosable,
  SemanticsStyled<'root' | 'statusIcon' | 'closeBtn' | 'action' | 'content' | 'description' | 'message'> {
  /**
   * @description 外部引用
   */
  ref?: Ref<{ nativeElement: HTMLDivElement | null }>

  /**
   * @description 类型(banner 模式下默认值为 warning)
   * @default info
   */
  type?: CommonStatus

  /**
   * @description 提示内容
   */
  message?: ReactNode

  /**
   * @description 提示介绍
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
  onClose?: VoidFn

  /**
   * @description 关闭动画结束后触发
   */
  onClosed?: VoidFn
}

export interface AlertProps extends AlertInjectedProps, HTMLAttributes<HTMLDivElement> {}

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

export const excludedAlertProps = exhaustive<DefaultNames | keyof AlertInjectedProps>()([
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
  // events
  'onClose',
  'onClosed',
])
