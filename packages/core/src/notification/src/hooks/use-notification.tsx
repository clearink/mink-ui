import type {
  NotificationConfig,
  NotificationHolderGroup,
  NotificationMethodParams,
} from '../_shared.props'

import { useMemo, useState } from 'react'
import { isNullish } from '@mink-ui/shared/is/is-nullish'
import { pick } from '@mink-ui/shared/object/pick'
import { shallowMerge } from '@mink-ui/shared/object/shallow-merge'

import { useConstant } from '../../../_shared/hooks/use-constant'
import { useInvoke } from '../../../_shared/hooks/use-invoke'
import { useConfiguration } from '../../../_shared/hooks/use-settings/use-configuration'
import { makeUniqueId } from '../../../_shared/utils/make-unique-id'
import { defaultNotificationConfig } from '../_shared.props'
import NotificationHolder from '../notification-holder'
import { sharedNotificationHolderProps } from '../notification-holder.props'
import { sharedNotificationItemProps } from '../notification-item.props'
import { NotificationHookControl } from '../utils/notification-hook-control'

export function useNotification(config: NotificationConfig = {}) {
  const globalConfig = useConfiguration('notification')

  const uniqueId = useConstant(() => makeUniqueId('nt-'))

  const [groups, setGroups] = useState<NotificationHolderGroup[]>([])

  const ctrl = useConstant(() => new NotificationHookControl())

  useInvoke(() => {
    ctrl._bind(
      (updater) => { setGroups(updater) },
      params => shallowMerge<NotificationMethodParams>(
        { ...params, key: isNullish(params.key) ? uniqueId() : `${params.key}` },
        // 从 config 中挑选 NotificationItem 需要的属性
        pick(config, sharedNotificationItemProps),
        // 从 globalConfig 中挑选 NotificationItem 需要的属性
        pick(globalConfig, ['closable']),
        // 从 defaultConfig 中挑选 NotificationItem 需要的属性
        pick(defaultNotificationConfig, sharedNotificationItemProps),
      ),
    )
  })

  const methods = useMemo(() => ctrl.expose(), [ctrl])

  const restAttrs = pick(config, sharedNotificationHolderProps)

  return [
    methods,
    <NotificationHolder
      {...restAttrs}
      key="notification-holder"
      groups={groups}
      onDismiss={ctrl.close}
      onGroupExited={ctrl.finish}
    />,
  ] as const
}
