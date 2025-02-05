import _Alert from './alert'
import ErrorBoundary from './error-boundary'

const Alert = Object.assign(_Alert, {
  ErrorBoundary,
})

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                    export definition                    |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export type { AlertProps } from './alert/props'
export type { ErrorBoundaryProps } from './error-boundary/props'

export { Alert }
export default Alert
