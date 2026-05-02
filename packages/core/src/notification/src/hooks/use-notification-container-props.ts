import type { NotificationContainerProps } from '../notification-container.props'

import { useImperativeHandle } from 'react'

import { useExactState } from '../../../_shared/hooks/use-exact-state'
import { globalNotificationConfig } from '../utils/global-singleton'
import { useNotification } from './use-notification'

export function useNotificationContainerProps(props: NotificationContainerProps) {
  const { ref } = props

  const [currentnConfig, setCurrentConfig] = useExactState(() => globalNotificationConfig.get())

  const [api, ctxHolder] = useNotification(currentnConfig)

  useImperativeHandle(ref, () => ({
    get open() { return api.open },
    get close() { return api.close },
    sync: () => { setCurrentConfig(globalNotificationConfig.get()) },
  }), [api, setCurrentConfig])

  return {
    ctxHolder,
    notificationConfig: currentnConfig,
  }
}
