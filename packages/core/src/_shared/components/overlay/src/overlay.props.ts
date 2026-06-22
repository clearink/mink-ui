import type { Ref } from 'react'
import type { HasSemanticsStyled } from '../../../types/has-semantics'
import type { PortalInstance, PortalProps } from '../../portal/src'
import type { CssTransitionProps } from '../../transition/src'

import { exhaustive } from '../../../utils/exhaustive'

export interface OverlayInstance {
  /**
   * @description 容器元素
   */
  portal: PortalInstance

  /**
   * @description 过渡元素
   */
  motion: HTMLElement | null
}

export interface OverlayPortalProps extends Pick<PortalProps, 'getContainer'> {}

export interface OverlayTransitionProps extends
  Pick<
    CssTransitionProps,
    | 'children' | 'mountOnEnter' | 'unmountOnExit' | 'skipBeginning'
    | 'onEnter' | 'onEntering' | 'onEntered' | 'onEnterCancel'
    | 'onExit' | 'onExiting' | 'onExited' | 'onExitCancel'
  > {}

export interface OverlayInjectedProps extends
  HasSemanticsStyled<'root' | 'mask', OverlayProps> {
  /**
   * @description 外部引用
   */
  ref?: Ref<OverlayInstance>
  /**
   * @description 是否展示遮罩
   */
  mask?: boolean

  /**
   * @description 是否打开
   */
  isOpen?: boolean

  /**
   * @description z-index
   */
  zIndex?: number

  /**
   * @description 动效配置
   */
  transitions?: Partial<Record<'mask' | 'content', CssTransitionProps['classNames']>>
}

export interface OverlayProps extends OverlayInjectedProps, OverlayPortalProps, OverlayTransitionProps {}

export type DefaultNames = 'mask' | 'mountOnEnter' | 'unmountOnExit'

export type PickedOverlayProps = Pick<OverlayProps, DefaultNames>

export type OmittedOverlayProps = Omit<OverlayProps, DefaultNames>

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                        constants                        |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export const defaultOverlayProps: PickedOverlayProps = {
  mask: true,
  mountOnEnter: true,
  unmountOnExit: false,
}

export const overlayTransitionProps = exhaustive<keyof OverlayTransitionProps>()([
  'children',
  'mountOnEnter',
  'unmountOnExit',
  'skipBeginning',
  'onEnter',
  'onEntering',
  'onEntered',
  'onEnterCancel',
  'onExit',
  'onExiting',
  'onExited',
  'onExitCancel',
])
