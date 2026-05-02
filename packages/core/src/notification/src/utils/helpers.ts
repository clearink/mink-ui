import type { NotificationHolderGroup, NotificationMethodParams } from '../_shared.props'

import { NOTIFICATION_PLACEMENTS } from '../_shared.constant'

export function getNotificationHolderGroups(): NotificationHolderGroup[] {
  return NOTIFICATION_PLACEMENTS.map(placement => ({
    key: placement,
    visible: false,
    items: [] as NotificationMethodParams[],
  }))
}
