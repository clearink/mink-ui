import type { NotificationConfig, NotificationMethods } from '../_shared.props'

export interface NotificationHolderProps {
  config: NotificationConfig
}

export interface NotificationHolderRef extends Pick<NotificationMethods, 'close' | 'open'> {
  sync: () => void
}
