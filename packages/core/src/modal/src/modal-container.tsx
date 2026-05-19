import type { ModalContainerProps } from './modal-container.props'

import { defineName } from '../../_shared/utils/define-name'
import ConfigProvider from '../../config-provider/src'
import { useModalContainerProps } from './hooks/use-modal-container-props'

function ModalContainer(props: ModalContainerProps) {
  const { ctxHolder, modalConfig } = useModalContainerProps(props)

  //  TODO： ConfigProvider 还需要继承最新的 ConfigProviderGlobalConfig.get()
  return (
    <ConfigProvider modal={modalConfig}>
      {ctxHolder}
    </ConfigProvider>
  )
}

defineName(ModalContainer, 'Modal.Container')

export default ModalContainer
