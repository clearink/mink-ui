import type { VoidFn } from '@mink-ui/shared'

import type { NotificationPlacement } from '../../_shared/types'
import type { NotificationConfig } from '../_shared.props'
import type { NotificationProps } from '../notification-notice/props'

export interface NotificationListProps extends Pick<NotificationConfig, 'bottom' | 'maxCount' | 'stack' | 'top'> {
  notices: NotificationProps[]
  placement: NotificationPlacement
  onExited?: VoidFn
  onClose: (key: NotificationProps['key']) => void
  onFinished?: VoidFn
}

export interface StackState {
  delta: number
  scale: number
  height: number | undefined
  wrapper: HTMLElement
}
