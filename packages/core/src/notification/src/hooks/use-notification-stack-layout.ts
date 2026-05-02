import type { CSSProperties, MouseEvent, ReactElement } from 'react'
import type { OmittedNotificationListProps, PickedNotificationListProps } from '../notification-list.props'

import isEqual from 'react-fast-compare'
import { useMemo } from 'react'

import { useConstant } from '../../../_shared/hooks/use-constant'
import { useEvent } from '../../../_shared/hooks/use-event'
import { useExactState } from '../../../_shared/hooks/use-exact-state'
import { useForceUpdate } from '../../../_shared/hooks/use-force-update'
import { useDebounceFrame, useThrottleFrame } from '../../../_shared/hooks/use-scheduler'
import { useWatchValue } from '../../../_shared/hooks/use-watch-value'
import { normalizeNotificationStackConfig, normalizeNotificationStackLayouts } from '../utils/format'
import { NotificationListControl } from '../utils/notification-list-control'

export function useNotificationStackLayout(
  picked: PickedNotificationListProps,
  omitted: OmittedNotificationListProps,
) {
  const { stack, placement } = picked
  const { items } = omitted

  const forceUpdate = useForceUpdate()

  const ctrl = useConstant(() => new NotificationListControl(forceUpdate))

  const [listHovering, setListHovering] = useExactState(false)

  const [stackLayouts, setStackLayouts] = useExactState(() => new Map<ReactElement['key'], CSSProperties>())

  const { stackEnable, stackConfig } = useMemo(() => normalizeNotificationStackConfig(stack), [stack])

  const isExpanded = stackEnable && (listHovering || items.length <= stackConfig.threshold)

  const handleComputeLayouts = useEvent(() => {
    if (!stackEnable) return

    setStackLayouts(normalizeNotificationStackLayouts(
      ctrl,
      placement,
      listHovering,
      stackEnable,
      stackConfig,
    ))
  })

  const handleOnMouseEnter = () => { setListHovering(true) }

  const handleOnMouseLeave = () => { setListHovering(false) }

  const handleSyncHovering = useDebounceFrame(() => {
    const el = ctrl.$container.current
    el && setListHovering(el.matches(':hover'))
  })

  // TODO: 这里需要优化
  const returnEarly = useWatchValue([stack, listHovering], {
    compare: isEqual,
    listener: useDebounceFrame(() => {
      stackEnable ? handleComputeLayouts() : setStackLayouts(new Map())
    }),
  })

  return {
    ctrl,
    listHovering,
    isExpanded,
    stackEnable,
    stackConfig,
    stackLayouts,
    returnEarly,
    handleOnMouseEnter,
    handleOnMouseLeave,
    handleSyncHovering,
    handleComputeLayouts,
  }
}
