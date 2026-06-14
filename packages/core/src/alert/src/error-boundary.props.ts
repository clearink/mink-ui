import type { ErrorInfo, ReactNode } from 'react'
import type { HasChildren } from '../../_shared/types/has-children'

export interface ErrorBoundaryProps extends HasChildren {
  message?: ReactNode
  description?: ReactNode
  id?: string
}
export interface ErrorBoundaryState {
  error: Error | null
  errorInfo: ErrorInfo | null
}
