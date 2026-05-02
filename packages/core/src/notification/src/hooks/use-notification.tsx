import type { NotificationHookConfig, NotificationHookMethods, NotificationMethodParams, NotificationPlacement } from '../_shared.props'

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
import { getNotificationHolderGroups } from '../utils/helpers'

export function useNotification(config: NotificationHookConfig = {}) {
  const uniqueId = useConstant(() => makeUniqueId('nt-'))

  const [groups, setGroups] = useExactState(() => getNotificationHolderGroups())

  const restAttrs = pick(config, sharedNotificationHolderConfig)

  const open = useEvent<NotificationHookMethods['open']>((params) => {
    const item: NotificationMethodParams = shallowMerge(
      { ...params, key: isNullish(params.key) ? uniqueId() : `${params.key}` },
      // 从 config 中挑选 NotificationItem 需要的属性
      pick(config, sharedNotificationItmeProps),
      defaultNotificationItemConfig,
    )

    setGroups(prev => prev.map((group) => {
      // 如果存在相同的 placement，则将 item 添加到对应的 group 中
      const matched = group.key === item.placement

      // TODO: 这里不重新生成新的 items 是否会无法更新？
      if (matched) group.items.push(item)
      if (matched) group.visible = true

      return group
    }))
  })

  const close = useEvent<NotificationHookMethods['close']>((key) => {
    const shouldClearNotices = isUndefined(key)

    setGroups(prev => prev.map((group) => {
      const { items } = group

      const newItems = shouldClearNotices ? [] : items.filter(item => item.key !== key)

      return { ...group, items: newItems }
    }))
  })

  const onFinished = useEvent((placement: NotificationPlacement) => {
    setGroups(prev => prev.map((group) => {
      const matched = group.key === placement

      if (matched) group.visible = group.items.length > 0

      return group
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
      key="notification-holder"
      {...restAttrs}
      groups={groups}
      onDismiss={close}
      onFinished={onFinished}
    />,
  ] as const
}
