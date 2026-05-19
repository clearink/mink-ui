import type { AriaAttributes, ReactNode } from 'react'
import type { VoidFn } from '@mink-ui/shared/interface'
import type { CommonDisabled } from './disabled'

import { exhaustive } from '../utils/exhaustive'

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
  onClose?: VoidFn

  /**
   * @description 彻底关闭后触发
   */
  onClosed?: VoidFn
}

export interface HasClosable {
  /**
   * @description 是否可关闭
   */
  closable?: CommonClosable | boolean
}

export type CloseIconRender = (icon: ReactNode, disabled?: boolean) => ReactNode

export type DefaultNames = 'closeIcon' | 'disabled' | 'onClose' | 'onClosed'

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                        constants                        |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export const excludedClosableConfig = exhaustive<DefaultNames>()([
  'closeIcon',
  'disabled',
  'onClose',
  'onClosed',
])
