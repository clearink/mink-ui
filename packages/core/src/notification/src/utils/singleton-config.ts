import type { NotificationConfig } from '../_shared.props'

import { shallowMerge } from '@mink-ui/shared/object/shallow-merge'

import { defaultNotificationConfig as defaultConfig } from '../_shared.props'

/**
 * @description 全局通知配置
 */
class GlobalNotificationConfig {
  private _config: NotificationConfig = { ...defaultConfig }

  public get = (): NotificationConfig => {
    return { ...this._config }
  }

  public set = (config: Partial<NotificationConfig>) => {
    this._config = shallowMerge(config, this.get())
  }
}

export const globalNotificationConfig = new GlobalNotificationConfig()
