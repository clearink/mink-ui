import { withDefaults } from '@mink-ui/core/_shared/utils'
import { isBoolean } from '@mink-ui/shared'
import { useMemo } from 'react'

import type { NotificationStackConfig } from '../../_shared.props'
import type { NotificationListProps } from '../props'

export default function useNotificationStack(props: NotificationListProps) {
  const { stack } = props

  const needMerge = stack && !isBoolean(stack)

  const stackEnable = needMerge ? true : !!stack

  const stackConfig = useMemo<NotificationStackConfig>(() => {
    const defaultConfig = { threshold: 3, offset: 8, gap: 16 }

    if (!needMerge) return defaultConfig

    return withDefaults(stack as any, defaultConfig)
  }, [needMerge, stack])

  return { stackEnable, stackConfig }
}
