import type { OmittedNotificationListProps, PickedNotificationListProps } from '../notification-list.props'

import { useMemo } from 'react'

import { useConstant } from '../../../_shared/hooks/use-constant'
import { useExactState } from '../../../_shared/hooks/use-exact-state'
import { useForceUpdate } from '../../../_shared/hooks/use-force-update'
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

  const forceUpdate = useForceUpdate()

  const ctrl = useConstant(() => new NotificationListControl(forceUpdate))

  const [isHovering, setIsHovering] = useExactState(false)

  const [stackEnable, { threshold, offset }] = normalizeNotificationStackConfig(stack)

  const isExpanded = stackEnable && (isHovering || items.length <= threshold)

  const isCollapsed = !isExpanded && stackEnable

  const { itemLayouts, listHeight } = useMemo(() => getNotificationListLayouts(
    items,
    ctrl.$sizes,
    gap!,
    offset,
    isCollapsed,
  ), [ctrl.$sizes, items, gap, offset, isCollapsed])

  const handleOnMouseEnter = () => { stackEnable && setIsHovering(true) }

  const handleOnMouseLeave = () => { setIsHovering(false) }

  const handleSyncHovering = useDebounceFrame(() => {
    const el = ctrl.$container.current
    el && setIsHovering(el.matches(':hover'))
  })

  return {
    ctrl,
    isHovering,
    isExpanded,
    listHeight,
    itemLayouts,
    stackEnable,
    handleOnMouseEnter,
    handleOnMouseLeave,
    handleSyncHovering,
  }
}
