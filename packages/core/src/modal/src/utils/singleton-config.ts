import type { ModalGlobalConfig } from '../_shared.props'

import { shallowMerge } from '@mink-ui/shared/object/shallow-merge'

/**
 * @description 全局模态框配置
 */
class GlobalModalConfig {
  private _config: ModalGlobalConfig = { }

  public get = (): ModalGlobalConfig => {
    return { ...this._config }
  }

  public set = (config: Partial<ModalGlobalConfig>) => {
    this._config = shallowMerge(config, this.get())
  }
}

export const globalModalConfig = new GlobalModalConfig()
