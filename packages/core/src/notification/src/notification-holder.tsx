import type { NotificationHolderProps } from './notification-holder.props'

import Portal from '../../_shared/components/portal/src'
import { defineName } from '../../_shared/utils/define-name'
import { useNotificationHolderProps } from './hooks/use-notification-holder-props'
import NotificationList from './notification-list'

function NotificationHolder(props: NotificationHolderProps) {
  const { picked, omitted, resetAttrs } = useNotificationHolderProps(props)

  const { getContainer } = picked
  const { groups, onDismiss, onFinished } = omitted

  return (
    <Portal getContainer={getContainer}>
      {groups.map((group) => {
        return group.visible && (
          <NotificationList
            {...resetAttrs}
            key={group.key}
            items={group.items}
            placement={group.key}
            onDismiss={onDismiss}
            onFinished={onFinished}
          />
        )
      })}
    </Portal>
  )
}

defineName(NotificationHolder, 'Notification.Holder')

export default NotificationHolder
