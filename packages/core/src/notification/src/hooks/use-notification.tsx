import type {
  NotificationHolderGroup,
  NotificationHookConfig,
  NotificationHookMethods,
  NotificationMethodParams,
  NotificationPlacement,
} from '../_shared.props'

import { useMemo } from 'react'
import { isNullish } from '@mink-ui/shared/is/is-nullish'
import { isUndefined } from '@mink-ui/shared/is/is-undefined'
import { pick } from '@mink-ui/shared/object/pick'
import { shallowMerge } from '@mink-ui/shared/object/shallow-merge'

import { useConstant } from '../../../_shared/hooks/use-constant'
import { useEvent } from '../../../_shared/hooks/use-event'
import { useExactState } from '../../../_shared/hooks/use-exact-state'
import { makeUniqueId } from '../../../_shared/utils/make-unique-id'
import { getBuiltinStatus } from '../../../config-provider/src/utils/status'
import NotificationHolder from '../notification-holder'
import { sharedNotificationHolderConfig } from '../notification-holder.props'
import { defaultNotificationItemConfig, sharedNotificationItmeProps } from '../notification-item.props'

export function useNotification(config: NotificationHookConfig = {}) {
  const uniqueId = useConstant(() => makeUniqueId('nt-'))

  const [groups, setGroups] = useExactState<NotificationHolderGroup[]>([])

  const restAttrs = pick(config, sharedNotificationHolderConfig)

  const open = useEvent<NotificationHookMethods['open']>((params) => {
    const item: NotificationMethodParams = shallowMerge(
      { ...params, key: isNullish(params.key) ? uniqueId() : `${params.key}` },
      // 从 config 中挑选 NotificationItem 需要的属性
      pick(config, sharedNotificationItmeProps),
      defaultNotificationItemConfig,
    )

    setGroups((prev) => {
      let found = false

      const next = prev.map((group) => {
        if (group.key !== item.placement) return group

        found = true

        return { ...group, items: group.items.concat(item) }
      })

      return found ? next : next.concat({ key: item.placement!, items: [item] })
    })
  })

  const close = useEvent<NotificationHookMethods['close']>((key) => {
    const shouldClearItems = isUndefined(key)

    setGroups(prev => prev.map((group) => {
      const { items } = group

      const newItems = shouldClearItems ? [] : items.filter(item => item.key !== key)

      return { ...group, items: newItems }
    }))
  })

  const finish = useEvent((placement: NotificationPlacement) => {
    setGroups(prev => prev.filter((group) => {
      if (group.key !== placement) return true

      return group.items.length > 0
    }))
  })

  const methods = useMemo(() => {
    return getBuiltinStatus().reduce((result, status) => {
      result[status] = (params) => { open({ ...params, type: status }) }

      return result
    }, { open, close } as NotificationHookMethods)
  }, [open, close])

  return [
    methods,
    <NotificationHolder
      {...restAttrs}
      key="notification-holder"
      groups={groups}
      onDismiss={close}
      onGroupExited={finish}
    />,
  ] as const
}
