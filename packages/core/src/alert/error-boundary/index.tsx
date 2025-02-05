import type { ErrorInfo, ReactNode } from 'react'

import { betterDisplayName } from '@mink-ui/core/_shared/utils'
import { fallback } from '@mink-ui/shared'
import { Component } from 'react'

import type { ErrorBoundaryProps, ErrorBoundaryState } from './props'

import Alert from '../alert'

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
        id={id}
        message={fallback(message, `${error || ''}`)}
        type="error"
        description={(
          <pre style={{ fontSize: '0.9em', overflowX: 'auto', margin: 0 }}>
            {fallback(description, errorInfo?.componentStack)}
          </pre>
        )}
      >
      </Alert>
    )
  }
}

betterDisplayName(ErrorBoundary, 'Alert.ErrorBoundary')

export default ErrorBoundary
