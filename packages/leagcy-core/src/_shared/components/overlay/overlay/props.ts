import type { PortalProps, PortalRef } from '../../portal'
import type { CssTransitionProps as CssProps } from '../../transition'
import type { SemanticStyledProps } from '../../../types'

export type OverlayRef = PortalRef

export interface OverlayProps
  extends Pick<PortalProps, 'getContainer'>,
  Pick<CssProps, 'onEnter' | 'onEntered' | 'onEntering' | 'onExit' | 'onExited' | 'onExiting'>,
  SemanticStyledProps<'mask' | 'root'> {
  children: CssProps['children']

  keepMounted?: boolean

  mask?: boolean

  isOpen?: boolean

  transitions?: { content?: string, mask?: string }

  unmountOnExit?: boolean

  zIndex?: number
}

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                      default props                      |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export const defaultOverlayProps: Partial<OverlayProps> = {
  mask: true,
}
