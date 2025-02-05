import type { ReactElement } from 'react'

import type { SemanticStyledProps } from '../../../../_shared/types'

export interface FocusTrapRef {
  focus: () => void
}

export interface FocusTrapProps extends SemanticStyledProps<'root'> {
  active?: boolean

  children: ReactElement

  onExit?: (returnTo: Element | null) => void
}

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                      default props                      |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */
