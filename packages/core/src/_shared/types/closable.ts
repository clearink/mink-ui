import type { AriaAttributes, MouseEventHandler, ReactNode } from 'react'
import type { VoidFn } from '@mink-ui/shared/interface'
import type { CommonDisabled } from './disabled'

export interface CommonClosable extends AriaAttributes {
  /**
   * @description 关闭图标
   */
  closeIcon?: ReactNode

  /**
   * @description 是否禁用
   */
  disabled?: CommonDisabled

  /**
   * @description 点击关闭时触发
   */
  onClose?: MouseEventHandler<HTMLButtonElement>

  /**
   * @description 彻底关闭后触发
   */
  onClosed?: VoidFn
}

export interface HasClosable {
  /**
   * @description 关闭图标
   */
  closeIcon?: ReactNode

  /**
   * @description 能否关闭
   */
  closable?: CommonClosable | boolean
}

export interface HasClosableWithIconRender extends HasClosable {
  closeIconRender?: (icon: ReactNode) => ReactNode
}
