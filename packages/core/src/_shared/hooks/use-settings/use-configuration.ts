import type { ComponentGlobalConfig } from '../../../config-provider/src/_shared.props'

import { GlobalConfigContext } from '../../../config-provider/src/_shared.context'

/**
 * @description 组件全局配置
 */
export function useConfiguration<T extends keyof ComponentGlobalConfig>(component: T) {
  const globalConfigContext = GlobalConfigContext.use()

  return { ...globalConfigContext[component] } as {} & ComponentGlobalConfig[T]
}
