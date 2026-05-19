import { useNotification } from './hooks/use-notification'
import { globalNotificationControl } from './utils/singleton'

const notification = Object.assign(globalNotificationControl.expose(), { useNotification })

/**
 * |---------------------------------------------------------|
 * |------------------- export definition -------------------|
 * |---------------------------------------------------------|
 */

export type {
  NotificationConfig,
  NotificationGlobalMethods,
  NotificationHookMethods,
  NotificationMethodParams,
} from './_shared.props'

export { notification }
export default notification
