import type { DOMAttributes, ReactElement } from 'react'

import type { HasChildren } from '../../../../_shared/types'

export interface TooltipTriggerProps extends Required<HasChildren<ReactElement>> {
  events: DOMAttributes<HTMLDivElement>

  onResize: () => void

  onScroll: () => void

  isOpen: boolean
}
