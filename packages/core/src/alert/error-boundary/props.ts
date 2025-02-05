import type { ErrorInfo, ReactNode } from 'react'

export interface ErrorBoundaryProps {
  message?: ReactNode
  description?: ReactNode
  id?: string
  children?: ReactNode
}
export interface ErrorBoundaryState {
  error: Error | null
  errorInfo: ErrorInfo | null
}
