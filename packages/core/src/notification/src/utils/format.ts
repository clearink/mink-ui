import type { CSSProperties, ReactElement } from 'react'
import type { NotificationStackConfig } from '../_shared.props'
import type { NotificationListProps } from '../notification-list.props'
import type { NotificationListControl } from './notification-list-control'

import { shallowMerge } from '@mink-ui/shared'
import { isObject } from '@mink-ui/shared/is/is-object'

import { defaultNotificationStackConfig } from '../_shared.props'

export function normalizeNotificationStackConfig(stack: NotificationListProps['stack']) {
  const isStackObject = isObject(stack)

  const stackEnable = isStackObject ? true : !!stack

  return {
    stackEnable,
    stackConfig: isStackObject
      ? shallowMerge(stack, defaultNotificationStackConfig) as NotificationStackConfig
      : defaultNotificationStackConfig,
  }
}

export function normalizeNotificationStackLayouts(
  ctrl: NotificationListControl,
  placement: NotificationListProps['placement'],
  listHovering: boolean,
  stackEnable: boolean,
  stackConfig: NotificationStackConfig,
) {
  const { gap, offset, threshold } = stackConfig

  const newLayouts = new Map<ReactElement['key'], CSSProperties>()

  const elements = Array.from(ctrl.$group.current?.instances || []).reduce((result, [key, info]) => {
    const item = ctrl.$items.get(key)

    if (item && info.element && !(info.isExiting || info.isExited)) {
      result.push([item, key])
    }

    return result
  }, [] as [HTMLElement, ReactElement['key']][])

  if (!elements.length) return newLayouts

  if (stackEnable) elements.reverse()

  const factor = placement?.startsWith('top') ? 1 : -1

  const count = elements.length

  const isExpanded = count <= threshold || listHovering

  const latest = elements[0][0]

  for (let scale = 1, i = 0, delta = 0; i < count; i++) {
    const [item, key] = elements[i]

    const height = (isExpanded ? item : latest).offsetHeight

    const dx = placement === 'top' || placement === 'bottom' ? '-50%' : 0

    const transform = `translate3d(${dx}, ${delta}px, 0) scaleX(${scale})`

    newLayouts.set(key, { transform, height })

    if (i >= count - 1) continue

    delta += (isExpanded ? item.offsetHeight + gap : offset) * factor

    if (!isExpanded) scale = 1 - offset * 2 * Math.min(i + 1, 3) / latest.offsetWidth
  }

  return newLayouts
}
