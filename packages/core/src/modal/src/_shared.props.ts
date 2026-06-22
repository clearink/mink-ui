import type { ReactNode } from 'react'
import type { Breakpoint } from '../../_shared/hooks/use-breakpoint/_shared.props'
import type { GetSemanticsConfig } from '../../_shared/types/has-semantics'
import type { CommonStatus } from '../../_shared/types/status'
import type { ModalProps, ModalSharedParams } from './modal.props'

export interface ModalMethodReturn {
  then: (callback: (confirmed: boolean) => void) => Promise<void>
  update: (params: ModalMethodParams) => void
  close: () => void
}

export type ModalVariantMethods = Record<ModalVariant, (params: ModalMethodParams) => ModalMethodReturn>

export interface ModalHookMethods extends ModalVariantMethods {}

export interface ModalGlobalMethods extends ModalHookMethods {
  config: (config: ModalGlobalConfig) => void
}

export interface ModalMethodParams extends ModalSharedParams {}

export interface ModalFooterRenderFunction {
  (element: ReactNode, params: { confirmButton: ReactNode, cancelButton: ReactNode }): ReactNode
}

export type ModalWidth = string | number

export type ResponsiveModalWidth = Partial<Record<Breakpoint, ModalWidth>>

export type ModalButtonType = 'cancel' | 'confirm'

export type ModalVariant = CommonStatus | 'confirm'

export interface ModalHolderItem {
  /**
   * @description 当前 modal 是否打开
   */
  isOpen: boolean

  /**
   * @description modal 配置
   */
  config: ModalMethodParams
}

/**
 * |---------------------------------------------------------|
 * |                     global definition                   |
 * |---------------------------------------------------------|
 */

export interface ModalGlobalConfig extends GetSemanticsConfig<ModalProps>,
  Pick<
    ModalProps,
    | 'keyboard'
    | 'maskClosable'
    | 'centered'
    | 'closable'
    | 'focusable'
    | 'slots'
    | 'fromPointerOpen'
    | 'confirmButtonProps'
    | 'cancelButtonProps'
  > {}
