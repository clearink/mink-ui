import type { NotificationHolderProps } from './notification-holder.props'

import Portal from '../../_shared/components/portal/src'
import { defineName } from '../../_shared/utils/define-name'
import { useNotificationHolderProps } from './hooks/use-notification-holder-props'
import NotificationList from './notification-list'

function NotificationHolder(props: NotificationHolderProps) {
  const { picked, omitted, restAttrs } = useNotificationHolderProps(props)

  const { getContainer } = picked
  const { groups, onDismiss, onGroupExited } = omitted

  return (
    <Portal getContainer={getContainer}>
      {groups.map(group => (
        <NotificationList
          {...restAttrs}
          key={group.key}
          items={Array.from(group.items.values())}
          placement={group.key}
          onDismiss={onDismiss}
          onGroupExited={onGroupExited}
        />
      ))}
    </Portal>
  )
}

defineName(NotificationHolder, 'Notification.Holder')

export default NotificationHolder
