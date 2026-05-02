import type { NotificationStackConfig } from '../_shared.props'
import type { NotificationListProps } from '../notification-list.props'

import { isObject } from '@mink-ui/shared/is/is-object'
import { shallowMerge } from '@mink-ui/shared/object/shallow-merge'

import { defaultNotificationStackConfig } from '../_shared.props'

export function normalizeNotificationStackConfig(stack: NotificationListProps['stack']) {
  const isObjectStack = isObject(stack)

  const stackEnable = isObjectStack ? true : !!stack

  const stackConfig = isObjectStack
    ? shallowMerge(stack, defaultNotificationStackConfig) as NotificationStackConfig
    : defaultNotificationStackConfig

  return [stackEnable, stackConfig] as const
}
