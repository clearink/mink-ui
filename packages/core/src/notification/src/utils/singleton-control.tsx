import type { VoidFn } from '@mink-ui/shared/interface'
import type { NotificationGlobalMethods, NotificationVariantMethods } from '../_shared.props'
import type { NotificationContainerInstance } from '../notification-container.props'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { nextTick } from '@mink-ui/shared/dom/raf'
import { isThenable } from '@mink-ui/shared/is/is-promise'

import { getBuiltinStatus } from '../../../_shared/utils/status'
import NotificationContainer from '../notification-container'
import { globalNotificationConfig } from './singleton-config'

/**
 * @description 全局通知控制器
 */
class GlobalNotificationControl {
  private _cleanup: VoidFn | null = null

  private _container: NotificationContainerInstance | null = null

  private _callbacks: ((container: NotificationContainerInstance) => void)[] = []

  /**
   * @description 确保 NotificationContainer 存在
   */
  private ensure = () => {
    if (this._container) return this._container

    return new Promise<NotificationContainerInstance>((resolve) => {
      createRoot(document.createDocumentFragment()).render(
        <StrictMode>
          <NotificationContainer ref={(el) => { resolve(this._container ??= el!) }} />
        </StrictMode>,
      )
    })
  }

  /**
   * @description 清理
   */
  private clear = () => {
    this._cleanup?.()

    this._cleanup = null
  }

  /**
   * @description 执行所有回调函数
   */
  private flush = () => {
    this.clear()

    this._cleanup = nextTick(() => {
      const result = this.ensure()

      const handler = (container: NotificationContainerInstance) => {
        container.sync()

        this._callbacks.forEach((fn) => { fn(container) })

        this._callbacks.length = 0
      }

      isThenable(result) ? result.then(handler) : handler(result)
    })
  }

  /**
   * @description 打开通知
   */
  private open: NotificationGlobalMethods['open'] = (params) => {
    this._callbacks.push((container) => { container.open(params) })

    this.flush()
  }

  /**
   * @description 关闭通知
   */
  private close: NotificationGlobalMethods['close'] = (key) => {
    this._callbacks.push((container) => { container.close(key) })

    this.flush()
  }

  /**
   * @description 设置全局配置（TODO：待确认）
   */
  private config: NotificationGlobalMethods['config'] = (config) => {
    globalNotificationConfig.set(config)

    this._container?.sync()
  }

  /**
   * @description 向外暴露方法
   */
  public expose = (): NotificationGlobalMethods => {
    const { open, close, config } = this

    return Object.assign(
      getBuiltinStatus().reduce((result, status) => {
        result[status] = (params) => { open({ ...params, type: status }) }
        return result
      }, {} as NotificationVariantMethods),
      { open, close, config },
    )
  }
}

export const globalNotificationControl = new GlobalNotificationControl()
