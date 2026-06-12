import type { ReactNode } from 'react'
import type { VoidFn } from '@mink-ui/shared/interface'
import type { OverlayProps } from '../../_shared/components/overlay/src'
import type { HasClosable } from '../../_shared/types/closable'
import type { HasFocusable } from '../../_shared/types/focusable'
import type { HasChildren } from '../../_shared/types/has-children'
import type { HasSlots } from '../../_shared/types/has-slots'
import type { SemanticsStyled } from '../../_shared/types/styled'
import type { ModalVariant, ModalWidth, ResponsiveModalWidth } from './_shared.props'
import type { ModalFooterForwardedProps } from './modal-footer.props'

import { exhaustive } from '../../_shared/utils/exhaustive'

export interface ModalOverlayProps extends Pick<
  OverlayProps,
  | 'isOpen'
  | 'transitions'
  | 'mask'
  | 'getContainer'
  | 'mountOnEnter'
  | 'unmountOnExit'
  | 'zIndex'
> {}

export interface ModalSharedConfig extends
  HasClosable,
  HasFocusable,
  HasSlots<{ main: (node: ReactNode) => ReactNode }>,
  Omit<ModalOverlayProps, 'isOpen'>,
  Omit<ModalFooterForwardedProps, 'confirmLoading' | 'onOk' | 'onCancel'>,
  SemanticsStyled<'mask' | 'root' | 'main' | 'header' | 'title' | 'statusIcon' | 'closeBtn' | 'body' | 'footer', ModalProps> {
  /**
   * @description 弹窗类型
   */
  type?: ModalVariant

  /**
   * @description 点击遮罩层是否关闭
   * @default true
   */
  maskClosable?: boolean

  /**
   * @description 点击 Esc 按钮关闭模态框
   * @default true
   */
  keyboard?: boolean

  /**
   * @description 关闭后仍更新 modal 内容
   */
  fresh?: boolean

  /**
   * @description 是否垂直居中
   */
  centered?: boolean

  /**
   * @description 弹窗宽度
   */
  width?: ModalWidth | ResponsiveModalWidth
}

export interface ModalSharedProps extends
  ModalSharedConfig,
  Pick<ModalFooterForwardedProps, 'onOk' | 'onCancel'> {
  /**
   * @description 弹窗标题
   */
  title?: ReactNode

  /**
   * @description 弹窗内容
   */
  content?: ReactNode

  /**
   * @description 完全打开后触发
   */
  onOpened?: VoidFn

  /**
   * @description 完全关闭后触发
   */
  onClosed?: VoidFn
}

export interface ModalInjectedProps extends
  HasChildren,
  Omit<ModalSharedProps, 'content'>,
  Pick<ModalFooterForwardedProps, 'confirmLoading'>,
  Pick<ModalOverlayProps, 'isOpen'> {
  /**
   * @internal
   * @description 模态框渲染方式
   */
  _isJsxModal: boolean

  /**
   * @internal
   * @description 取消按钮是否需要显示
   */
  _showCancel?: boolean

  /**
   * @internal
   * @description 关闭弹窗
   */
  _onDismiss?: ModalFooterForwardedProps['onCancel']
}

export interface InternalModalProps extends ModalInjectedProps {}

export interface ModalProps extends Omit<
  InternalModalProps,
  | 'type'
  | '_isJsxModal'
  | '_showCancel'
  | '_onDismiss'
> {}

export type DefaultNames = 'keyboard' | 'maskClosable' | 'centered' | 'closable' | 'focusable'

export type PickedInternalModalProps = Pick<InternalModalProps, DefaultNames>

export type OmittedInternalModalProps = Omit<InternalModalProps, DefaultNames>

export type ModalHookDefaultNames = 'width' | 'type' | 'maskClosable' | 'closable'

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                        constants                        |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export const defaultInternalModalProps: PickedInternalModalProps = {
  keyboard: true,
  maskClosable: true,
  centered: false,
  closable: true,
  focusable: true,
}

export const defaultApiModalProps: Partial<InternalModalProps> = {
  width: 416,
  type: 'confirm',
  closable: false,
  maskClosable: false,
}

export const includedApiModalProps = exhaustive<ModalHookDefaultNames>()([
  'width',
  'type',
  'closable',
  'maskClosable',
])
