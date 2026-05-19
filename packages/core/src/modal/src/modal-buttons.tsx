import { defineName } from '../../_shared/utils/define-name'
import Button from '../../button/src'
import {
  useModalCancelActionProps,
  useModalCancelButtonProps,
  useModalConfirmActionProps,
  useModalConfirmButtonProps,
} from './hooks/use-modal-buttons'

function ModalCancelButton() {
  const { picked, omitted } = useModalCancelButtonProps()

  return (
    <Button {...omitted} {...picked} />
  )
}

function ModalConfirmButton() {
  const { picked, omitted } = useModalConfirmButtonProps()

  return (
    <Button {...omitted} {...picked} />
  )
}

function ModalCancelAction() {
  const { picked, omitted, isLoading, visible } = useModalCancelActionProps()

  if (!visible) return null

  return <Button {...omitted} {...picked} loading={isLoading} />
}

function ModalConfirmAction() {
  const { picked, omitted, isLoading } = useModalConfirmActionProps()

  return <Button {...omitted} {...picked} loading={isLoading} />
}

defineName(ModalCancelButton, 'Modal.CancelButton')

defineName(ModalConfirmButton, 'Modal.ConfirmButton')

defineName(ModalCancelAction, 'Modal.CancelAction')

defineName(ModalConfirmAction, 'Modal.ConfirmAction')

export { ModalCancelAction, ModalCancelButton, ModalConfirmAction, ModalConfirmButton }
