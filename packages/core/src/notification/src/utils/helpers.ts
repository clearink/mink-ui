import type { UniqueKey } from '../../../_shared/types/unique-key'
import type { NotificationItemLayout, NotificationPlacement } from '../_shared.props'
import type { NotificationListProps } from '../notification-list.props'
import type { NotificationListControl } from './notification-list-control'

export function isTopSided(placement: NotificationPlacement) {
  return placement === 'topLeft' || placement === 'top' || placement === 'topRight'
}

export function getNotificationListLayouts(
  items: NotificationListProps['items'],
  sizes: NotificationListControl['$sizes'],
  gap: number,
  offset: number,
  collapsed: boolean,
) {
  const count = items.length
  const itemLayouts = new Map<UniqueKey, Record<string, string>>()

  let listHeight = 0
  let lastHeight = 0

  for (let i = count - 1, delta = 0; i >= 0; i--) {
    const { key } = items[i]
    const { height = 0 } = sizes.get(`${key}`) || {}

    if (i === count - 1) lastHeight = height

    if (!collapsed) listHeight += height + gap
    else if (i === count - 1) listHeight = height + gap

    const shift = collapsed ? listHeight - gap - height + delta : delta

    const order = count - 1 - i

    const clip = Math.max(height + gap - lastHeight, 0)

    delta += collapsed ? offset : height + gap

    itemLayouts.set(`${key}`, {
      '--nt-shift': `${shift}px`,
      '--nt-order': `${order}`,
      '--nt-clip': `${clip}px`,
    })
  }

  return { itemLayouts, listHeight }
}
