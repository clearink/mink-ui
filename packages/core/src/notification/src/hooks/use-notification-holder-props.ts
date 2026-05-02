import type {
  NotificationHolderProps,
  OmittedNotificationHolderProps,
  PickedNotificationHolderProps,
} from '../notification-holder.props'

import { fallback } from '@mink-ui/shared/function/fallback'
import { omit } from '@mink-ui/shared/object/omit'

import { useConfiguration } from '../../../_shared/hooks/use-settings/use-configuration'
import { defaultNotificationHolderProps as defaultProps, excludedNotificationHolderProps } from '../notification-holder.props'

export function useNotificationHolderProps(props: NotificationHolderProps) {
  const globalConfig = useConfiguration('notification')

  const {
    getContainer = fallback(globalConfig.getContainer, defaultProps.getContainer),
  } = props

  const omitted = props as OmittedNotificationHolderProps
  const picked: PickedNotificationHolderProps = { getContainer }

  const resetAttrs = omit(props, excludedNotificationHolderProps)

  return {
    picked,
    omitted,
    resetAttrs,
  }
}
