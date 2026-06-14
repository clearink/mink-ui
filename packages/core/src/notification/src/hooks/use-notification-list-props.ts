import type { NotificationListProps, OmittedNotificationListProps, PickedNotificationListProps } from '../notification-list.props'

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
    top = defaultProps.top,
    bottom = defaultProps.bottom,
    gap = defaultProps.gap,
    stack = defaultProps.stack,
    maxCount = defaultProps.maxCount,
    placement = defaultProps.placement,
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
    rootHeight,
    itemCssVars,
    stackEnable,
    handleMouseEnter,
    handleMouseLeave,
    handleRecheckHover,
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
      omitted.classNames,
      { root: omitted.className },
    ],
    [
      globalConfig.styles,
      { root: globalConfig.style },
      omitted.styles,
      { root: omitted.style },
      { root: { height: rootHeight } },
      { root: isTopSided(placement) ? { top } : { bottom } },
    ],
    { meta: { ...omitted, ...picked } },
  )

  const outerCssNames = { ...omit(cssNames, ['root', 'item']), root: cssNames.item }
  const outerCssAttrs = { ...omit(cssAttrs, ['root', 'item']), root: cssAttrs.item }

  const handleGroupExited = () => { handleRecheckHover(); onGroupExited(placement) }

  return {
    omitted,
    ns,
    cssNames,
    cssAttrs,
    ctrl,
    isHovering,
    itemCssVars,
    stackEnable,
    outerCssNames,
    outerCssAttrs,
    handleMouseEnter,
    handleMouseLeave,
    handleGroupExited,
    handleRecheckHover,
  }
}
