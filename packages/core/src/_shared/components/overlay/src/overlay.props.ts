import type { SemanticsStyled } from '../../../types'
import type { PortalProps } from '../../portal/src'
import type { CssTransitionProps } from '../../transition/src'

export interface OverlayProps extends
  Pick<CssTransitionProps, 'mountOnEnter' | 'unmountOnExit' | 'children'>,
  Pick<PortalProps, 'getContainer'>,
  SemanticsStyled<'root' | 'mask'> {
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
  transitions: Partial<Record<'mask' | 'content', CssTransitionProps['classNames']>>
}

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
