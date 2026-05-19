import type { UniqueKey } from '../../../_shared/types/unique-key'
import type { OmittedNotificationListProps, PickedNotificationListProps } from '../notification-list.props'

import { useMemo, useState } from 'react'

import { useConstant } from '../../../_shared/hooks/use-constant'
import { useInvoke } from '../../../_shared/hooks/use-invoke'
import { useDebounceFrame } from '../../../_shared/hooks/use-scheduler'
import { normalizeNotificationStackConfig } from '../utils/format'
import { getNotificationListLayouts } from '../utils/helpers'
import { NotificationListControl } from '../utils/notification-list-control'

export function useNotificationListLayouts(
  picked: PickedNotificationListProps,
  omitted: OmittedNotificationListProps,
) {
  const { gap, stack } = picked
  const { items } = omitted

  const [sizes, setSizes] = useState(() => new Map<UniqueKey, number>())

  const ctrl = useConstant(() => new NotificationListControl())

  useInvoke(() => { ctrl._bind((updater) => { setSizes(updater) }) })

  const [isHovering, setIsHovering] = useState(false)

  const [stackEnable, { threshold, offset }] = normalizeNotificationStackConfig(stack)

  const isExpanded = stackEnable && (isHovering || items.length <= threshold)

  const isCollapsed = !isExpanded && stackEnable

  const { itemCssVars, listHeight } = useMemo(() => getNotificationListLayouts(
    items,
    sizes,
    gap!,
    offset,
    isCollapsed,
  ), [sizes, items, gap, offset, isCollapsed])

  const handleMouseEnter = () => { stackEnable && setIsHovering(true) }

  const handleMouseLeave = () => { setIsHovering(false) }

  const handleRecheckHover = useDebounceFrame(() => {
    const el = ctrl.container
    el && setIsHovering(el.matches(':hover'))
  })

  return {
    ctrl,
    isHovering,
    isExpanded,
    listHeight,
    itemCssVars,
    stackEnable,
    handleMouseEnter,
    handleMouseLeave,
    handleRecheckHover,
  }
}
