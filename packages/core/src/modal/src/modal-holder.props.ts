import type { ModalHolderItem } from './_shared.props'

export interface ModalHolderInjectedProps {
  /**
   * @description Modal 列表
   */
  items: Map<string, ModalHolderItem>
}

export interface ModalHolderProps extends ModalHolderInjectedProps {}
