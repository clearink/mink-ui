import type { HasChildren } from '@mink-ui/core/_shared/types'
import type { DOMAttributes, ReactElement } from 'react'

export interface TooltipTriggerProps extends Required<HasChildren<ReactElement>> {
  events: DOMAttributes<HTMLDivElement>

  onResize: () => void

  onScroll: () => void

  isOpen: boolean
}
