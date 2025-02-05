import globalInstance from './global-message-instance'
import useMessage from './hooks/use-message'

const message = Object.assign(globalInstance.inject(), {
  useMessage,
})

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                    export definition                    |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export { message }
export default message
