import type { ModalFooterProps } from './modal-footer.props'

import { isFunction } from '@mink-ui/shared/is/is-function'
import { isUndefined } from '@mink-ui/shared/is/is-undefined'

import { defineName } from '../../_shared/utils/define-name'
import { DisabledContext } from '../../config-provider/src/_shared.context'
import { ModalFooterContext } from './_shared.context'
import { useModalFooterProps } from './hooks/use-modal-footer-props'
import { ModalCancelAction, ModalCancelButton, ModalConfirmAction, ModalConfirmButton } from './modal-buttons'

function ModalFooter(props: ModalFooterProps) {
  const { omitted, modalFooterContextValue } = useModalFooterProps(props)

  const { _isJsxModal, footer } = omitted

  const renderElement = () => {
    const functional = isFunction(footer)

    if (!functional && !isUndefined(footer)) return footer

    const cancelButton = _isJsxModal ? <ModalCancelButton /> : <ModalCancelAction />

    const confirmButton = _isJsxModal ? <ModalConfirmButton /> : <ModalConfirmAction />

    const buttons = { cancelButton, confirmButton }

    const footerElement = (
      <>
        {buttons.cancelButton}
        {buttons.confirmButton}
      </>
    )

    return (
      <ModalFooterContext value={modalFooterContextValue}>
        {functional ? footer(footerElement, buttons) : footerElement}
      </ModalFooterContext>
    )
  }

  return (
    <DisabledContext value={false}>
      {renderElement()}
    </DisabledContext>
  )
}

defineName(ModalFooter, 'Modal.Footer')

export default ModalFooter
