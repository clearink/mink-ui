import type { ModalConfig } from '../_shared.props'

import { shallowMerge } from '@mink-ui/shared/object/shallow-merge'

import { defaultModalConfig } from '../_shared.props'

/**
 * @description 全局模态框配置
 */
class GlobalModalConfig {
  private _config: ModalConfig = { ...defaultModalConfig }

  public get = (): ModalConfig => {
    return { ...this._config }
  }

  public set = (config: Partial<ModalConfig>) => {
    this._config = shallowMerge(config, this.get())
  }
}

export const globalModalConfig = new GlobalModalConfig()
