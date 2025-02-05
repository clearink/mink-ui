import type { PortalProps, PortalRef } from '../../../../_shared/components/portal'
import type { CssTransitionProps as CssProps } from '../../../../_shared/components/transition'
import type { SemanticStyledProps } from '../../../../_shared/types'

export type OverlayRef = PortalRef

export interface OverlayProps
  extends SemanticStyledProps<'mask' | 'root'>,
  Pick<PortalProps, 'getContainer'>,
  Pick<CssProps, 'onEnter' | 'onEntered' | 'onEntering' | 'onExit' | 'onExited' | 'onExiting'> {
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
