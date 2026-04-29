import type { ErrorInfo, ReactNode } from 'react'
import type { ErrorBoundaryProps, ErrorBoundaryState } from './error-boundary.props'

import { Component } from 'react'
import { fallback } from '@mink-ui/shared/function/fallback'

import { defineName } from '../../_shared/utils/define-name'
import Alert from './alert'

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    error: null,
    errorInfo: null,
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ error, errorInfo })
  }

  render(): ReactNode {
    const { message, description, id, children } = this.props
    const { error, errorInfo } = this.state

    if (!error) return children

    return (
      <Alert
        description={(
          <pre style={{ fontSize: '0.9em', overflowX: 'auto', margin: 0 }}>
            {fallback(description, errorInfo?.componentStack)}
          </pre>
        )}
        id={id}
        message={fallback(message, `${error || ''}`)}
        type="error"
      >
      </Alert>
    )
  }
}

defineName(ErrorBoundary, 'Alert.ErrorBoundary')

export default ErrorBoundary
