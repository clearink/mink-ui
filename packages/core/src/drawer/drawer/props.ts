import type { ReactNode } from 'react'

import type { OverlayProps } from '../../_shared/components'
import type { SemanticStyledProps } from '../../_shared/types'

export interface DrawerProps
  extends SemanticStyledProps<'body' | 'close' | 'footer' | 'header' | 'main' | 'root'>,
  Pick<
    OverlayProps,
      'getContainer' | 'isOpen' | 'keepMounted' | 'mask' | 'transitions' | 'unmountOnExit'
  > {

  title?: ReactNode

  children?: ReactNode

  closeOnEscape?: boolean

  footer?: ReactNode

  onBeforeOpen?: () => void

  onAfterOpen?: () => void

  onBeforeClose?: () => void

  onAfterClose?: () => void

  onIsOpenChange?: (isOpen: boolean) => void
}

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                      default props                      |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export const defaultDrawerProps: Partial<DrawerProps> = {
  closeOnEscape: true,
}
