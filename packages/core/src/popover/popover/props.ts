import type { ReactNode } from 'react'

import type { SemanticStyledProps } from '../../_shared/types'
import type { TooltipProps } from '../../tooltip'

export interface PopoverProps
  extends Omit<TooltipProps, 'classNames' | 'styles'>,
  SemanticStyledProps<'arrow' | 'content' | 'root' | 'title'> {
  content?: ReactNode
  title?: ReactNode
}
