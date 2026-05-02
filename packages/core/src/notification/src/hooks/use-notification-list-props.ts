import type { ReactElement } from 'react'
import type { NotificationListProps, OmittedNotificationListProps, PickedNotificationListProps } from '../notification-list.props'

import { ownerComputedStyle } from '@mink-ui/shared/dom/global'
import { fallback } from '@mink-ui/shared/function/fallback'
import { omit } from '@mink-ui/shared/object/omit'

import { useCombinedSemantics } from '../../../_shared/hooks/use-settings/use-combined'
import { useConfiguration } from '../../../_shared/hooks/use-settings/use-configuration'
import { defaultNotificationListProps as defaultProps } from '../notification-list.props'
import { useNotificationListClassNames } from './use-class-names'
import { useNotificationStackLayout } from './use-notification-stack-layout'

export function useNotificationListProps(props: NotificationListProps) {
  const globalConfig = useConfiguration('notification')

  const {
    top = fallback(globalConfig.top, defaultProps.top),
    bottom = fallback(globalConfig.bottom, defaultProps.bottom),
    stack = fallback(globalConfig.stack, defaultProps.stack),
    maxCount = fallback(globalConfig.maxCount, defaultProps.maxCount),
    placement = fallback(globalConfig.placement, defaultProps.placement)!,
  } = props

  const omitted = props as OmittedNotificationListProps

  const picked: PickedNotificationListProps = {
    top,
    bottom,
    stack,
    maxCount,
    placement,
  }

  const {
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
  } = useNotificationStackLayout(picked, omitted)

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

  const extraCssAttrs = placement.startsWith('bottom') ? { bottom } : { top }

  const rootCssNames = { ...omit(cssNames, ['root', 'item']), root: cssNames.item }
  const rootCssAttrs = { ...omit(cssAttrs, ['root', 'item']), root: cssAttrs.item }

  const handleOnEnter = () => {}

  const handleOnEntering = handleComputeLayouts

  const handleOnExit = (el: HTMLElement, key?: ReactElement['key']) => {
    const target = ctrl.$items.get(key!) || el

    const layout = stackLayouts.get(key!) || {}

    return { height: target.offsetHeight, transform: layout.transform }
  }

  const handleOnExiting = (el: HTMLElement, key?: ReactElement['key']) => {
    handleComputeLayouts()

    const layout = stackLayouts.get(key!) || {}

    return { height: 0, transform: layout.transform }
  }

  return {
    picked,
    omitted,
    ns,
    cssNames,
    cssAttrs,
    ctrl,
    listHovering,
    isExpanded,
    stackEnable,
    stackConfig,
    stackLayouts,
    returnEarly,
    rootCssAttrs,
    rootCssNames,
    extraCssAttrs,
    returnEmpty: returnEarly,
    handleOnEnter,
    handleOnEntering,
    handleOnExit,
    handleOnExiting,
    handleOnMouseEnter,
    handleOnMouseLeave,
    handleSyncHovering,
  }
}
