import type { ModalContainerProps } from '../modal-container.props'

import { useImperativeHandle, useState } from 'react'

import { globalModalConfig } from '../utils/singleton-config'
import { useModal } from './use-modal'

export function useModalContainerProps(props: ModalContainerProps) {
  const { ref } = props

  const [currConfig, setCurrConfig] = useState(() => globalModalConfig.get())

  const [api, ctxHolder] = useModal()

  useImperativeHandle(ref, () => ({
    get confirm() { return api.confirm },
    sync: () => { setCurrConfig(globalModalConfig.get()) },
  }), [api, setCurrConfig])

  return {
    ctxHolder,
    modalConfig: currConfig,
  }
}
