import type { Ref } from 'react'
import type { VoidFn } from '@mink-ui/shared/interface'
import type { NotificationHookMethods } from './_shared.props'

export interface NotificationContainerInstance extends Pick<NotificationHookMethods, 'open' | 'close'> {
  sync: VoidFn
}

export interface NotificationContainerProps {
  /**
   * @description 外部引用
   */
  ref: Ref<NotificationContainerInstance>
}
