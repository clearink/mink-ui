import type { MouseEvent } from 'react'
import type { AnyFn } from '@mink-ui/shared/interface'
import type { ModalButtonType } from '../_shared.props'
import type { InternalModalProps, OmittedInternalModalProps, PickedInternalModalProps } from '../modal.props'

import { useState } from 'react'
import { fallback } from '@mink-ui/shared/function/fallback'
import { noop } from '@mink-ui/shared/function/noop'
import { shallowEqual } from '@mink-ui/shared/object/shallow-equal'

import { useConstant } from '../../../_shared/hooks/use-constant'
import { useEscHandler } from '../../../_shared/hooks/use-esc-handler'
import { useEvent } from '../../../_shared/hooks/use-event'
import { useCombinedSemantics } from '../../../_shared/hooks/use-settings/use-combined'
import { useConfiguration } from '../../../_shared/hooks/use-settings/use-configuration'
import { useWatchValue } from '../../../_shared/hooks/use-watch-value'
import { normalizeClosable } from '../../../_shared/utils/closable'
import { normalizeFocusable } from '../../../_shared/utils/focusable'
import { normalizeSlots } from '../../../_shared/utils/slots'
import { defaultInternalModalProps as defaultProps } from '../modal.props'
import { ModalControl } from '../utils/modal-control'
import { useModalClassNames } from './use-class-names'

export function useInternalModalProps(props: InternalModalProps) {
  const globalConfig = useConfiguration('modal')

  const {
    _isJsxModal,
    _onDismiss,
    isOpen,
    confirmLoading,
    slots,
    onOk,
    onCancel,
    onOpened,
    onClosed,
    keyboard = fallback(globalConfig.keyboard, defaultProps.keyboard),
    maskClosable = fallback(globalConfig.maskClosable, defaultProps.maskClosable),
    centered = fallback(globalConfig.centered, defaultProps.centered),
    closable = fallback(globalConfig.closable, defaultProps.closable),
    focusable = fallback(globalConfig.focusable, defaultProps.focusable),
  } = props

  const omitted = props as OmittedInternalModalProps
  const picked: PickedInternalModalProps = { maskClosable, centered, closable }

  const ctrl = useConstant(() => new ModalControl())

  const [visible, setVisible] = useState(isOpen)

  const { rns, ns, cssVars, classNames } = useModalClassNames(picked, omitted)

  const [cssNames, cssAttrs] = useCombinedSemantics(
    [
      globalConfig.classNames,
      { root: globalConfig.className },
      classNames,
      omitted.classNames,
      { root: omitted.className },
    ],
    [
      globalConfig.styles,
      { root: globalConfig.style },
      omitted.styles,
      { root: omitted.style },
      { root: cssVars },
    ],
    { meta: { ...omitted, ...picked } },
  )

  const renderSlots = normalizeSlots({
    currentState: { slots },
    contextState: { slots: globalConfig.slots },
  })

  const focusableState = normalizeFocusable({
    currentState: { focusable },
    contextState: { focusable: globalConfig.focusable },
    defaultState: { focusable: true },
  })

  const [closableState, closeIconRender] = normalizeClosable({
    currentState: { closable },
    contextState: { closable: globalConfig.closable },
  })

  const subscribe = useEvent((type: ModalButtonType, fn: AnyFn) => {
    if (_isJsxModal) return noop

    return ctrl.$$loading.on(type, fn)
  })

  const handleOk = useEvent((event: MouseEvent) => {
    if (_isJsxModal && confirmLoading) return

    if (!_isJsxModal && ctrl.$$loading.confirm) return

    ctrl.$$loading.resolve(_isJsxModal, 'confirm', onOk?.(event))
  })

  const handleCancel = useEvent((event: MouseEvent | KeyboardEvent) => {
    if (_isJsxModal && confirmLoading) return

    if (!_isJsxModal && ctrl.$$loading.cancel) return

    ctrl.$$loading.resolve(_isJsxModal, 'cancel', onCancel?.(event), closableState?.onClose)
  })

  const handleDismiss = useEvent((event: MouseEvent | KeyboardEvent) => {
    if (_isJsxModal && confirmLoading) return

    _isJsxModal ? onCancel?.(event) : _onDismiss?.(event)

    closableState?.onClose?.()
  })

  const handleClick = (event: MouseEvent) => {
    if (!maskClosable) return

    if (event.target !== event.currentTarget) return

    handleDismiss(event)
  }

  const handleEntered = () => { onOpened?.() }

  const handleExited = () => {
    setVisible(false)

    onClosed?.()

    closableState?.onClosed?.()

    ctrl.reset()
  }

  const returnEarly1 = useWatchValue(
    !!isOpen,
    () => { setVisible(true) },
    (curr, prev) => !curr || shallowEqual(curr, prev),
  )

  const returnEarly2 = useWatchValue(
    _isJsxModal,
    () => { ctrl.$$loading.reset() },
    (curr, prev) => !curr || shallowEqual(curr, prev),
  )

  useEscHandler(!!isOpen && !!keyboard, handleDismiss)

  return {
    omitted,
    rns,
    ns,
    cssNames,
    cssAttrs,
    ctrl,
    visible,
    renderSlots,
    focusableState,
    closeIconRender,
    returnEmpty: returnEarly1 || returnEarly2,
    subscribe,
    handleOk,
    handleCancel,
    handleDismiss,
    handleEntered,
    handleExited,
    handleClick,
  }
}
