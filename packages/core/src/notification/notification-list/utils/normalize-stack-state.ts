import type { ReactElement } from 'react'

import type { NotificationStackConfig } from '../../_shared.props'
import type { NotificationListRefs } from '../hooks/use-notification-list'
import type { NotificationListProps, StackState } from '../props'

function filterElements(refs: NotificationListRefs) {
  return Array.from(refs.components || [])
    .reduce((result, [key, { isExiting, isExited, element }]) => {
      const panel = refs.panels.get(key)

      if (panel && element && !(isExiting || isExited)) {
        result.push([panel, element as any, key])
      }

      return result
    }, [] as [HTMLElement, HTMLElement, ReactElement['key']][])
}

export default function normalizeStackState(options: {
  props: NotificationListProps
  refs: NotificationListRefs
  stackConfig: NotificationStackConfig
  stackEnable: boolean
}) {
  const { props: { placement }, refs, stackEnable, stackConfig } = options

  const { threshold, gap, offset } = stackConfig

  const nextTransforms = new Map<ReactElement['key'], StackState>()

  const elements = filterElements(refs)

  if (stackEnable) elements.reverse()

  if (!elements.length) return nextTransforms

  const factor = placement.startsWith('top') ? 1 : -1

  const count = elements.length

  const isExpanded = count <= threshold || refs.hovers.size > 0

  const latest = elements[0][0]

  for (let delta = 0, i = 0, scale = 1; i < count; i++) {
    const [panel, wrapper, key] = elements[i]

    const height = (isExpanded ? panel : latest).offsetHeight

    nextTransforms.set(key, { delta, scale, height, wrapper })

    if (i >= count - 1) continue

    delta += (isExpanded ? panel.offsetHeight + gap : offset) * factor

    if (!isExpanded) scale = 1 - offset * 2 * Math.min(i + 1, 3) / latest.offsetWidth
  }

  return nextTransforms
}
