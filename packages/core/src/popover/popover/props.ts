import type { SemanticStyledProps } from '@mink-ui/core/_shared/types'
import type { TooltipProps } from '@mink-ui/core/tooltip'
import type { ReactNode } from 'react'

export interface PopoverProps
  extends Omit<TooltipProps, 'classNames' | 'styles'>,
  SemanticStyledProps<'arrow' | 'content' | 'root' | 'title'> {
  content?: ReactNode
  title?: ReactNode
}
