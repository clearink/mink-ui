import type { ReactNode } from 'react'

import type { ValidateStatus } from '../_shared.props'

export interface FormErrorListProps {
  className?: string
  errors?: ReactNode[]
  help?: ReactNode
  helpStatus?: ValidateStatus
  warnings?: ReactNode[]
  onFinished?: () => void
}
