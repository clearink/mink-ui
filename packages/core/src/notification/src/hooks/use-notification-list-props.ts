import type { NotificationListProps, OmittedNotificationListProps, PickedNotificationListProps } from '../notification-list.props'

import { fallback } from '@mink-ui/shared/function/fallback'
import { omit } from '@mink-ui/shared/object/omit'

import { useCombinedSemantics } from '../../../_shared/hooks/use-settings/use-combined'
import { useConfiguration } from '../../../_shared/hooks/use-settings/use-configuration'
import { defaultNotificationListProps as defaultProps } from '../notification-list.props'
import { isTopSided } from '../utils/helpers'
import { useNotificationListClassNames } from './use-class-names'
import { useNotificationListLayouts } from './use-notification-list-layouts'

export function useNotificationListProps(props: NotificationListProps) {
  const globalConfig = useConfiguration('notification')

  const {
    onGroupExited,
    top = fallback(globalConfig.top, defaultProps.top),
    bottom = fallback(globalConfig.bottom, defaultProps.bottom),
    gap = fallback(globalConfig.gap, defaultProps.gap),
    stack = fallback(globalConfig.stack, defaultProps.stack),
    maxCount = fallback(globalConfig.maxCount, defaultProps.maxCount),
    placement = fallback(globalConfig.placement, defaultProps.placement)!,
  } = props

  const omitted = props as OmittedNotificationListProps

  const picked: PickedNotificationListProps = {
    top,
    bottom,
    gap,
    stack,
    maxCount,
    placement,
  }

  const {
    ctrl,
    isHovering,
    isExpanded,
    listHeight,
    itemLayouts,
    stackEnable,
    handleOnMouseEnter,
    handleOnMouseLeave,
    handleSyncHovering,
  } = useNotificationListLayouts(picked, omitted)

  const { ns, classNames } = useNotificationListClassNames(picked, omitted, {
    stackEnable,
    isExpanded,
  })

  const [cssNames, cssAttrs] = useCombinedSemantics(
    [
      globalConfig.classNames,
      { root: globalConfig.className },
      classNames,
      props.classNames,
      { root: props.className },
    ],
    [
      globalConfig.styles,
      { root: globalConfig.style },
      props.styles,
      { root: props.style },
    ],
    { omitted: props },
  )

  const outerCssNames = { ...omit(cssNames, ['root', 'item']), root: cssNames.item }
  const outerCssAttrs = { ...omit(cssAttrs, ['root', 'item']), root: cssAttrs.item }
  const extraCssAttrs = { height: listHeight, ...isTopSided(placement) ? { top } : { bottom } }

  const handleOnGroupExited = () => { handleSyncHovering(); onGroupExited(placement) }

  return {
    omitted,
    ns,
    cssNames,
    cssAttrs,
    ctrl,
    isHovering,
    itemLayouts,
    stackEnable,
    extraCssAttrs,
    outerCssNames,
    outerCssAttrs,
    handleOnMouseEnter,
    handleOnMouseLeave,
    handleSyncHovering,
    handleOnGroupExited,
  }
}
