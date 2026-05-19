import type { ModalHolderProps } from './modal-holder.props'

import { defineName } from '../../_shared/utils/define-name'
import { GeneratedApiModal } from './modal'

function ModalHolder({ items }: ModalHolderProps) {
  return (
    <>
      {Array.from(items).map(([id, { config, isOpen }]) => (
        <GeneratedApiModal {...config} key={id} isOpen={isOpen}>
          {config.content}
        </GeneratedApiModal>
      ))}
    </>
  )
}

defineName(ModalHolder, 'Modal.Holder')

export default ModalHolder
