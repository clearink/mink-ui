import { useNotification } from './hooks/use-notification'
import { globalNotificationControl } from './utils/global-singleton'

const notification = Object.assign(globalNotificationControl.expose(), { useNotification })

/**
 * |---------------------------------------------------------|
 * |------------------- export definition -------------------|
 * |---------------------------------------------------------|
 */

export type { NotificationConfig } from './_shared.props'

export { notification }
export default notification
