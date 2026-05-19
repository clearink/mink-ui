import type {
  NotificationHolderProps,
  OmittedNotificationHolderProps,
  PickedNotificationHolderProps,
} from '../notification-holder.props'

import { omit } from '@mink-ui/shared/object/omit'

import { useConfiguration } from '../../../_shared/hooks/use-settings/use-configuration'
import { excludedNotificationHolderProps } from '../notification-holder.props'

export function useNotificationHolderProps(props: NotificationHolderProps) {
  const globalConfig = useConfiguration('notification')

  const {
    getContainer = globalConfig.getContainer,
  } = props

  const omitted = props as OmittedNotificationHolderProps
  const picked: PickedNotificationHolderProps = { getContainer }

  const restAttrs = omit(props, excludedNotificationHolderProps)

  return {
    picked,
    omitted,
    restAttrs,
  }
}
