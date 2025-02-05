import { presetStatus } from '@mink-ui/core/_shared/constants'
import { withDefaults } from '@mink-ui/core/_shared/utils'
import { isPromiseLike, nextTick, noop } from '@mink-ui/shared'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import type { NotificationConfig, NotificationMethods } from './_shared.props'
import type { NotificationHolderRef } from './notification-holder/props'

import globalConfig from './global-notification-config'
import NotificationHolder from './notification-holder'

// 全局的通知提醒实例
class GlobalNotificationInstance {
  private holder: NotificationHolderRef | null = null

  private flushCleanup = noop

  private queue: ((holder: NotificationHolderRef) => void)[] = []

  private _ensure = () => {
    if (this.holder) return this.holder

    return new Promise<NotificationHolderRef>((resolve) => {
      createRoot(document.createDocumentFragment()).render(
        <StrictMode>
          <NotificationHolder ref={(holder) => {
            if (!this.holder) this.holder = holder
            if (this.holder) resolve(this.holder)
          }}
          />
        </StrictMode>,
      )
    })
  }

  private flush = () => {
    this.flushCleanup()

    this.flushCleanup = nextTick(() => {
      const result = this._ensure()

      const handler = (holder: NotificationHolderRef) => {
        holder.sync()

        this.queue.forEach((fn) => { fn(holder) })

        this.queue = []
      }

      isPromiseLike(result) ? result.then(handler) : handler(result)
    })
  }

  private open: NotificationMethods['open'] = (props) => {
    this.queue.push((holder) => { holder.open(props) })

    this.flush()
  }

  private close: NotificationMethods['close'] = (key) => {
    this.queue.push((holder) => { holder.close(key) })

    this.flush()
  }

  private config = (config: NotificationConfig) => {
    globalConfig.set(withDefaults(config, globalConfig.get()))

    this.holder?.sync()
  }

  inject = () => {
    const statusMethods = presetStatus.reduce((methods, status) => {
      methods[status] = (props) => { this.open({ ...props, type: status }) }

      return methods
    }, {} as Omit<NotificationMethods, 'close' | 'open'>)

    return { open: this.open, close: this.close, config: this.config, ...statusMethods }
  }
}

export default new GlobalNotificationInstance()
