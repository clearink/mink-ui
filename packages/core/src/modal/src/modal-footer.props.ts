import type { MouseEvent, ReactNode } from 'react'
import type { AnyFn, VoidFn } from '@mink-ui/shared/interface'
import type { ButtonProps } from '../../button/src'
import type { ModalButtonType, ModalFooterRenderFunction } from './_shared.props'

export interface ModalFooterForwardedProps {
  /**
   * @description 底部内容
   */
  footer?: ReactNode | ModalFooterRenderFunction

  /**
   * @description 确认按钮加载状态
   */
  confirmLoading?: ButtonProps['loading']

  /**
   * @description 确认按钮文本
   */
  confirmText?: string

  /**
   * @description 确认按钮属性
   */
  confirmButtonProps?: ButtonProps

  /**
   * @description 取消按钮文本
   */
  cancelText?: string

  /**
   * @description 取消按钮属性
   */
  cancelButtonProps?: ButtonProps

  /**
   * @description 确认回调
   */
  onOk?: (event: MouseEvent) => void

  /**
   * @description 取消回调
   */
  onCancel?: (event: MouseEvent | KeyboardEvent) => void
}

export interface ModalFooterInjectedProps {
  /**
   * @description 以 jsx 方式渲染模态框
   */
  _isJsxModal: boolean

  /**
   * @description 取消按钮是否显示
   */
  _showCancel?: boolean

  /**
   * @description 订阅 loading 改变
   */
  subscribe?: (type: ModalButtonType, fn: AnyFn) => VoidFn
}

export interface ModalFooterProps extends ModalFooterForwardedProps, ModalFooterInjectedProps {}
