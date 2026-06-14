import { useEffect } from 'react'
import { fallback } from '@mink-ui/shared/function/fallback'

import { useControlledState } from '../../../_shared/hooks/use-controlled-state'
import { ModalFooterContext } from '../_shared.context'
import { defaultCancelButtonProps, defaultConfirmButtonProps } from '../modal-buttons.props'

export function useModalCancelButtonProps() {
  const modalFooterContext = ModalFooterContext.use()

  const { cancelButtonProps, cancelText, onCancel } = modalFooterContext

  const {
    children = fallback(cancelText, defaultCancelButtonProps.children),
    onClick = onCancel,
  } = cancelButtonProps || {}

  const picked = { children, onClick }

  return {
    picked,
    omitted: cancelButtonProps,
  }
}

export function useModalConfirmButtonProps() {
  const modalFooterContext = ModalFooterContext.use()

  const { confirmLoading, confirmText, confirmButtonProps, onOk } = modalFooterContext

  const {
    children = fallback(confirmText, defaultConfirmButtonProps.children),
    theme = defaultConfirmButtonProps.theme,
    variant = defaultConfirmButtonProps.variant,
    loading = confirmLoading,
    onClick = onOk,
  } = confirmButtonProps || {}

  const picked = { children, theme, variant, loading, onClick }

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
    loading,
    children = fallback(cancelText, defaultCancelButtonProps.children),
    onClick = onCancel,
  } = cancelButtonProps || {}

  const picked = { children, onClick }

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
    children = fallback(confirmText, defaultConfirmButtonProps.children),
    theme = defaultConfirmButtonProps.theme,
    variant = defaultConfirmButtonProps.variant,
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
