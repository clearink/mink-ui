import type { NotificationItemProps } from '../notification-item.props'
import type { OmittedNotificationListProps, PickedNotificationListProps } from '../notification-list.props'

import { kebabCase } from '@mink-ui/shared/string/kebab-case'

import { useNamespace } from '../../../_shared/hooks/use-settings/use-namespace'
import { cn } from '../../../_shared/libs/cn'

export function useNotificationListClassNames(
  picked: PickedNotificationListProps,
  omitted: OmittedNotificationListProps,
  others: { stackEnable: boolean, isExpanded: boolean },
) {
  const { placement } = picked
  const { prefixCls } = omitted
  const { stackEnable, isExpanded } = others

  const ns = useNamespace('notification', prefixCls)

  return {
    ns,
    classNames: {
      root: cn(ns, {
        [`${ns}--${kebabCase(placement)}`]: placement,
        [`${ns}--stack`]: stackEnable,
        [`${ns}--expanded`]: isExpanded,
      }),
    },
  }
}

export function useNotificationItemClassNames(omitted: NotificationItemProps) {
  const { outerNamespace: ons, config } = omitted
  const { type } = config

  const ns = useNamespace(preset => `${ons || `${preset}-notification`}-item`)

  return {
    ns,
    classNames: {
      root: cn(ns, {
        [`${ns}--${type}`]: type,
      }),
      statusIcon: `${ns}__status-icon`,
      closeBtn: `${ns}__close-btn`,
      content: `${ns}__content`,
      title: `${ns}__title`,
      description: `${ns}__description`,
      progress: `${ns}__progress`,
    },
  }
}
