import { useModal } from './hooks/use-modal'
import { GeneratedJsxModal } from './modal'
import { globalModalControl } from './utils/singleton'

const Modal = Object.assign(GeneratedJsxModal, globalModalControl.expose(), { useModal })

/**
 * |---------------------------------------------------------|
 * |------------------- export definition -------------------|
 * |---------------------------------------------------------|
 */

export type { ModalConfig, ModalGlobalMethods, ModalHookMethods, ModalMethodParams } from './_shared.props'
export type { ModalProps } from './modal.props'

export { Modal }
export default Modal
