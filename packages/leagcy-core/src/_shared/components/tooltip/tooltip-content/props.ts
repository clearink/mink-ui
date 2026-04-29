import type { ReactElement } from 'react'
import type { HasChildren } from '../../../types'

export interface TooltipContentProps extends Required<HasChildren<ReactElement>> {
  onMounted: (el: Element | null) => () => void

  onResize: () => void

  onScroll: () => void

  isOpen: boolean
}
