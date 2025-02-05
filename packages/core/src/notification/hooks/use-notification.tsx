import type { NotificationPlacement } from '@mink-ui/core/_shared/types'
import type { VoidFn } from '@mink-ui/shared'

import { Portal } from '@mink-ui/core/_shared/components'
import { notificationPlacement, presetStatus } from '@mink-ui/core/_shared/constants'
import { useConstant, useForceUpdate } from '@mink-ui/core/_shared/hooks'
import { makeUniqueId, withDefaults } from '@mink-ui/core/_shared/utils'
import { isUndefined, pick } from '@mink-ui/shared'
import { useMemo } from 'react'

import type { NotificationConfig, NotificationMethods } from '../_shared.props'
import type { NotificationProps } from '../notification-notice/props'

import { defaultNotificationConfig } from '../_shared.props'
import globalConfig from '../global-notification-config'
import NotificationList from '../notification-list'
import { defaultNotificationNoticeProps } from '../notification-notice/props'

const included = ['duration', 'pauseOnHover', 'placement', 'showProgress', 'closable', 'closeIcon'] as const

export class NotificationState {
  // 与 GroupTransition 不同
  // configs 无法从 props 中初始化
  // 所以需要保证 uniqueId 函数的唯一
  uniqueId = makeUniqueId('nt-')

  configs = notificationPlacement.map((placement) => {
    return { placement, visible: false, notices: [] as NotificationProps[] }
  })
}

export class NotificationAction {
  private get configs() {
    return this.states.configs
  }

  private open: NotificationMethods['open'] = (_config) => {
    const notice = withDefaults(
      _config,
      { key: isUndefined(_config.key) ? this.states.uniqueId() : _config.key },
      pick(globalConfig.get(), included),
      pick(defaultNotificationNoticeProps, included),
    )

    const position = this.configs.find(e => e.placement === notice.placement)

    if (!position) return

    // notice.key 相同的逻辑

    position.notices.push(notice)

    position.visible = true

    this.forceUpdate()
    // max count 逻辑呢?

    // config.notices = config.notices.slice(-5)
  }

  private close: NotificationMethods['close'] = (key) => {
    let shouldUpdate = isUndefined(key)

    this.states.configs = this.states.configs.map((config) => {
      const { notices } = config

      if (isUndefined(key)) return { ...config, notices: [] }

      const newNotices = notices.filter(item => item.key !== key)

      if (newNotices.length === notices.length) return config

      shouldUpdate = true

      return { ...config, notices: newNotices }
    })

    if (shouldUpdate) this.forceUpdate()
  }

  constructor(public forceUpdate: VoidFn, private states: NotificationState) {}

  finish = (placement: NotificationPlacement) => {
    this.states.configs = this.states.configs.map((config) => {
      if (config.placement !== placement) return config

      return { ...config, visible: config.notices.length > 0 }
    }, null)

    this.forceUpdate()
  }

  inject = () => {
    const statusMethods = presetStatus.reduce((methods, status) => {
      methods[status] = (props) => { this.open({ ...props, type: status }) }

      return methods
    }, {} as Omit<NotificationMethods, 'close' | 'open'>)

    return { open: this.open, close: this.close, ...statusMethods }
  }
}

export default function useNotification(_config?: NotificationConfig) {
  const config = withDefaults(_config || {}, defaultNotificationConfig)

  const { getContainer, top, bottom, stack, maxCount } = config

  const update = useForceUpdate()

  const states = useConstant(() => new NotificationState())

  const actions = useMemo(() => new NotificationAction(update, states), [update, states])

  const methods = useMemo(() => actions.inject(), [actions])

  return [
    methods,
    <Portal getContainer={getContainer}>
      {states.configs.map((config) => {
        return config.visible && (
          <NotificationList
            key={config.placement}
            top={top}
            bottom={bottom}
            stack={stack}
            maxCount={maxCount}
            placement={config.placement}
            notices={config.notices}
            onClose={(key) => { methods.close(key) }}
            onFinished={() => { actions.finish(config.placement) }}
          />
        )
      })}
    </Portal>,
  ] as [NotificationMethods, JSX.Element]
}
