import type { ModalFooterProps } from './modal-footer.props'
import type { ModalProps } from './modal.props'

import { ctxHelper } from '../../_shared/utils/ctx-helper'

export interface ModalFooterContextState extends
  Pick<ModalFooterProps, 'subscribe' | '_showCancel'>,
  Pick<
    ModalProps,
    | 'confirmLoading'
    | 'confirmText'
    | 'confirmButtonProps'
    | 'cancelText'
    | 'cancelButtonProps'
    | 'onOk'
    | 'onCancel'
  > {}

/**
 * @description 透传给 ModalFooterButton 的属性
 */
export const ModalFooterContext = ctxHelper<ModalFooterContextState>('ModalFooterContext', {})
