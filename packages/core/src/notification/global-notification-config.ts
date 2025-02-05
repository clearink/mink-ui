import type { NotificationConfig } from './_shared.props'

import { defaultNotificationConfig } from './_shared.props'

class GlobalNotificationConfig {
  private config: NotificationConfig = { ...defaultNotificationConfig }

  get = (): NotificationConfig => {
    return { ...this.config }
  }

  set = (config: NotificationConfig) => {
    this.config = config
  }
}

export default new GlobalNotificationConfig()
