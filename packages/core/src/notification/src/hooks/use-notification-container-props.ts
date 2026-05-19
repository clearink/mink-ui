import type { NotificationContainerProps } from '../notification-container.props'

import { useImperativeHandle, useState } from 'react'

import { globalNotificationConfig } from '../utils/singleton'
import { useNotification } from './use-notification'

export function useNotificationContainerProps(props: NotificationContainerProps) {
  const { ref } = props

  const [currConfig, setCurrConfig] = useState(() => globalNotificationConfig.get())

  const [api, ctxHolder] = useNotification(currConfig)

  useImperativeHandle(ref, () => ({
    get open() { return api.open },
    get close() { return api.close },
    sync: () => { setCurrConfig(globalNotificationConfig.get()) },
  }), [api, setCurrConfig])

  return {
    ctxHolder,
    notificationConfig: currConfig,
  }
}
