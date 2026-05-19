import { useEffect } from 'react'
import { fallback } from '@mink-ui/shared/function/fallback'

import { useControlledState } from '../../../_shared/hooks/use-controlled-state'
import { ModalFooterContext } from '../_shared.context'

export function useModalCancelButtonProps() {
  const modalFooterContext = ModalFooterContext.use()

  const { cancelButtonProps, cancelText, onCancel } = modalFooterContext

  const {
    theme = 'info',
    children = fallback(cancelText, '取消'),
    onClick = onCancel,
  } = cancelButtonProps || {}

  const picked = { children, theme, onClick }

  return {
    picked,
    omitted: cancelButtonProps,
  }
}

export function useModalConfirmButtonProps() {
  const modalFooterContext = ModalFooterContext.use()

  const { confirmLoading, confirmText, confirmButtonProps, onOk } = modalFooterContext

  const {
    // TODO: 移到 .props.ts 中
    variant = 'solid',
    loading = confirmLoading,
    children = fallback(confirmText, '确认'),
    onClick = onOk,
  } = confirmButtonProps || {}

  const picked = { children, variant, loading, onClick }

  return {
    picked,
    omitted: confirmButtonProps,
  }
}

export function useModalCancelActionProps() {
  const modalFooterContext = ModalFooterContext.use()

  const {
    _showCancel,
    cancelText,
    cancelButtonProps,
    subscribe,
    onCancel,
  } = modalFooterContext

  const {
    theme = 'info',
    loading,
    children = fallback(cancelText, '取消'),
    onClick = onCancel,
  } = cancelButtonProps || {}

  const picked = { children, theme, onClick }

  const [isLoading, setIsLoading] = useControlledState(loading, () => false)

  useEffect(() => subscribe?.('cancel', setIsLoading), [subscribe, setIsLoading])

  return {
    omitted: cancelButtonProps,
    picked,
    isLoading,
    visible: _showCancel,
  }
}

export function useModalConfirmActionProps() {
  const modalFooterContext = ModalFooterContext.use()

  const { confirmText, confirmButtonProps, subscribe, onOk } = modalFooterContext

  const {
    loading,
    theme = 'primary',
    variant = 'solid',
    children = fallback(confirmText, '确认'),
    onClick = onOk,
  } = confirmButtonProps || {}

  const picked = { children, theme, variant, onClick }

  const [isLoading, setIsLoading] = useControlledState(loading, () => false)

  useEffect(() => subscribe?.('confirm', setIsLoading), [subscribe, setIsLoading])

  return {
    omitted: confirmButtonProps,
    picked,
    isLoading,
  }
}
