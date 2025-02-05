import type { SemanticStyledProps } from '@mink-ui/core/_shared/types'
import type { ReactElement } from 'react'

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
