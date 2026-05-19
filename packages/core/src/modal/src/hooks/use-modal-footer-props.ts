import type { ModalFooterContextState } from '../_shared.context'
import type { ModalFooterProps } from '../modal-footer.props'

import { useComputed } from '../../../_shared/hooks/use-computed'
import { isModalFooterContextValueEqual } from '../utils/helpers'

export function useModalFooterProps(props: ModalFooterProps) {
  const {
    _showCancel,
    confirmLoading,
    confirmText,
    confirmButtonProps,
    cancelText,
    cancelButtonProps,
    subscribe,
    onOk,
    onCancel,
  } = props

  const modalFooterContextValue = useComputed(
    (): ModalFooterContextState => ({
      _showCancel,
      confirmText,
      confirmLoading,
      confirmButtonProps,
      cancelText,
      cancelButtonProps,
      subscribe,
      onOk,
      onCancel,
    }),
    {
      _showCancel,
      confirmText,
      confirmLoading,
      confirmButtonProps,
      cancelText,
      cancelButtonProps,
      subscribe,
      onOk,
      onCancel,
    },
    isModalFooterContextValueEqual,
  )

  return {
    omitted: props,
    modalFooterContextValue,
  }
}
