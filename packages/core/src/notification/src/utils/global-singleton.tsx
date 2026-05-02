import type { VoidFn } from '@mink-ui/shared/interface'
import type { NotificationConfig, NotificationGlobalMethods } from '../_shared.props'
import type { NotificationContainerInstance } from '../notification-container.props'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { nextTick } from '@mink-ui/shared/dom/raf'
import { isPromiseLike } from '@mink-ui/shared/is/is-promise'
import { shallowMerge } from '@mink-ui/shared/object/shallow-merge'

import { getBuiltinStatus } from '../../../config-provider/src/utils/status'
import { defaultNotificationConfig as defaultConfig } from '../_shared.props'
import NotificationContainer from '../notification-container'

/**
 * @description 全局通知配置
 */
class GlobalNotificationConfig {
  private _config: NotificationConfig = { ...defaultConfig }

  public get = (): NotificationConfig => {
    return { ...this._config }
  }

  public set = (config: NotificationConfig) => {
    this._config = config
  }
}

export const globalNotificationConfig = new GlobalNotificationConfig()

/**
 * @description 全局通知控制
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
  private dispose = () => {
    this._cleanup?.()
    this._cleanup = null
  }

  /**
   * @description 执行所有回调函数
   */
  private flush = () => {
    this.dispose()

    this._cleanup = nextTick(() => {
      const handler = (container: NotificationContainerInstance) => {
        container.sync()

        this._callbacks.forEach(fn => fn(container))

        this._callbacks = []
      }

      const result = this.ensure()

      isPromiseLike(result) ? result.then(handler) : handler(result)
    })
  }

  /**
   * @description 打开通知
   */
  private open: NotificationGlobalMethods['open'] = (params) => {
    this._callbacks.push((holder) => { holder.open(params) })

    this.flush()
  }

  /**
   * @description 关闭通知
   */
  private close: NotificationGlobalMethods['close'] = (key) => {
    this._callbacks.push((holder) => { holder.close(key) })

    this.flush()
  }

  /**
   * @description 设置全局配置（TODO：待确认）
   */
  private config = (config: NotificationConfig) => {
    globalNotificationConfig.set(shallowMerge(config, globalNotificationConfig.get()))

    this._container?.sync()
  }

  /**
   * @description 向外暴露方法
   */
  public expose = () => {
    const methods = { open: this.open, close: this.close, config: this.config }

    return getBuiltinStatus().reduce((result, status) => {
      result[status] = (params) => { this.open({ ...params, type: status }) }

      return result
    }, methods as NotificationGlobalMethods)
  }
}

export const globalNotificationControl = new GlobalNotificationControl()
