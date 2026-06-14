import type { NotificationGlobalConfig } from '../_shared.props'

import { shallowMerge } from '@mink-ui/shared/object/shallow-merge'

import { defaultNotificationConfig as defaultConfig } from '../_shared.props'

/**
 * @description 全局通知配置
 */
class GlobalNotificationConfig {
  private _config: NotificationGlobalConfig = { ...defaultConfig }

  public get = (): NotificationGlobalConfig => {
    return { ...this._config }
  }

  public set = (config: Partial<NotificationGlobalConfig>) => {
    this._config = shallowMerge(config, this.get())
  }
}

export const globalNotificationConfig = new GlobalNotificationConfig()
