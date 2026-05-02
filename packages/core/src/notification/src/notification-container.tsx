import type { NotificationContainerProps } from './notification-container.props'

import { defineName } from '../../_shared/utils/define-name'
import ConfigProvider from '../../config-provider/src'
import { useNotificationContainerProps } from './hooks/use-notification-container-props'

function NotificationContainer(props: NotificationContainerProps) {
  const { ctxHolder, notificationConfig } = useNotificationContainerProps(props)

  //  TODO： ConfigProvider 还需要继承最新的 ConfigProviderGlobalConfig.get()
  return (
    <ConfigProvider notification={notificationConfig}>
      {ctxHolder}
    </ConfigProvider>
  )
}

defineName(NotificationContainer, 'Notification.Container')

export default NotificationContainer
