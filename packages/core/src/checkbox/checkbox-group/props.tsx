import type { ReactNode } from 'react'

import type { SemanticStyledProps } from '../../_shared/types'

export interface CheckboxGroupProps extends SemanticStyledProps<'root' | 'text'> {
  children?: ReactNode
}
