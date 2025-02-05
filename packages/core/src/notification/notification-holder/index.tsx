import { useExactState } from '@mink-ui/core/_shared/hooks'
import { betterDisplayName } from '@mink-ui/core/_shared/utils'
import ConfigProvider from '@mink-ui/core/config-provider'
import { forwardRef, useImperativeHandle } from 'react'

import type { NotificationHolderRef } from './props'

import globalConfig from '../global-notification-config'
import useNotification from '../hooks/use-notification'

function NotificationHolder(_props: unknown, _ref: React.ForwardedRef<NotificationHolderRef>) {
  // TODO
  // const _globalConfig = {}

  // TODO
  // 在使用 useNotification 之前,需要组合所有的配置信息,然后传给 hook
  // 具体有哪些方面的配置信息呢?
  // 1 instance.globalConfig
  // 2 ConfigProvider.notificationConfig
  // 3 AppConfig.notificationConfig
  const [config, setConfig] = useExactState(globalConfig.get)

  const [api, holder] = useNotification(config)

  useImperativeHandle(_ref, () => ({
    get open() { return api.open },
    get close() { return api.close },
    sync: () => { setConfig(globalConfig.get()) },
  }), [api.close, api.open, setConfig])

  return (
    <ConfigProvider>
      {holder}
    </ConfigProvider>
  )
}

betterDisplayName(NotificationHolder, 'Notification.Holder')

export default forwardRef(NotificationHolder)
