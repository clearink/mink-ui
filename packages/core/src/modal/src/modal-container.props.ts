import type { Ref } from 'react'
import type { VoidFn } from '@mink-ui/shared/interface'
import type { ModalHookMethods } from './_shared.props'

export interface ModalContainerInstance extends Pick<ModalHookMethods, 'confirm'> {
  sync: VoidFn
}

export interface ModalContainerProps {
  /**
   * @description 外部引用
   */
  ref: Ref<ModalContainerInstance>
}
